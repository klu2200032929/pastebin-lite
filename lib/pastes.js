import prisma from '@/lib/prisma'
import { getNow } from '@/lib/time'

export async function createPaste(data) {
    const { content, ttl_seconds, max_views } = data

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
        throw new Error('Content is required and must be a non-empty string')
    }

    let expiresAt = null
    if (ttl_seconds !== undefined && ttl_seconds !== null) {
        const ttl = parseInt(ttl_seconds, 10)
        if (isNaN(ttl) || ttl < 1) {
            throw new Error('ttl_seconds must be a positive integer')
        }
        const now = getNow()
        expiresAt = new Date(now.getTime() + ttl * 1000)
    }

    let maxViews = null
    if (max_views !== undefined && max_views !== null) {
        const mv = parseInt(max_views, 10)
        if (isNaN(mv) || mv < 1) {
            throw new Error('max_views must be a positive integer')
        }
        maxViews = mv
    }

    const paste = await prisma.paste.create({
        data: {
            content,
            expiresAt,
            maxViews
        }
    })

    return paste
}

export async function getPaste(id) {
    // 1. Fetch paste
    const paste = await prisma.paste.findUnique({
        where: { id }
    })

    if (!paste) {
        return null
    }

    // 2. Check Expiry
    const now = getNow()

    // Time expiry
    if (paste.expiresAt && now > paste.expiresAt) {
        return null // Expired
    }

    // View limit expiry
    if (paste.maxViews !== null && paste.viewCount >= paste.maxViews) {
        return null // Limit exceeded
    }

    // 3. Increment view count
    try {
        const updatedPaste = await prisma.paste.update({
            where: { id },
            data: { viewCount: { increment: 1 } }
        })
        return updatedPaste
    } catch (error) {
        if (error.code === 'P2025') {
            return null
        }
        throw error
    }
}

import { NextResponse } from 'next/server'
import { getPaste } from '@/lib/pastes'

export async function GET(request, { params }) {
    try {
        const { id } = params
        const updatedPaste = await getPaste(id)

        if (!updatedPaste) {
            return NextResponse.json({ error: 'Paste not found or expired' }, { status: 404 })
        }

        // Calculate remaining views
        let remaining_views = null
        if (updatedPaste.maxViews !== null) {
            remaining_views = Math.max(0, updatedPaste.maxViews - updatedPaste.viewCount)
        }

        return NextResponse.json({
            content: updatedPaste.content,
            remaining_views,
            expires_at: updatedPaste.expiresAt ? updatedPaste.expiresAt.toISOString() : null
        })

    } catch (error) {
        console.error('Fetch paste error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

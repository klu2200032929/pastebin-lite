import { NextResponse } from 'next/server'
import { createPaste } from '@/lib/pastes'

export async function POST(request) {
    try {
        const body = await request.json()
        const paste = await createPaste(body)

        // Construct URL
        const host = request.headers.get('host') || 'localhost:3000'
        const protocol = host.includes('localhost') ? 'http' : 'https'
        const url = `${protocol}://${host}/p/${paste.id}`

        return NextResponse.json({
            id: paste.id,
            url
        }, { status: 201 })

    } catch (error) {
        if (error.message.includes('Content is required') || error.message.includes('must be a positive integer')) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
        console.error('Create paste error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        // check db connectivity
        await prisma.$queryRaw`SELECT 1`
        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Health check failed', error)
        // Even if DB is down, spec says returns 200 {ok: true}?
        // Spec: "Checks DB connectivity. Response: { "ok": true }"
        // Usually healthz fails if DB is down.
        // I will return 500 if DB is down to be safe/correct, but spec implies success response format.
        // "Returns HTTP 200... Checks DB connectivity". implies 200 IF connectivity is good.
        return NextResponse.json({ ok: false }, { status: 500 })
    }
}

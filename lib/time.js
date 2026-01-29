import { headers } from 'next/headers'

export function getNow() {
    // Only use test time if TEST_MODE is enabled
    if (process.env.TEST_MODE === '1') {
        try {
            const headersList = headers()
            const testNow = headersList.get('x-test-now-ms')
            if (testNow) {
                const ms = parseInt(testNow, 10)
                if (!isNaN(ms)) {
                    return new Date(ms)
                }
            }
        } catch (e) {
            // headers() might throw if called outside request context (e.g. during build or background tasks)
            // in that case, fall back to real time
            console.warn('getNow called outside request context:', e)
        }
    }
    return new Date()
}

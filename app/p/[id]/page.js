import { getPaste } from '@/lib/pastes';
import { notFound } from 'next/navigation';

export default async function PastePage({ params }) {
    const paste = await getPaste(params.id);

    if (!paste) {
        notFound();
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Paste content</h1>
            <pre style={{
                backgroundColor: '#f4f4f4',
                padding: '1rem',
                borderRadius: '5px',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontFamily: 'monospace'
            }}>
                {paste.content}
            </pre>
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>
                <p>Created at: {paste.createdAt.toLocaleString()}</p>
                {paste.expiresAt && <p>Expires at: {paste.expiresAt.toLocaleString()}</p>}
                {paste.maxViews !== null && <p>Views: {paste.viewCount} / {paste.maxViews}</p>}
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';

export default function Home() {
    const [content, setContent] = useState('');
    const [ttl, setTtl] = useState('');
    const [maxViews, setMaxViews] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        try {
            const res = await fetch('/api/pastes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    ttl_seconds: ttl ? parseInt(ttl) : undefined,
                    max_views: maxViews ? parseInt(maxViews) : undefined,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create paste');
            }

            setResult(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Create New Paste</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={10}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>TTL (seconds, optional):</label>
                    <input
                        type="number"
                        value={ttl}
                        onChange={(e) => setTtl(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Max Views (optional):</label>
                    <input
                        type="number"
                        value={maxViews}
                        onChange={(e) => setMaxViews(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.75rem', cursor: 'pointer' }}>Create Paste</button>
            </form>

            {error && <div style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</div>}

            {result && (
                <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
                    <h2>Paste Created!</h2>
                    <p>ID: {result.id}</p>
                    <p>URL: <a href={result.url}>{result.url}</a></p>
                </div>
            )}
        </div>
    );
}

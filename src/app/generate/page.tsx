'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GenerateImage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.imageUrl);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred while generating the image');
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main>
      <header>
        <nav>
          <div className="logo"><Link href="/">ImageGen</Link></div>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/api/auth/signout">Logout</Link></li>
          </ul>
        </nav>
      </header>

      <div className="generator-container">
        <h1>Generate Image</h1>
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="prompt-form">
          <textarea
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        </form>

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Generating your image. This may take a moment...</p>
          </div>
        )}

        {generatedImage && !loading && (
          <div className="result-container">
            <h2>Your Generated Image</h2>
            <img src={generatedImage} alt={prompt} />
            <Link href="/dashboard" className="btn">View All Images</Link>
          </div>
        )}
      </div>
    </main>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Image = {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: string;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Fetch user's images
    if (status === 'authenticated') {
      const fetchImages = async () => {
        try {
          const response = await fetch('/api/images');
          if (!response.ok) throw new Error('Failed to fetch images');
          
          const data = await response.json();
          setImages(data.images);
        } catch (error) {
          console.error('Error fetching images:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchImages();
    }
  }, [status, router]);

  if (status === 'loading' || (status === 'unauthenticated')) {
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

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Your Images</h1>
          <Link href="/generate" className="btn">Generate New Image</Link>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading your images...</p>
          </div>
        ) : images.length === 0 ? (
          <div style={{ textAlign: 'center', margin: '40px 0' }}>
            <p>You haven&apos;t generated any images yet.</p>
            <Link href="/generate" className="btn" style={{ marginTop: '20px' }}>
              Generate Your First Image
            </Link>
          </div>
        ) : (
          <div className="image-grid">
            {images.map((image) => (
              <div key={image.id} className="image-card">
                <img src={image.imageUrl} alt={image.prompt} />
                <div className="image-card-content">
                  <p>{image.prompt}</p>
                  <p className="date">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
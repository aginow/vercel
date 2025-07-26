import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <header>
        <nav>
          <div className="logo">ImageGen</div>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Generate Amazing Images with AI</h1>
          <p>Unleash your creativity with our powerful image generation platform</p>
          <div>
            <Link href="/register" className="btn">Get Started</Link>
            <Link href="/about" className="btn">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="features-container">
          <div className="feature">
            <span className="emoji">✨</span>
            <h3>AI-Powered</h3>
            <p>Generate stunning images using state-of-the-art AI models</p>
          </div>
          <div className="feature">
            <span className="emoji">🔒</span>
            <h3>Secure</h3>
            <p>Your data and creations are always safe with us</p>
          </div>
          <div className="feature">
            <span className="emoji">⚡</span>
            <h3>Fast</h3>
            <p>Get your images in seconds, not minutes</p>
          </div>
          <div className="feature">
            <span className="emoji">💾</span>
            <h3>Storage</h3>
            <p>All your generated images are stored securely in the cloud</p>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-container">
          <div className="about-text">
            <h2>About Our Platform</h2>
            <p>Our platform uses cutting-edge AI technology to generate high-quality images based on your text prompts.</p>
            <p>Whether you&apos;re a designer, marketer, or just someone who loves creating, our tool helps you bring your ideas to life.</p>
            <p>With secure storage and easy sharing options, you can access your creations anytime, anywhere.</p>
            <Link href="/register" className="btn">Join Now</Link>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDQ5NzB8MHwxfHNlYXJjaHwxfHxhaXxlbnwwfHx8fDE3MzkzMDkyNzd8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="AI Technology" />
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of users who are already creating amazing images with our platform</p>
        <Link href="/register" className="btn">Sign Up Now</Link>
      </section>

      <footer>
        <div style={{ textAlign: 'center', padding: '20px', background: '#f0f0f0', marginTop: '40px' }}>
          <p>© 2023 ImageGen. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

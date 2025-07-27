import Link from 'next/link';

export default function About() {
  return (
    <main>
      <header>
        <nav>
          <div className="logo"><Link href="/">ImageGen</Link></div>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      <section className="about" style={{ paddingTop: '40px' }}>
        <div className="about-container">
          <div className="about-text">
            <h2>About ImageGen</h2>
            <p>ImageGen is a cutting-edge platform that leverages the power of artificial intelligence to generate high-quality images from text descriptions.</p>
            <p>Our platform uses Replicate&apos;s state-of-the-art AI models to transform your ideas into stunning visuals in seconds.</p>
            <p>Whether you&apos;re a designer looking for inspiration, a marketer creating content, or just someone who wants to bring their imagination to life, ImageGen provides the tools you need.</p>
            <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#007BFF' }}>Our Technology</h3>
            <p>We use the latest advancements in AI image generation, specifically integrating with Replicate&apos;s powerful models. Our platform is built on a robust tech stack:</p>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', marginBottom: '20px' }}>
              <li>Next.js for a fast, responsive user experience</li>
              <li>PostgreSQL database for reliable data storage</li>
              <li>Vercel Blob Storage for efficient image management</li>
              <li>NextAuth.js for secure authentication</li>
              <li>Replicate API for state-of-the-art image generation</li>
            </ul>
          </div>
          <div className="about-image">
            <img src="/ai-technology.svg" alt="AI Technology" />
          </div>
        </div>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>How does image generation work?</h3>
            <p>Our platform uses advanced AI models that have been trained on millions of images. When you provide a text prompt, the AI interprets your description and generates a corresponding image based on its understanding of visual concepts.</p>
          </div>
          <div className="faq-item">
            <h3>How long does it take to generate an image?</h3>
            <p>Most images are generated within 10-30 seconds, depending on the complexity of your prompt and current server load.</p>
          </div>
          <div className="faq-item">
            <h3>Can I use the generated images commercially?</h3>
            <p>Yes, all images you generate on our platform belong to you and can be used for personal or commercial purposes.</p>
          </div>
          <div className="faq-item">
            <h3>Is my data secure?</h3>
            <p>We take data security seriously. Your account information is encrypted, and we do not share your prompts or generated images with third parties.</p>
          </div>
          <div className="faq-item">
            <h3>What if I&apos;m not satisfied with the generated image?</h3>
            <p>You can always refine your prompt and generate a new image. The more specific your description, the better the results will be.</p>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Ready to Create?</h2>
        <p>Join our platform today and start generating amazing images with AI</p>
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
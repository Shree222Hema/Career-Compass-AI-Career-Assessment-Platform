import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container-adv">
      {/* Advanced Hero Section */}
      <section className="section-adv" style={{ textAlign: 'center' }}>
        <div className="reveal stagger-1" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ padding: '8px 20px', fontSize: '14px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Powered by Next-Gen AI
          </div>
        </div>

        <h1 className="reveal stagger-1" style={{ fontSize: '5.5rem', marginBottom: '24px', letterSpacing: '-0.05em' }}>
          Navigate your <span className="text-gradient">Career Intelligence</span>
        </h1>

        <p className="reveal stagger-2" style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 48px' }}>
          Discover professional destinations aligned with your unique behavioral profile using Holland&apos;s RIASEC logic and predictive aptitude modeling.
        </p>

        <div className="reveal stagger-3" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link href="/register" className="btn-primary-adv" style={{ fontSize: '18px' }}>
            Take the Assessment
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
          <Link href="#features" className="glass-panel" style={{ padding: '16px 32px', textDecoration: 'none', color: 'white', fontWeight: 600, fontSize: '18px' }}>
            Explore Methodology
          </Link>
        </div>

        {/* Hero Visual */}
        <div className="reveal stagger-4" style={{ marginTop: '80px', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', border: '1px solid var(--glass-border)', position: 'relative', height: '600px' }}>
          <Image
            src="/hero.png"
            alt="Career Compass Visualization"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="section-adv">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>The <span className="text-gradient">RIASEC</span> Framework</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>We use psychological mapping to align your traits with career clusters.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {[
            { tag: "REALISTIC", title: "Hand-on Solvers", desc: "For those who enjoy practical, physical, and technical challenges.", color: "#3b82f6" },
            { tag: "INVESTIGATIVE", title: "Critical Thinkers", desc: "Ideal for inquisitive minds focused on research and science.", color: "#00f2ff" },
            { tag: "ARTISTIC", title: "Creative Spirits", desc: "Designed for individuals who thrive in self-expression and design.", color: "#ec4899" },
            { tag: "SOCIAL", title: "Empathic Helpers", desc: "Perfect for those dedicated to teaching and helping others.", color: "#10b981" },
            { tag: "ENTERPRISING", title: "Natural Leaders", desc: "For ambitious individuals focused on business and persuasion.", color: "#f59e0b" },
            { tag: "CONVENTIONAL", title: "Detail Masters", desc: "Suited for organized people who excel in data and efficiency.", color: "#7000ff" }
          ].map((feature, i) => (
            <div key={i} className={`glass-panel reveal stagger-${(i % 3) + 1}`} style={{ padding: '40px' }}>
              <div style={{ color: feature.color, fontWeight: 800, fontSize: '13px', letterSpacing: '0.15em', marginBottom: '16px' }}>{feature.tag}</div>
              <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

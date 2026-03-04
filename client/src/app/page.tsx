import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="section-padding animate-fade" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '40px', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <img src="/hero.png" alt="Career Compass AI" style={{ width: '100%', maxWidth: '800px', height: 'auto' }} />
        </div>
        <h1 style={{ fontSize: '4.5rem', marginBottom: '20px', lineHeight: 1.1 }}>
          Navigate Your Future with <span className="text-gradient">Precision AI</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px auto' }}>
          Career Compass analyzes your personality, interest, and aptitude to map out your perfect professional destination. No more guesswork, just data-driven clarity.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link href="/register" className="btn-primary">
            Start Free Assessment
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
          <Link href="#how-it-works" className="glass-card" style={{ padding: '14px 28px', textDecoration: 'none', color: 'white', fontWeight: 600 }}>
            How it Works
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="how-it-works" className="section-padding">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Our Multi-Dimensional <span className="text-gradient">Assessment Engine</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { title: "Interest Mapping", desc: "Discover what genuinely excites you through behavioral analysis.", icon: "🎯" },
            { title: "Aptitude Testing", desc: "Measure your logical and cognitive strengths across domains.", icon: "🧠" },
            { title: "Personality Profile", desc: "Deep dive into your traits and workplace preferences.", icon: "✨" },
            { title: "Academic Power", desc: "Align your current subjects with future career demands.", icon: "📚" }
          ].map((feature, i) => (
            <div key={i} className="glass-card" style={{ padding: '30px' }}>
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>{feature.icon}</div>
              <h3 style={{ marginBottom: '10px' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-card section-padding" style={{ margin: '80px 0', textAlign: 'center', padding: '60px' }}>
        <h2 style={{ fontSize: '2.8rem', marginBottom: '20px' }}>Ready to find your <span className="text-gradient">True North?</span></h2>
        <p style={{ marginBottom: '40px', color: 'var(--text-secondary)' }}>Join thousands of students who found clarity in their career choices.</p>
        <Link href="/assessment" className="btn-primary">Join Now</Link>
      </section>
    </div>
  );
}

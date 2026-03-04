import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Compass | AI Career Assessment",
  description: "Discover your ideal career path with AI-powered multi-dimensional assessment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="glass-card" style={{ margin: '20px', padding: '15px 30px', position: 'sticky', top: '20px', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="text-gradient" style={{ fontSize: '24px', fontWeight: 800 }}>CareerCompass</div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '14px', fontWeight: 500 }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
            <a href="/assessment" style={{ color: 'white', textDecoration: 'none' }}>Assessment</a>
            <a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a>
          </div>
        </nav>
        <main>{children}</main>
        <footer style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', fontSize: '14px' }}>
          &copy; 2026 Career Compass AI. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

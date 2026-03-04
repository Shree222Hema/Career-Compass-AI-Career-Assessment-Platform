import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Career Compass | AI Career Intelligence",
  description: "Navigate your professional future with cutting-edge AI assessments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Dynamic Background */}
        <div className="mesh-container">
          <div className="mesh-blob blob-1"></div>
          <div className="mesh-blob blob-2"></div>
          <div className="mesh-blob blob-3"></div>
        </div>

        <Navbar />

        <div style={{ paddingTop: '80px' }}>
          {children}
        </div>

        <footer className="container-adv" style={{ padding: '60px 0', borderTop: '1px solid var(--glass-border)', marginTop: '80px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
          <div>&copy; 2026 Career Compass AI</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Support</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

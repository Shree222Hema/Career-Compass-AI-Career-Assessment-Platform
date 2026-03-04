"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock login for now
        setTimeout(() => {
            alert("Access granted. Initializing session.");
            router.push("/assessment");
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="container-adv section-adv" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel reveal" style={{ width: '100%', maxWidth: '560px', padding: '60px' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Subject <span className="text-gradient">Access</span></h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem' }}>Enter your credentials to access your intelligence reports.</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: 600, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>EMAIL ADDRESS</label>
                        <input
                            type="email"
                            required
                            className="glass-panel"
                            style={{ width: '100%', padding: '16px 24px', background: 'rgba(255,255,255,0.01)', color: 'white', fontSize: '16px' }}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                        />
                    </div>

                    <div style={{ marginBottom: '48px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: 600, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>ENCRYPTION KEY</label>
                        <input
                            type="password"
                            required
                            className="glass-panel"
                            style={{ width: '100%', padding: '16px 24px', background: 'rgba(255,255,255,0.01)', color: 'white', fontSize: '16px' }}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn-primary-adv" style={{ width: '100%', justifyContent: 'center', fontSize: '18px' }} disabled={loading}>
                        {loading ? "Verifying..." : "Grant Access"}
                    </button>
                </form>

                <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '15px', color: 'var(--text-secondary)' }}>
                    Unregistered subject? <Link href="/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Create Profile</Link>
                </p>
            </div>
        </div>
    );
}

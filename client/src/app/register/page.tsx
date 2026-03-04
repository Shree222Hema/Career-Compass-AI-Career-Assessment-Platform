"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Intelligence profile initialized! Redirecting to analysis.");
                router.push("/assessment");
            } else {
                alert("Initialization failed. Subject identifier already in database.");
            }
        } catch (err) {
            console.error(err);
            alert("Network protocol failure.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-adv section-adv" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel reveal" style={{ width: '100%', maxWidth: '560px', padding: '60px' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Initialize <span className="text-gradient">Profile</span></h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem' }}>Your journey into professional intelligence starts here.</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: 600, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>FULL IDENTIFIER</label>
                        <input
                            type="text"
                            required
                            className="glass-panel"
                            style={{ width: '100%', padding: '16px 24px', background: 'rgba(255,255,255,0.01)', color: 'white', fontSize: '16px' }}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. John Doe"
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: 600, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>SECURE ACCESS KEY (EMAIL)</label>
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
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: 600, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>VITAL ENCRYPTION (PASSWORD)</label>
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
                        {loading ? "Initializing..." : "Create Profile"}
                    </button>
                </form>

                <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '15px', color: 'var(--text-secondary)' }}>
                    Existing subject? <Link href="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}

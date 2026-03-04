"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Career {
    id: string;
    title: string;
    description: string;
    fitPercentage: number;
    roadmap: string[];
    stream: string;
    courses: string;
    skills: string;
    backupOptions: string;
}

interface AssessmentResult {
    id: string;
    scores: Record<string, number>;
    results: Career[];
}

// Custom SVG Radar Chart Component with smooth transitions
const RadarChart = ({ scores }: { scores: Record<string, number> }) => {
    const dimensions = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'];
    const size = 300;
    const center = size / 2;
    const radius = center * 0.8;

    const points = dimensions.map((dim, i) => {
        const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
        const score = scores[dim] || 50;
        const x = center + radius * (score / 100) * Math.cos(angle);
        const y = center + radius * (score / 100) * Math.sin(angle);
        return { x, y, angle, label: dim };
    });

    const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size}>
                {/* Grid levels */}
                {[0.2, 0.4, 0.6, 0.8, 1].map(level => (
                    <polygon
                        key={level}
                        points={points.map(p => {
                            const x = center + radius * level * Math.cos(p.angle);
                            const y = center + radius * level * Math.sin(p.angle);
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />
                ))}
                {/* Axis lines */}
                {points.map((p, i) => (
                    <line
                        key={i}
                        x1={center}
                        y1={center}
                        x2={center + radius * Math.cos(p.angle)}
                        y2={center + radius * Math.sin(p.angle)}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />
                ))}
                {/* Score Polygon - Animated via CSS transitions on points if we use a better path approach */}
                <polygon
                    points={polygonPath}
                    fill="rgba(0, 242, 255, 0.15)"
                    stroke="var(--accent-primary)"
                    strokeWidth="2"
                    style={{ transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                {/* Data points */}
                {points.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="3"
                        fill="var(--accent-primary)"
                        style={{ transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                ))}
            </svg>
            {/* Labels */}
            {points.map((p, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    left: p.x + (p.x > center ? 10 : -70),
                    top: p.y + (p.y > center ? 10 : -20),
                    color: 'var(--text-secondary)',
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    {p.label}
                </div>
            ))}
        </div>
    );
};

export default function Dashboard() {
    const [result, setResult] = useState<{ scores: Record<string, number>; matches: Career[] } | null>(null);
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'market'>('overview');

    useEffect(() => {
        const saved = localStorage.getItem("latest_result");
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setResult(data);
                if (data.matches && data.matches.length > 0) {
                    setSelectedCareer(data.matches[0]);
                }
            } catch (e) {
                console.error("Failed to parse local results", e);
            }
        }
    }, []);

    if (!result || !result.matches) {
        return (
            <div className="container-adv section-adv" style={{ textAlign: "center" }}>
                <div className="glass-panel reveal" style={{ padding: '80px', maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Intelligence Required</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "40px" }}>Connect your behavioral dots. Complete the assessment to unlock your dynamic career matrix.</p>
                    <Link href="/assessment" className="btn-primary-adv">Initialize Assessment</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-adv section-adv" style={{ paddingTop: '120px' }}>
            <div className="reveal stagger-1" style={{ marginBottom: "60px" }}>
                <div style={{ color: "var(--accent-primary)", fontWeight: 800, fontSize: "12px", letterSpacing: '0.2em', marginBottom: '8px' }}>
                    BEHAVIORAL INTELLIGENCE HUB
                </div>
                <h1 style={{ fontSize: "3.5rem", marginBottom: "0", letterSpacing: '-0.02em' }}>Intelligence <span className="text-gradient">Dashboard</span></h1>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "40px" }}>
                {/* Left Module: Selection & Profile */}
                <div className="reveal stagger-2">
                    {/* Profile Card */}
                    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', background: 'rgba(255,255,255,0.01)' }}>
                        <h3 style={{ fontSize: '11px', fontWeight: 800, marginBottom: '24px', opacity: 0.5, letterSpacing: '0.1em' }}>YOUR RIASEC SPECTRUM</h3>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <RadarChart scores={result.scores} />
                        </div>
                    </div>

                    <h3 style={{ fontSize: '11px', fontWeight: 800, marginBottom: '16px', opacity: 0.5, letterSpacing: '0.1em' }}>TOP PATHWAYS</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {result.matches.slice(0, 5).map((career: Career) => {
                            const isActive = selectedCareer?.id === career.id;
                            return (
                                <div
                                    key={career.id}
                                    className="glass-panel"
                                    onClick={() => { setSelectedCareer(career); setActiveTab('overview'); }}
                                    style={{
                                        padding: "20px",
                                        cursor: "pointer",
                                        background: isActive ? "rgba(0, 242, 255, 0.05)" : "rgba(255, 255, 255, 0.02)",
                                        borderColor: isActive ? "var(--accent-primary)" : "rgba(255, 255, 255, 0.05)",
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>{career.title}</h4>
                                        <span style={{ fontWeight: 800, fontSize: "14px", color: isActive ? 'var(--accent-primary)' : 'white' }}>{career.fitPercentage}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Module: Contextual Intelligence */}
                {selectedCareer && (
                    <div className="reveal stagger-3">
                        <div className="glass-panel" style={{ padding: "0", overflow: 'hidden', minHeight: '700px' }}>
                            {/* Dynamic Header */}
                            <div style={{ padding: '48px', paddingBottom: '0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                                    <div>
                                        <h2 style={{ fontSize: "2.8rem", marginBottom: "8px", letterSpacing: '-0.01em' }}>{selectedCareer.title}</h2>
                                        <span style={{ fontSize: '14px', color: 'var(--accent-primary)', fontWeight: 700 }}>{selectedCareer.stream} Specialization</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '10px', fontWeight: 800, opacity: 0.5, marginBottom: '4px' }}>MATCH SCORE</div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 900 }} className="text-gradient">{selectedCareer.fitPercentage}%</div>
                                    </div>
                                </div>

                                {/* Tab Navigation */}
                                <div style={{ display: 'flex', gap: '40px' }}>
                                    <div
                                        className={`dashboard-tab ${activeTab === 'overview' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('overview')}
                                    >Overview</div>
                                    <div
                                        className={`dashboard-tab ${activeTab === 'roadmap' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('roadmap')}
                                    >Roadmap</div>
                                    <div
                                        className={`dashboard-tab ${activeTab === 'market' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('market')}
                                    >Market Insight</div>
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div style={{ padding: '48px' }}>
                                {activeTab === 'overview' && (
                                    <div className="reveal">
                                        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "40px", lineHeight: 1.6, fontWeight: 300 }}>
                                            {selectedCareer.description}
                                        </p>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                            <div className="market-card">
                                                <h4 style={{ color: 'var(--accent-primary)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '16px' }}>ACADEMIC FOCUS</h4>
                                                <p style={{ fontSize: '15px', lineHeight: 1.5, opacity: 0.8 }}>{selectedCareer.courses}</p>
                                            </div>
                                            <div className="market-card">
                                                <h4 style={{ color: 'var(--accent-primary)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '16px' }}>CORE COMPETENCIES</h4>
                                                <p style={{ fontSize: '15px', lineHeight: 1.5, opacity: 0.8 }}>{selectedCareer.skills}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'roadmap' && (
                                    <div className="reveal">
                                        <div style={{ position: "relative", paddingLeft: "40px" }}>
                                            <div style={{ position: 'absolute', left: '19px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, var(--accent-primary), transparent)' }}></div>
                                            {selectedCareer.roadmap.map((step: string, i: number) => (
                                                <div key={i} style={{ marginBottom: "32px", position: "relative" }}>
                                                    <div style={{
                                                        position: "absolute",
                                                        left: "-30px",
                                                        top: "4px",
                                                        width: "18px",
                                                        height: "18px",
                                                        borderRadius: "50%",
                                                        background: "var(--bg-primary)",
                                                        border: "3px solid var(--accent-primary)",
                                                        boxShadow: '0 0 10px var(--accent-primary)'
                                                    }}></div>
                                                    <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Phase {i + 1}</div>
                                                    <div style={{ color: "var(--text-secondary)", fontSize: '15px' }}>{step}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'market' && (
                                    <div className="reveal">
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
                                            <div className="market-card" style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '10px', fontWeight: 800, opacity: 0.5, marginBottom: '8px' }}>ESTIMATED STARTING SALARY</div>
                                                <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>$85k - $120k</div>
                                                <div style={{ fontSize: '12px', color: '#00ff88', marginTop: '8px' }}>+12% Industry growth</div>
                                            </div>
                                            <div className="market-card" style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '10px', fontWeight: 800, opacity: 0.5, marginBottom: '8px' }}>MARKET DEMAND (2025-2030)</div>
                                                <div style={{ fontSize: '2.5rem', fontWeight: 900 }} className="text-gradient">CRITICAL</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>High talent shortage</div>
                                            </div>
                                        </div>
                                        <div className="market-card">
                                            <h4 style={{ color: 'var(--accent-secondary)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '16px' }}>CONTINGENCY INTELLIGENCE</h4>
                                            <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Secondary Pathway: {selectedCareer.backupOptions}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

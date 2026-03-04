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

export default function Dashboard() {
    const [result, setResult] = useState<any>(null);
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("latest_result");
        if (saved) {
            const data = JSON.parse(saved);
            setResult(data);
            if (data.matches && data.matches.length > 0) {
                setSelectedCareer(data.matches[0]);
            }
        }
    }, []);

    if (!result) {
        return (
            <div className="container section-padding" style={{ textAlign: "center" }}>
                <h2 style={{ marginBottom: "20px" }}>No Assessment Data Found</h2>
                <p style={{ marginBottom: "40px", color: "var(--text-secondary)" }}>Please complete the career assessment first to view your personalized dashboard.</p>
                <Link href="/assessment" className="btn-primary">Take Assessment</Link>
            </div>
        );
    }

    return (
        <div className="container section-padding">
            <div style={{ marginBottom: "60px" }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Your <span className="text-gradient">Career Compass</span> Dashboard</h1>
                <p style={{ color: "var(--text-secondary)" }}>Based on your multi-dimensional profile, here are your best-suited career paths.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px" }}>
                {/* Left Sidebar - Matches List */}
                <div>
                    <h3 style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
                        Top Matches <span>{result.matches.length}</span>
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        {result.matches.map((career: Career, idx: number) => (
                            <div
                                key={career.id}
                                className="glass-card"
                                onClick={() => setSelectedCareer(career)}
                                style={{
                                    padding: "20px",
                                    cursor: "pointer",
                                    borderLeft: selectedCareer?.id === career.id ? "4px solid var(--accent-primary)" : "1px solid var(--glass-border)",
                                    background: selectedCareer?.id === career.id ? "rgba(255, 255, 255, 0.05)" : "var(--glass-bg)"
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <h4 style={{ margin: 0 }}>{career.title}</h4>
                                    <span className="text-gradient" style={{ fontWeight: 800, fontSize: "1.2rem" }}>{career.fitPercentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Content - Career Detail */}
                {selectedCareer && (
                    <div className="glass-card animate-fade" style={{ padding: "40px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" }}>
                            <div>
                                <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{selectedCareer.title}</h2>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "4px 12px", borderRadius: "20px", background: "rgba(0, 242, 255, 0.1)", color: "var(--accent-primary)", fontSize: "12px", fontWeight: 600 }}>
                                        {selectedCareer.stream}
                                    </span>
                                </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "5px" }}>Fit Score</div>
                                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-primary)" }}>{selectedCareer.fitPercentage}%</div>
                            </div>
                        </div>

                        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "40px" }}>{selectedCareer.description}</p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "40px" }}>
                            <div>
                                <h4 style={{ marginBottom: "15px", color: "var(--accent-primary)" }}>Recommended Courses</h4>
                                <p style={{ fontSize: "15px" }}>{selectedCareer.courses}</p>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: "15px", color: "var(--accent-primary)" }}>Skills to Develop</h4>
                                <p style={{ fontSize: "15px" }}>{selectedCareer.skills}</p>
                            </div>
                        </div>

                        <div style={{ marginBottom: "40px" }}>
                            <h4 style={{ marginBottom: "20px" }}>5-Year Career Roadmap</h4>
                            <div style={{ position: "relative", paddingLeft: "30px", borderLeft: "2px solid var(--glass-border)" }}>
                                {selectedCareer.roadmap.map((step, i) => (
                                    <div key={i} style={{ marginBottom: "20px", position: "relative" }}>
                                        <div style={{
                                            position: "absolute",
                                            left: "-41px",
                                            top: "0",
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            background: "var(--bg-primary)",
                                            border: "2px solid var(--accent-primary)"
                                        }}></div>
                                        <div style={{ color: "var(--text-secondary)" }}>{step}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: "20px", border: "1px dashed var(--glass-border)", background: "transparent" }}>
                            <h4 style={{ marginBottom: "10px", fontSize: "14px" }}>Backup Option</h4>
                            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{selectedCareer.backupOptions}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

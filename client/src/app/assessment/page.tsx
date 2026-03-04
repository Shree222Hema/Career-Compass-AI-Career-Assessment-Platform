"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Option {
    label: string;
    value: number;
}

interface Question {
    id: string;
    category: string;
    text: string;
    options: Option[];
}

export default function Assessment() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:5000/api/questions")
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching questions:", err));
    }, []);

    const handleSelect = (questionId: string, value: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            submitAssessment();
        }
    };

    const submitAssessment = async () => {
        setSubmitting(true);
        try {
            const response = await fetch("http://localhost:5000/api/assessment/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: null, responses: answers }),
            });
            const data = await response.json();
            localStorage.setItem("latest_result", JSON.stringify(data));
            router.push("/dashboard");
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="container-adv section-adv" style={{ textAlign: "center" }}>
                <div className="reveal">
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem' }}>Synthesizing Intelligence...</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>Mapping your unique behavioral profile.</p>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="container-adv section-adv">
            <div className="glass-panel reveal" style={{ maxWidth: "900px", margin: "0 auto", padding: "60px", position: 'relative' }}>
                {/* Header and Progress */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
                    <div>
                        <div style={{ color: "var(--accent-primary)", fontWeight: 800, fontSize: "14px", letterSpacing: '0.1em', marginBottom: '8px' }}>
                            STEP {currentIndex + 1} OF {questions.length}
                        </div>
                        <h3 style={{ fontSize: '32px' }}>{currentQuestion.category} <span className="text-gradient">Analysis</span></h3>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-secondary)', opacity: 0.5 }}>
                        {Math.round(progress)}%
                    </div>
                </div>

                <div className="adv-progress-wrap" style={{ marginBottom: '60px' }}>
                    <div className="adv-progress-bar" style={{ width: `${progress}%` }}></div>
                </div>

                {/* Question Content */}
                <div key={currentIndex} className="reveal stagger-1">
                    <h2 style={{ fontSize: "2.2rem", marginBottom: "48px", lineHeight: 1.2, maxWidth: '700px' }}>
                        {currentQuestion.text}
                    </h2>

                    <div style={{ display: "grid", gap: "16px", marginBottom: "60px" }}>
                        {currentQuestion.options.map((option, idx) => {
                            const isActive = answers[currentQuestion.id] === option.value;
                            return (
                                <label
                                    key={idx}
                                    className="glass-panel"
                                    style={{
                                        display: 'block',
                                        padding: "24px 32px",
                                        cursor: "pointer",
                                        border: isActive ? "1px solid var(--accent-primary)" : "1px solid var(--glass-border)",
                                        background: isActive ? "rgba(0, 242, 255, 0.05)" : "var(--glass-bg)",
                                        transition: 'var(--transition-smooth)'
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name={currentQuestion.id}
                                        value={option.value}
                                        checked={isActive}
                                        onChange={() => handleSelect(currentQuestion.id, option.value)}
                                        style={{ display: 'none' }}
                                    />
                                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                                        <div
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                borderRadius: "50%",
                                                border: "2px solid var(--accent-primary)",
                                                background: isActive ? "var(--accent-primary)" : "transparent",
                                                boxShadow: isActive ? '0 0 15px var(--accent-primary)' : 'none',
                                                transition: "all 0.3s ease",
                                            }}
                                        ></div>
                                        <span style={{
                                            fontSize: "1.2rem",
                                            fontWeight: isActive ? 600 : 400,
                                            color: isActive ? "white" : "var(--text-secondary)"
                                        }}>
                                            {option.label}
                                        </span>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button
                        onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            visibility: currentIndex === 0 ? 'hidden' : 'visible'
                        }}
                    >
                        Previous Stage
                    </button>

                    <button
                        className="btn-primary-adv"
                        onClick={handleNext}
                        disabled={answers[currentQuestion.id] === undefined || submitting}
                        style={{
                            opacity: answers[currentQuestion.id] === undefined || submitting ? 0.3 : 1,
                            padding: '18px 48px'
                        }}
                    >
                        {submitting ? "Synthesizing..." : currentIndex === questions.length - 1 ? "Generate Intelligence" : "Continue Analysis"}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

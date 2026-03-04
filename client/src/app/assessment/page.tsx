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
                body: JSON.stringify({ userId: "user_test_123", responses: answers }),
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
            <div className="container section-padding" style={{ textAlign: "center" }}>
                <h2 className="text-gradient">Loading Your Assessment...</h2>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="container section-padding">
            <div className="glass-card" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                    <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                        Question {currentIndex + 1} of {questions.length}
                    </span>
                    <span className="text-gradient" style={{ fontWeight: 700 }}>
                        {currentQuestion.category}
                    </span>
                </div>

                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>

                <h2 style={{ fontSize: "1.8rem", marginBottom: "40px", lineHeight: 1.3 }}>
                    {currentQuestion.text}
                </h2>

                <div style={{ marginBottom: "40px" }}>
                    {currentQuestion.options.map((option, idx) => (
                        <label
                            key={idx}
                            className={`assessment-option ${answers[currentQuestion.id] === option.value ? "selected" : ""}`}
                        >
                            <input
                                type="radio"
                                name={currentQuestion.id}
                                value={option.value}
                                checked={answers[currentQuestion.id] === option.value}
                                onChange={() => handleSelect(currentQuestion.id, option.value)}
                            />
                            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        border: "2px solid var(--accent-primary)",
                                        background: answers[currentQuestion.id] === option.value ? "var(--accent-primary)" : "transparent",
                                        transition: "all 0.3s ease",
                                    }}
                                ></div>
                                <span style={{ fontSize: "1.1rem", color: answers[currentQuestion.id] === option.value ? "white" : "var(--text-secondary)" }}>
                                    {option.label}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                        className="btn-primary"
                        onClick={handleNext}
                        disabled={answers[currentQuestion.id] === undefined || submitting}
                        style={{ opacity: answers[currentQuestion.id] === undefined || submitting ? 0.5 : 1 }}
                    >
                        {submitting ? "Processing..." : currentIndex === questions.length - 1 ? "Get Results" : "Next Question"}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

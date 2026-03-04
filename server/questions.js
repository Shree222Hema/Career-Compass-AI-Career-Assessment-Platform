const questions = [
    // Interest (25%)
    {
        id: "i1",
        category: "Interest",
        text: "How much do you enjoy solving logical puzzles or mathematical problems?",
        options: [
            { label: "Not at all", value: 20 },
            { label: "Slightly", value: 40 },
            { label: "Moderately", value: 60 },
            { label: "Very much", value: 80 },
            { label: "Extremely", value: 100 }
        ]
    },
    {
        id: "i2",
        category: "Interest",
        text: "Do you like creating art, designs, or aesthetic layouts?",
        options: [
            { label: "Not at all", value: 20 },
            { label: "Slightly", value: 40 },
            { label: "Moderately", value: 60 },
            { label: "Very much", value: 80 },
            { label: "Extremely", value: 100 }
        ]
    },
    // Aptitude (25%)
    {
        id: "a1",
        category: "Aptitude",
        text: "I am quick to understand how machines or software systems work.",
        options: [
            { label: "Strongly Disagree", value: 20 },
            { label: "Disagree", value: 40 },
            { label: "Neutral", value: 60 },
            { label: "Agree", value: 80 },
            { label: "Strongly Agree", value: 100 }
        ]
    },
    {
        id: "a2",
        category: "Aptitude",
        text: "I find it easy to analyze trends and data points.",
        options: [
            { label: "Strongly Disagree", value: 20 },
            { label: "Disagree", value: 40 },
            { label: "Neutral", value: 60 },
            { label: "Agree", value: 80 },
            { label: "Strongly Agree", value: 100 }
        ]
    },
    // Personality (20%)
    {
        id: "p1",
        category: "Personality",
        text: "I consider myself an empathetic person who enjoys helping others.",
        options: [
            { label: "Strongly Disagree", value: 20 },
            { label: "Disagree", value: 40 },
            { label: "Neutral", value: 60 },
            { label: "Agree", value: 80 },
            { label: "Strongly Agree", value: 100 }
        ]
    },
    {
        id: "p2",
        category: "Personality",
        text: "I prefer working alone on technical tasks rather than in large groups.",
        options: [
            { label: "Strongly Disagree", value: 20 },
            { label: "Disagree", value: 40 },
            { label: "Neutral", value: 60 },
            { label: "Agree", value: 80 },
            { label: "Strongly Agree", value: 100 }
        ]
    },
    // Values (10%)
    {
        id: "v1",
        category: "Values",
        text: "How important is work-life balance and mental well-being to you?",
        options: [
            { label: "Not important", value: 20 },
            { label: "Somewhat important", value: 50 },
            { label: "Very important", value: 80 },
            { label: "Crucial", value: 100 }
        ]
    },
    {
        id: "v2",
        category: "Values",
        text: "How much do you value financial stability and high earning potential?",
        options: [
            { label: "Not important", value: 20 },
            { label: "Somewhat important", value: 50 },
            { label: "Very important", value: 80 },
            { label: "Crucial", value: 100 }
        ]
    }
];

module.exports = questions;

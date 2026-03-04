const questions = [
    // --- REALISTIC (R) ---
    {
        id: "r1",
        category: "Realistic",
        text: "How much would you enjoy building or repairing physical objects or machinery?",
        options: [
            { label: "Strongly Dislike", value: 1 },
            { label: "Neutral", value: 3 },
            { label: "Strongly Enjoy", value: 5 }
        ]
    },
    {
        id: "r2",
        category: "Realistic",
        text: "Do you prefer working outdoors in hands-on environments over office settings?",
        options: [
            { label: "Definitely No", value: 1 },
            { label: "Sometimes", value: 3 },
            { label: "Definitely Yes", value: 5 }
        ]
    },
    {
        id: "r3",
        category: "Realistic",
        text: "How interested are you in learning how to operate specialized tools or complex equipment?",
        options: [
            { label: "Not at all", value: 1 },
            { label: "Moderately", value: 3 },
            { label: "Highly Interested", value: 5 }
        ]
    },

    // --- INVESTIGATIVE (I) ---
    {
        id: "i1",
        category: "Investigative",
        text: "How much do you enjoy solving complex mathematical or scientific problems?",
        options: [
            { label: "Minimal interest", value: 1 },
            { label: "Some interest", value: 3 },
            { label: "Passionate about it", value: 5 }
        ]
    },
    {
        id: "i2",
        category: "Investigative",
        text: "Do you like researching new topics and gathering data to find evidence-based answers?",
        options: [
            { label: "No, too tedious", value: 1 },
            { label: "If necessary", value: 3 },
            { label: "Yes, I love research", value: 5 }
        ]
    },
    {
        id: "i3",
        category: "Investigative",
        text: "How often do you find yourself asking 'why' things work the way they do?",
        options: [
            { label: "Rarely", value: 1 },
            { label: "Occasionally", value: 3 },
            { label: "Constantly", value: 5 }
        ]
    },

    // --- ARTISTIC (A) ---
    {
        id: "a1",
        category: "Artistic",
        text: "How often do you express your ideas through creative mediums (drawing, writing, design)?",
        options: [
            { label: "Almost never", value: 1 },
            { label: "Occasionally", value: 3 },
            { label: "Every day", value: 5 }
        ]
    },
    {
        id: "a2",
        category: "Artistic",
        text: "Do you prefer work that has no set rules and allows for total creative freedom?",
        options: [
            { label: "I prefer structure", value: 1 },
            { label: "Balance is good", value: 3 },
            { label: "Freedom is essential", value: 5 }
        ]
    },
    {
        id: "a3",
        category: "Artistic",
        text: "How much do you value aesthetic design and visual harmony in your daily life?",
        options: [
            { label: "Low priority", value: 1 },
            { label: "Moderately", value: 3 },
            { label: "High priority", value: 5 }
        ]
    },

    // --- SOCIAL (S) ---
    {
        id: "s1",
        category: "Social",
        text: "How rewarding do you find the process of teaching others or sharing knowledge?",
        options: [
            { label: "Not rewarding", value: 1 },
            { label: "Somewhat", value: 3 },
            { label: "Very rewarding", value: 5 }
        ]
    },
    {
        id: "s2",
        category: "Social",
        text: "Do you enjoy working in teams where the focus is on helping people improve their lives?",
        options: [
            { label: "I prefer solo work", value: 1 },
            { label: "In small groups", value: 3 },
            { label: "Yes, people first", value: 5 }
        ]
    },
    {
        id: "s3",
        category: "Social",
        text: "How comfortable are you in roles that require high emotional intelligence and empathy?",
        options: [
            { label: "Uncomfortable", value: 1 },
            { label: "Can manage", value: 3 },
            { label: "Very natural", value: 5 }
        ]
    },

    // --- ENTERPRISING (E) ---
    {
        id: "e1",
        category: "Enterprising",
        text: "How much do you enjoy persuading others to adopt your ideas or buy a product?",
        options: [
            { label: "I dislike it", value: 1 },
            { label: "If I believe in it", value: 3 },
            { label: "I excel at it", value: 5 }
        ]
    },
    {
        id: "e2",
        category: "Enterprising",
        text: "Do you have a strong desire to lead projects and manage groups of people?",
        options: [
            { label: "Not really", value: 1 },
            { label: "Occasionally", value: 3 },
            { label: "Strongly Yes", value: 5 }
        ]
    },
    {
        id: "e3",
        category: "Enterprising",
        text: "How interested are you in business, startups, and competitive environments?",
        options: [
            { label: "Not interested", value: 1 },
            { label: "Moderately", value: 3 },
            { label: "Highly Competitive", value: 5 }
        ]
    },

    // --- CONVENTIONAL (C) ---
    {
        id: "c1",
        category: "Conventional",
        text: "How much do you value precision, organization, and following clear protocols?",
        options: [
            { label: "Low value", value: 1 },
            { label: "Moderately", value: 3 },
            { label: "Extremely high", value: 5 }
        ]
    },
    {
        id: "c2",
        category: "Conventional",
        text: "Do you enjoy working with data, numbers, and structured information systems?",
        options: [
            { label: "No, too dry", value: 1 },
            { label: "If structured", value: 3 },
            { label: "Yes, I love data", value: 5 }
        ]
    },
    {
        id: "c3",
        category: "Conventional",
        text: "How satisfied are you when completing tasks that require high attention to detail?",
        options: [
            { label: "Not satisfied", value: 1 },
            { label: "Somewhat", value: 3 },
            { label: "Very satisfied", value: 5 }
        ]
    }
];

module.exports = questions;

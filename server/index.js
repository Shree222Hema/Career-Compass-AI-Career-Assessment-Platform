const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const questions = require('./questions');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// --- Routes ---

// Get Assessment Questions
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

// 1. Scoring Logic
const calculateScore = (responses) => {
    // responses: { questionId: value, ... }
    const categories = { Interest: 0, Aptitude: 0, Personality: 0, Academic: 80, Values: 0 };
    const counts = { Interest: 0, Aptitude: 0, Personality: 0, Values: 0 };

    questions.forEach(q => {
        if (responses[q.id] !== undefined) {
            categories[q.category] += responses[q.id];
            counts[q.category]++;
        }
    });

    // Average the scores per category
    Object.keys(counts).forEach(cat => {
        if (counts[cat] > 0) {
            categories[cat] = Math.round(categories[cat] / counts[cat]);
        }
    });

    return categories;
};

const getCareerMatches = async (userScores) => {
    const careers = await prisma.career.findMany();

    const matches = careers.map(career => {
        const criteria = JSON.parse(career.fitCriteria);
        let fitScore = 0;

        // Interest (25%)
        fitScore += (100 - Math.abs(userScores.Interest - criteria.Interest)) * 0.25;
        // Aptitude (25%)
        fitScore += (100 - Math.abs(userScores.Aptitude - criteria.Aptitude)) * 0.25;
        // Personality (20%)
        fitScore += (100 - Math.abs(userScores.Personality - criteria.Personality)) * 0.20;
        // Academic (20%) - Mocked for now
        fitScore += (100 - Math.abs(userScores.Academic - criteria.Academic)) * 0.20;
        // Values (10%)
        fitScore += (100 - Math.abs(userScores.Values - criteria.Values)) * 0.10;

        return {
            id: career.id,
            title: career.title,
            description: career.description,
            fitPercentage: Math.round(fitScore),
            roadmap: JSON.parse(career.roadmap),
            stream: career.stream,
            courses: career.courses,
            skills: career.skills,
            backupOptions: career.backupOptions
        };
    });

    return matches.sort((a, b) => b.fitPercentage - a.fitPercentage);
};

// --- Endpoints ---

// Submit Assessment
app.post('/api/assessment/submit', async (req, res) => {
    const { userId, responses } = req.body;
    try {
        const scores = calculateScore(responses);
        const matches = await getCareerMatches(scores);

        const assessment = await prisma.assessment.create({
            data: {
                userId: userId || "guest", // Placeholder if no userId
                responses: JSON.stringify(responses),
                scores: JSON.stringify(scores),
                results: JSON.stringify(matches)
            }
        });

        res.json({ assessmentId: assessment.id, scores, matches });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Get Latest Result
app.get('/api/assessment/latest/:userId', async (req, res) => {
    try {
        const assessment = await prisma.assessment.findFirst({
            where: { userId: req.params.userId },
            orderBy: { createdAt: 'desc' }
        });
        if (!assessment) return res.status(404).json({ error: "No results found" });

        res.json({
            ...assessment,
            responses: JSON.parse(assessment.responses),
            scores: JSON.parse(assessment.scores),
            results: JSON.parse(assessment.results)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

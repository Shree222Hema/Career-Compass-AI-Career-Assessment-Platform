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

// --- Advanced RIASEC Scoring Logic ---
const calculateRIASEC = (responses) => {
    // Current RIASEC Dimensions
    const dimensions = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'];
    const scores = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };
    const counts = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };

    questions.forEach(q => {
        if (responses[q.id] !== undefined) {
            scores[q.category] += responses[q.id];
            counts[q.category]++;
        }
    });

    // Normalize to 0-100 scale per dimension
    const normalized = {};
    dimensions.forEach(dim => {
        if (counts[dim] > 0) {
            // formula: (total / (max_val * count)) * 100
            normalized[dim] = Math.round((scores[dim] / (5 * counts[dim])) * 100);
        } else {
            normalized[dim] = 50; // Neutral fallback
        }
    });

    return normalized;
};

const matchRIASECCareers = async (userProfile) => {
    const careers = await prisma.career.findMany();
    const dimensions = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'];

    const matches = careers.map(career => {
        const targetProfile = JSON.parse(career.fitCriteria);

        // Euclidean distance based similarity (inverse)
        let sumSquaredDiff = 0;
        dimensions.forEach(dim => {
            const diff = userProfile[dim] - targetProfile[dim];
            sumSquaredDiff += diff * diff;
        });

        const maxDistance = Math.sqrt(dimensions.length * (100 * 100));
        const distance = Math.sqrt(sumSquaredDiff);
        const similarity = Math.round((1 - (distance / maxDistance)) * 100);

        return {
            id: career.id,
            title: career.title,
            description: career.description,
            fitPercentage: similarity,
            roadmap: JSON.parse(career.roadmap),
            stream: career.stream,
            courses: career.courses,
            skills: career.skills,
            backupOptions: career.backupOptions,
            profile: targetProfile
        };
    });

    return matches.sort((a, b) => b.fitPercentage - a.fitPercentage);
};

// --- Endpoints ---

app.get('/api/questions', (req, res) => res.json(questions));

app.post('/api/assessment/submit', async (req, res) => {
    const { userId, responses } = req.body;
    try {
        const scores = calculateRIASEC(responses);
        const matches = await matchRIASECCareers(scores);

        const assessment = await prisma.assessment.create({
            data: {
                userId: userId || null,
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

app.listen(PORT, () => console.log(`RIASEC Core Intelligence running on port ${PORT}`));

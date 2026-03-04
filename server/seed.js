require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const careers = [
        {
            title: "Software Engineer",
            description: "Design and build software applications and systems.",
            fitCriteria: JSON.stringify({
                Interest: 90,
                Aptitude: 95,
                Personality: 70,
                Academic: 85,
                Values: 80
            }),
            roadmap: JSON.stringify([
                "Year 1: Learn programming fundamentals (Python, JS).",
                "Year 2: Data structures and algorithms.",
                "Year 3: Web or App development frameworks.",
                "Year 4: Internships and open source contributions.",
                "Year 5: Landing a junior role and specializing."
            ]),
            stream: "PCM (Physics, Chemistry, Maths)",
            courses: "B.Tech/B.E in Computer Science, BCA, Software Engineering degree",
            skills: "Problem Solving, Logic, JavaScript, Python, System Design",
            backupOptions: "Data Analyst, QA Engineer, Technical Writer"
        },
        {
            title: "Data Scientist",
            description: "Analyze complex data to help organizations make better decisions.",
            fitCriteria: JSON.stringify({
                Interest: 85,
                Aptitude: 90,
                Personality: 60,
                Academic: 90,
                Values: 75
            }),
            roadmap: JSON.stringify([
                "Year 1: Strong foundation in Maths and Statistics.",
                "Year 2: Learn Python/R and SQL.",
                "Year 3: Machine Learning basics.",
                "Year 4: Data visualization and advanced analytics projects.",
                "Year 5: Portfolio building and Data Science certifications."
            ]),
            stream: "PCM or Commerce with Applied Maths",
            courses: "B.Sc in Statistics, Data Science, or B.Tech",
            skills: "Statistics, Python, SQL, Machine Learning, Data Viz",
            backupOptions: "Business Analyst, Financial Analyst"
        },
        {
            title: "UX Designer",
            description: "Create user-friendly and aesthetically pleasing digital experiences.",
            fitCriteria: JSON.stringify({
                Interest: 95,
                Aptitude: 80,
                Personality: 85,
                Academic: 70,
                Values: 90
            }),
            roadmap: JSON.stringify([
                "Year 1: Learn design principles and typography.",
                "Year 2: Master design tools like Figma/Adobe XD.",
                "Year 3: Conduct user research and wireframing.",
                "Year 4: Build a strong UI/UX portfolio.",
                "Year 5: Networking and landing a design agency role."
            ]),
            stream: "Any (Humanities/Arts preferred but not mandatory)",
            courses: "B.Des in Interaction Design, UI/UX Bootcamps",
            skills: "Empathy, Creativity, Figma, Prototyping, User Research",
            backupOptions: "Graphic Designer, Product Manager"
        },
        {
            title: "Business Analyst",
            description: "Bridging the gap between IT and business using data analytics.",
            fitCriteria: JSON.stringify({
                Interest: 80,
                Aptitude: 85,
                Personality: 90,
                Academic: 80,
                Values: 85
            }),
            roadmap: JSON.stringify([
                "Year 1: Understand business fundamentals.",
                "Year 2: Learn Excel and basic data analysis.",
                "Year 3: Process modeling and requirements gathering.",
                "Year 4: Certifications in BA (like IIBA).",
                "Year 5: Corporate internships and MBA (optional)."
            ]),
            stream: "Commerce or any with Management",
            courses: "BBA, B.Com, MBA",
            skills: "Communication, Excel, SQL, Process Mapping",
            backupOptions: "Project Coordinator, Sales Analyst"
        },
        {
            title: "Psychologist",
            description: "Study mental processes and human behavior to help people.",
            fitCriteria: JSON.stringify({
                Interest: 90,
                Aptitude: 75,
                Personality: 95,
                Academic: 85,
                Values: 95
            }),
            roadmap: JSON.stringify([
                "Year 1: Introduction to Psychology.",
                "Year 2: Cognitive and Behavioral studies.",
                "Year 3: Research methods and internships.",
                "Year 4: Specialization (Clinical, Counseling, etc.).",
                "Year 5: Master's degree and supervised practice."
            ]),
            stream: "Humanities / Arts",
            courses: "B.A/B.Sc in Psychology, M.A in Clinical Psychology",
            skills: "Empathy, Listening, Critical Thinking, Research",
            backupOptions: "Counselor, HR Specialist, Social Worker"
        }
    ];

    for (const career of careers) {
        await prisma.career.upsert({
            where: { title: career.title },
            update: career,
            create: career,
        });
    }
    console.log("Seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

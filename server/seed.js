const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const careers = [
        {
            title: "Hardware Robotics Engineer",
            description: "Design and build physical robotic systems for aerospace, medicine, or manufacturing. Requires hands-on mechanical skill and deep scientific inquiry.",
            fitCriteria: JSON.stringify({ Realistic: 90, Investigative: 85, Artistic: 40, Social: 30, Enterprising: 50, Conventional: 70 }),
            roadmap: JSON.stringify(["B.Tech in Mechatronics", "Certification in ROS", "Internship at Tesla/NASA", "Master's in Robotics", "Senior Robotics Lead"]),
            stream: "Science / Engineering",
            courses: "Mechatronics, Mechanical Engineering, IoT Specialization",
            skills: "CAD, Python, Circuit Design, C++, Mechanical Assembly",
            backupOptions: "Automotive Engineer, IoT Solutions Architect"
        },
        {
            title: "Data Intelligence Scientist",
            description: "Analyze massive datasets to predict future trends and build AI models. Highly investigative and data-driven role.",
            fitCriteria: JSON.stringify({ Realistic: 30, Investigative: 95, Artistic: 50, Social: 40, Enterprising: 60, Conventional: 85 }),
            roadmap: JSON.stringify(["B.Sc in Computer Science", "Bootcamp in Data Science", "Junior Data Analyst", "Kaggle Competitions", "Principal Data Scientist"]),
            stream: "Science / IT",
            courses: "Data Analytics, Machine Learning, Statistical Modeling",
            skills: "Python, SQL, PyTorch, R, Data Visualization (Tableau)",
            backupOptions: "Business Intelligence Analyst, Quantitative Researcher"
        },
        {
            title: "UX/UI Strategy Lead",
            description: "Creating the digital experience of the future. Combines artistic expression with investigative user research.",
            fitCriteria: JSON.stringify({ Realistic: 20, Investigative: 70, Artistic: 95, Social: 60, Enterprising: 50, Conventional: 40 }),
            roadmap: JSON.stringify(["Degree in Design / Fine Arts", "Google UX Certification", "Junior Product Designer", "UX Lead at Tech Firm", "VP of Design"]),
            stream: "Creative Arts / Design",
            courses: "Interaction Design, Cognitive Psychology, Visual Arts",
            skills: "Figma, Adobe XD, HTML/CSS, User Research, Wireframing",
            backupOptions: "Frontend Developer, Digital Brand Strategist"
        },
        {
            title: "Clinical Neuropsychologist",
            description: "Helping individuals overcome complex cognitive challenges. Deeply social and investigative.",
            fitCriteria: JSON.stringify({ Realistic: 10, Investigative: 90, Artistic: 30, Social: 95, Enterprising: 40, Conventional: 60 }),
            roadmap: JSON.stringify(["B.A. in Psychology", "M.Sc in Neuropsychology", "Ph.D. / Clinical Training", "Private Practice / Hospital", "Research Clinic Director"]),
            stream: "Humanities / Science",
            courses: "Clinical Psychology, Brain Mapping, Cognitive Therapy",
            skills: "Empathy, Scientific Observation, Diagnosis, Patient Care",
            backupOptions: "Clinical Researcher, Brain Health Consultant"
        },
        {
            title: "Fintech Startup Founder",
            description: "Building the next generation of financial systems. Requires massive enterprising drive and detail-oriented financial knowledge.",
            fitCriteria: JSON.stringify({ Realistic: 30, Investigative: 60, Artistic: 40, Social: 50, Enterprising: 95, Conventional: 80 }),
            roadmap: JSON.stringify(["Degree in Finance/CS", "MBA (Optional)", "Fintech Venture Associate", "Seed Funding Round", "Global Platform CEO"]),
            stream: "Commerce / Management",
            courses: "Venture Capital, Blockchain Tech, Business Management",
            skills: "Persuasion, Financial Modeling, Strategy, Public Speaking",
            backupOptions: "Venture Capitalist, Financial Director"
        },
        {
            title: "Sustainability Architect",
            description: "Designing the cities of the future with zero carbon footprint. Artistic vision meets engineering reality.",
            fitCriteria: JSON.stringify({ Realistic: 70, Investigative: 60, Artistic: 85, Social: 50, Enterprising: 40, Conventional: 70 }),
            roadmap: JSON.stringify(["Bachelor of Architecture", "LEED Certification", "Green Building Internship", "Principal Urban Planner", "Sustainable City Consultant"]),
            stream: "Applied Arts / Science",
            courses: "Sustainable Design, Environmental Engineering, HVAC Tech",
            skills: "REVIT, SketchUp, Eco-modeling, Project Management",
            backupOptions: "Urban Designer, Environmental Engineer"
        }
    ];

    for (const career of careers) {
        await prisma.career.upsert({
            where: { title: career.title },
            update: career,
            create: career,
        });
    }

    console.log('Advanced career dataset seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

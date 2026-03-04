# Career Compass – AI Career Intelligence Platform

![Career Compass Hero](client/public/hero.png)

Career Compass is a next-generation career guidance platform. It leverages advanced psychological profiling and vector-based matching algorithms to align a user's behavioral traits with tailored professional destinations and actionable academic roadmaps.

## 🚀 Key Features

*   **RIASEC Intelligence Core**: Utilizes the industry-standard Holland Occupational Themes (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) for deep behavioral analysis.
*   **Vector Similarity Matching**: Evaluates user profiles against a curated career matrix using multidimensional Euclidean distance calculations.
*   **Premium Visual Architecture**: Features a high-end UI with dynamic mesh backgrounds, synchronized reveal animations, and advanced glassmorphism.
*   **Dynamic Intelligence Dashboard**: A sophisticated, modular results interface featuring a custom-built SVG Radar Chart and animated evolution timelines.
*   **Market Intelligence**: Provides real-time insights into salary projections, job market demand, and secondary contingency pathways.

## 🛠️ Tech Stack & Architecture

*   **Frontend**: Next.js (App Router), React 19, Custom Vanilla CSS (Framer Motion-style animations).
*   **Backend**: Node.js, Express.js RESTful API.
*   **Database**: SQLite via Prisma ORM.

## ⚙️ How to Run the Application

### 1. Initialize the Intelligence Core (Backend)
The backend handles the RIASEC scoring logic, vector matching, and SQLite database persistence.

```bash
cd server
npm install
npx prisma generate
node seed.js  # Seeds the advanced career matrix
node index.js
```
*The core server will run on `http://localhost:5000`.*

### 2. Initialize the Client Interface (Frontend)
The frontend serves the dynamic UI and connects to the core intelligence API.

```bash
cd client
npm install
npm run dev
```
*The platform will be accessible at `http://localhost:3000`.*

## 🔒 Security & Persistence
Currently utilizes an anonymous "Guest" tracking system for low-friction onboarding, seamlessly persisting assessment results to the SQLite database without requiring immediate account creation.

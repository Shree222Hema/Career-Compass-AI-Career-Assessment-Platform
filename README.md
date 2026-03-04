# Career Compass – AI Career Assessment Platform

![Career Compass Hero](client/public/hero.png)

Career Compass helps students discover suitable careers based on multiple psychological and academic factors.

## How to Run the Application

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Setup & Start the Backend
The backend handles the assessment logic, database storage, and career matching.

```bash
cd server
npm install
npx prisma generate
node index.js
```
*The server will run on `http://localhost:5000`.*

### 2. Setup & Start the Frontend
The frontend provides the interactive user interface.

```bash
cd client
npm install
npm run dev
```
*The frontend will be available at `http://localhost:3000`.*

## Project Structure
- `/server`: Express.js API with Prisma ORM and SQLite.
- `/client`: Next.js (App Router) with premium vanilla CSS styling.

## Core Assessment Factors
- **Interest** (25%)
- **Aptitude** (25%)
- **Personality** (20%)
- **Academic Strength** (20%)
- **Values** (10%)

# Humeen

A futuristic, sci-fi themed application with a Next.js frontend and Spring Boot backend.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18 or higher (LTS recommended)
- **Java Development Kit (JDK)**: v17 or higher
- **Maven**: v3.6 or higher

## Project Structure

- `frontend/`: Next.js application (React, TypeScript, Tailwind CSS)
- `backend/`: Spring Boot application (Java)

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```

   The backend server will start on `http://localhost:8080`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend application will be available at `http://localhost:3000`.

## Troubleshooting

### Hydration Mismatch
If you see "Hydration failed" errors in the console, they are likely benign and caused by browser extensions modifying the DOM. We have added `suppressHydrationWarning` to common targets, but if you experience issues, try disabling extensions.

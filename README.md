# Crypto Sentiment Frontend

This is the frontend for the Crypto Sentiment Analyzer, providing a real-time dashboard for visualizing cryptocurrency prices and social sentiment.

## Features
- React-based SPA with modern UI
- Visualizes live price and sentiment data for Bitcoin, Ethereum, and Dogecoin
- Displays top positive and negative Reddit posts per coin
- Responsive design for desktop and mobile

## Tech Stack
- React 18+
- Tailwind CSS
- Axios, React Query

## Setup

### 1. Clone the repo and install dependencies
```sh
npm install
```

### 2. Configure Environment
- Create a `.env` file and set `VITE_API_URL` to your backend API URL (e.g., `http://localhost:3000`).

### 3. Start the Frontend
```sh
npm run dev
```
- The app will be available at `http://localhost:5173` (or as shown in your terminal).

## Notes
- This app expects the backend and Python ML service to be running.
- No sensitive data or API keys should be committed to the repo.

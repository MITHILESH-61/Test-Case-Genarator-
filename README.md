# Test Case Generator

Full-stack AI-powered platform for generating repository-aware test cases.

## Stack

- Client: React, Vite, Tailwind CSS, React Router, Axios, Zustand
- Server: Node.js, Express, MongoDB, Mongoose, JWT
- AI: Groq through the OpenAI-compatible SDK
- Memory: deterministic embeddings stored in MongoDB

## Environment

Server secrets live in `server/.env`.

```env
MONGODB_URI=mongodb://127.0.0.1:27017/test-case-generator
JWT_SECRET=replace-this-with-a-long-random-secret
GROQ_API_KEY=your_groq_api_key
```

Client API configuration lives in `client/.env`.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Run Locally

```bash
npm run install:all
npm run dev
```

Or run each app separately:

```bash
npm --prefix server run dev
npm --prefix client run dev
```

The server runs on `http://localhost:5000` and the client runs on `http://localhost:5173`.


# contentcraft-ai-89805-91282

This workspace includes:
- nextjs_frontend: Next.js UI for ContentCraft AI.
- backend: FastAPI backend (provided separately in another workspace) at http://localhost:3001.

Run frontend:
- cd nextjs_frontend
- cp .env.example .env.local
- npm install
- npm run dev

Ensure backend is running and accessible at NEXT_PUBLIC_API_BASE_URL.
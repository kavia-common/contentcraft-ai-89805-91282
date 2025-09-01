# ContentCraft AI Frontend (Next.js)

Modern light-themed UI for generating, editing, and managing AI-powered blog posts.

## Quick Start

1) Copy env vars
```
cp .env.example .env.local
```
Adjust `NEXT_PUBLIC_API_BASE_URL` if needed (default: `http://localhost:3001`).

2) Install and run
```
npm install
npm run dev
```

Open http://localhost:3000

## Features

- User authentication (signup/login) using JWT from backend
- Prompt input to generate blog drafts
- Edit and save blogs with status (draft/published/archived)
- Blog list and recent history sidebar
- Responsive, modern light theme using palette:
  - primary: #1a73e8
  - secondary: #fbbc05
  - accent: #34a853

## Notes

- Tokens are stored in `localStorage` as `access_token`.
- API endpoints are called at `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:3001`).
- Static export is enabled; ensure the backend URL is accessible at runtime.

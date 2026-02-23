# Espresso URL Shortener

Espresso is a fast, modern URL shortener application. It is built using a powerful tech stack to ensure high performance, type safety, and a great developer experience.

## Features

- **Create Short URLs:** Shorten long, complex URLs into easy-to-share links.
- **Redirection:** Fast and reliable redirection from short links to original URLs.
- **Modern Stack:** Built with NestJS (Fastify), React (Vite), and PostgreSQL.
- **Dockerized:** Easy to run and deploy using Docker Compose.

## Tech Stack

### Backend
- **Framework:** [NestJS](https://nestjs.com/) using the [Fastify](https://www.fastify.io/) adapter for maximum performance.
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/)

### Frontend
- **Framework:** [React](https://react.dev/) via [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** [React Bootstrap](https://react-bootstrap.github.io/) / [Bootstrap](https://getbootstrap.com/)

### Infrastructure
- **Containerization:** Docker & Docker Compose

## Getting Started

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.
- Optional (for local development without Docker): Node.js (v18+) and npm.

### Running with Docker (Recommended)

The easiest way to get the application running is by using Docker Compose. This will spin up the database, the backend, and the frontend.

1. Clone the repository and navigate to the project directory:
   ```bash
   cd espresso-url
   ```

2. Start the services using Docker Compose:
   ```bash
   docker compose up -d
   ```

3. Access the application:
   - **Frontend:** http://localhost:5173
   - **Backend API:** http://localhost:3000

To stop the services, run:
```bash
docker compose down
```

### Local Development (Without Docker)

If you prefer to run the services locally for development:

#### Database
You'll need a PostgreSQL instance running. You can start just the database using Docker:
```bash
docker compose up postgres -d
```

#### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with the connection string (it should point to your local Postgres DB):
   ```env
   DATABASE_URL="postgresql://quarkus:quarkus@localhost:5432/urldb?schema=public"
   ```
4. Run Prisma migrations, generate the client, and start the development server:
   ```bash
   npx prisma migrate dev
   npm run start:dev
   ```

#### Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables (e.g. `.env` file) as needed for Vite:
   ```env
   VITE_SERVER_URL="http://localhost:3000"
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Project Structure

```text
espresso-url/
├── backend/            # NestJS API code, Prisma schema and migrations
├── frontend/           # React + Vite frontend application
├── docker-compose.yml  # Docker infrastructure setup
└── README.md           # Project documentation
```

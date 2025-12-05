# 🚀 Flash Sale Stock Reservation Project Setup Guide

This guide details the steps required to set up and run the backend (NestJS/Prisma) and frontend (React) components of the project locally, utilizing Docker Compose only for managing the infrastructure services (**PostgreSQL** and **Redis**).

## 📋 Prerequisites and Requirements

Before starting, ensure you have the following software installed on your machine:

1.  **Docker & Docker Compose:** Required to run the Redis cache and PostgreSQL database.
2.  **Node.js (Required: v20.19.0+):** **Crucially**, to ensure full compatibility with **Prisma 7** and its dependencies, you **must** use **Node.js version 20.19.0 or newer**.
3.  **Git:** Required to clone the repository.

---

## ⚙️ Environment Variables

Create a file named `.env` in your `backend` directory and populate it with the following connection details, which align with your `docker-compose.yml` file and preferred backend port.

```ini
# .env (to be placed in the backend directory)
DATABASE_URL="postgresql://postgres:postgres@localhost:5437/flash-sale?schema=public"

PORT=5000

REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## 🛠️ Setup Steps

Follow these steps in order to get the entire application running.

### 1\. Start Infrastructure Services (Redis & PostgreSQL)

Navigate to the root directory of your repository (where the `docker-compose.yml` file is located) and bring up the infrastructure containers in detached mode (`-d`).

```bash
docker compose up -d
```

| Service        | Host Port | Container Port | Purpose          |
| :------------- | :-------- | :------------- | :--------------- |
| **PostgreSQL** | `5437`    | `5432`         | Primary Database |
| **Redis**      | `6379`    | `6379`         | Caching/Worker   |

> **Note:** The backend on your host machine will connect to PostgreSQL using `localhost:5437`.

---

### 2\. Backend Setup (NestJS/Prisma)

Open a terminal and navigate into the `backend` directory.

```bash
cd backend
```

#### A. Install Dependencies

Install all required Node modules.

```bash
npm install
```

#### B. Migrate the Database

Use the `prisma migrate dev` command. This is the **primary development command** that compares your `schema.prisma` file against the database, creates the necessary tables, and applies any pending migrations.

```bash
npx prisma migrate dev
```

#### C. Generate Prisma Client

Although step B automatically generates the client, we explicitly run this to ensure the TypeScript client code is up-to-date and accessible by NestJS.

```bash
npx prisma generate
```

#### D. Seed the Database

Run the custom seeding script, which populates the newly created database tables with initial data.

```bash
npm run prisma:seed
```

#### E. Start the Backend Server

Start the NestJS backend in development mode with hot-reloading enabled. The server will run on **`http://localhost:5000`**.

```bash
npm run start:dev
```

---

### 3\. Frontend Setup (React)

Open a **new terminal window** and navigate into the `frontend` directory.

```bash
cd frontend
```

#### A. Install Dependencies

Install all required Node modules for the React application.

```bash
npm install
```

#### B. Start the Frontend Application

Start the React development server.

```bash
npm run dev
```

---

## 🌐 Application Access

Once both the backend and frontend terminals show successful compilation/startup messages:

- **Demo Video:** [Link](https://drive.google.com/file/d/1f2M3bc2TKfOPfAu9986lqxt_Flm-T4dZ/view?usp=sharing)
- **Backend API:** `http://localhost:5000`
- **Frontend UI:** `http://localhost:5173`

## 🛑 Stopping the Services

To stop the entire environment:

1.  **Stop Backend/Frontend:** Press `Ctrl + C` in both the backend and frontend terminal windows.
2.  **Stop Docker Containers:** Navigate back to the root directory and stop the infrastructure services.

<!-- end list -->

```bash
docker compose down
```

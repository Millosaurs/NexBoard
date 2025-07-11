# NexBoard Boilerplate Setup Guide

This guide will walk you through the steps to set up and run the NexBoard boilerplate on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 18 or higher. You can download it from [nodejs.org](https://nodejs.org/).
*   **Git**: For cloning the repository. Download from [git-scm.com](https://git-scm.com/).
*   **Bun**: A fast all-in-one JavaScript runtime. You can install it by following the instructions on [bun.sh](https://bun.sh/docs/installation).
*   **PostgreSQL Database**: NexBoard uses PostgreSQL with Drizzle ORM. We will use Supabase for this guide, which provides a hosted PostgreSQL database.

## Step-by-Step Setup

### 1. Clone the Repository

Open your terminal or command prompt and clone the NexBoard repository:

```bash
git clone https://github.com/Millosaurs/nexboard.git
cd nexboard
```

### 2. Install Dependencies

Navigate into the project directory and install the required dependencies using Bun:

```bash
bun install
```

### 3. Supabase Project Setup

NexBoard uses PostgreSQL for its database and integrates with Supabase for easy setup and management.

#### a. Create a New Supabase Project

1.  Go to [Supabase](https://supabase.com/) and sign in or create an account.
2.  Click on "New project" to create a new project.
3.  Fill in the project details (Name, Organization, Database Password, Region).
4.  Click "Create new project".

#### b. Get Database Connection String

1.  Once your project is created, navigate to "Project Settings" (gear icon) > "Database".
2.  Under "Connection string", copy the `URI` (or `Connection string` for direct connection).

### 4. Google OAuth Setup (for Better Auth)

Better Auth supports Google OAuth for social logins. You'll need to set up a Google Cloud project to get your credentials.

#### a. Create Google Cloud Project and OAuth Credentials

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project or select an existing one.
3.  Navigate to "APIs & Services" > "Credentials".
4.  Click "+ Create Credentials" and select "OAuth client ID".
5.  Choose "Web application" as the Application type.
6.  Add a name for your OAuth client (e.g., "NexBoard").
7.  Under "Authorized JavaScript origins", add `http://localhost:3000` (and your production domain when deployed).
8.  Under "Authorized redirect URIs", add `http://localhost:3000/api/auth/callback/google` (and your production domain's callback URL).
9.  Click "Create". You will be presented with your Client ID and Client Secret.

### 5. Set Up Environment Variables

Create a `.env` file in the root of your project. This file will store your database connection string and Google OAuth credentials.

```bash
touch .env
```

Add the following variables to your `.env` file, replacing the placeholders with your actual values:

```
DATABASE_URL="YOUR_SUPABASE_POSTGRES_CONNECTION_STRING"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
BETTER_AUTH_URL="YOUR_BETTER_AUTH_URL"
BETTER_AUTH_SECRET="YOUR_BETTER_AUTH_SECRET"
```

*   **`DATABASE_URL`**: The PostgreSQL connection string you obtained from Supabase.
*   **`GOOGLE_CLIENT_ID`**: Your Google OAuth Client ID.
*   **`GOOGLE_CLIENT_SECRET`**: Your Google OAuth Client Secret.
*   **`BETTER_AUTH_URL`**: The URL for your Better Auth instance (usually your application's base URL).
*   **`BETTER_AUTH_SECRET`**: A strong, random secret key used by Better Auth for session management and other cryptographic operations.

### 6. Database Migrations (Drizzle ORM)

NexBoard uses Drizzle ORM for database interactions. You'll need to run migrations to set up your database schema.

First, ensure your `DATABASE_URL` in `.env` is correctly configured and your Supabase PostgreSQL database is accessible. Then, run the Drizzle Kit migration command:

```bash
bunx drizzle-kit push:pg
```

This command will push your schema defined in `src/db/schema.ts` to your PostgreSQL database.

### 7. Run the Development Server

Once the dependencies are installed and the database is set up, you can start the development server:

```bash
bun run dev
```

Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the NexBoard dashboard.

### 8. Linting and Type Checking

To ensure code quality and catch type errors, you can run the linting and type-checking commands:

```bash
bun run lint
bun tsc --noEmit
```

### 9. Build for Production

To create an optimized production build of your application:

```bash
bun run build
```

This will generate the production-ready build in the `.next` directory.

### 10. Start Production Server

After building, you can start the production server:

```bash
bun run start
```

This will serve your optimized application.
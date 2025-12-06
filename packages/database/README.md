# Database Setup Guide

## 1. Installation (Docker)
We use Docker to run the database.
```bash
docker-compose up -d
```

## 2. Managing the Database (GUI Tools)
Since Drizzle Studio can be temperamental, we recommend using a dedicated SQL Client.

### Recommended Apps (macOS)
1.  **TablePlus** (Highly Recommended) - Fast, native, free tier is great.
2.  **Beekeeper Studio** - Open source, clean UI.
3.  **Postico 2** - Mac-native, very simple.

### Connection Details
Use these settings to connect your GUI tool:

| Setting | Value |
| :--- | :--- |
| **Host** | `localhost` |
| **Port** | `5432` |
| **User** | `postgres` |
| **Password** | `postgres` |
| **Database** | `rj_suite` |
| **SSL** | Disabled |

### Connection URL
```bash
postgresql://postgres:postgres@localhost:5432/rj_suite
```

## 3. Useful Commands
- **View Tables (CLI)**: `docker exec -it rj_suite_postgres psql -U postgres -d rj_suite -c "\dt"`
- **Run Migrations**: `pnpm db:migrate`
- **Seed Data**: `cat packages/database/SEED_DATA.sql | docker exec -i rj_suite_postgres psql -U postgres -d rj_suite`

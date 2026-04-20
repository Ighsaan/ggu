import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

function createDatabase(connectionString: string) {
  const client = postgres(connectionString, {
    prepare: false,
  });

  return drizzle(client, { schema });
}

type Database = ReturnType<typeof createDatabase>;

let database: Database | null = null;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb(): Database {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not configured. Add the pooled Supabase connection string before using the database.",
    );
  }

  if (!database) {
    database = createDatabase(connectionString);
  }

  return database;
}

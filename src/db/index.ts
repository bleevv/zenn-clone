import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// biome-ignore lint/performance/noNamespaceImport: <it's needed by better-auth>
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL as string, { prepare: false });

export const db = drizzle({
  client,
  schema,
});

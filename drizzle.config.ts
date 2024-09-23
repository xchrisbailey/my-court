import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});

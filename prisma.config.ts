import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_9CVhBu5TfObP@ep-plain-wind-ax6u8tag.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});
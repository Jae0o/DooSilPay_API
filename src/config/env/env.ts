import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8080),
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_SERVICE_ACCOUNT_JSON: z.string().min(1), // 한 줄 JSON
  FIREBASE_STORAGE_BUCKET: z.string().min(1), // 예: doopay-dev.appspot.com (Storage 업로드용)
  ALLOWED_ORIGINS: z
    .string()
    .optional()
    .transform((v) => (v ? v.split(',').map((s) => s.trim()) : [])),
  FIRESTORE_EMULATOR_HOST: z.string().optional(),
  FIREBASE_AUTH_EMULATOR_HOST: z.string().optional(),
  FIREBASE_STORAGE_EMULATOR_HOST: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ 환경변수 검증 실패:');
  for (const i of parsed.error.issues) console.error(`  • ${i.path.join('.')}: ${i.message}`);
  process.exit(1);
}
export const env = parsed.data;

import { z } from 'zod';

const environmentSchema = z.object({
  API_PORT: z.coerce.number().int().positive().default(3001),
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development'),
});

export function validateEnvironment(
  config: Record<string, unknown>,
): Record<string, unknown> {
  return environmentSchema.parse(config);
}

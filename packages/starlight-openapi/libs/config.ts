import { z } from 'astro/zod'

import { logError } from './logger'

// TODO(HiDeoo) baseUrl

export const SchemaConfigSchema = z.object({
  // TODO(HiDeoo)
  base: z.string().min(1),
  // TODO(HiDeoo)
  label: z.string().optional(),
  // TODO(HiDeoo)
  schema: z.string().min(1),
})

const configSchema = z.array(SchemaConfigSchema).min(1)

export function validateConfig(userConfig: unknown): StarlightOpenAPIConfig {
  const config = configSchema.safeParse(userConfig)

  if (!config.success) {
    const errors = config.error.flatten()

    logError('Invalid starlight-openapi configuration.')

    throw new Error(`
${errors.formErrors.map((formError) => ` - ${formError}`).join('\n')}
${Object.entries(errors.fieldErrors)
  .map(([fieldName, fieldErrors]) => ` - ${fieldName}: ${(fieldErrors ?? []).join(' - ')}`)
  .join('\n')}
  `)
  }

  return config.data
}

export type StarlightOpenAPIConfig = z.infer<typeof configSchema>

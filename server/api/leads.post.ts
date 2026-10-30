import { promises as fs } from 'node:fs'
import { join } from 'node:path'

function sanitizeField(val: unknown): string {
  return String(val ?? '')
    .replace(/[\r\n|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const name = sanitizeField(body?.name)
  const phone = sanitizeField(body?.phone)
  const email = sanitizeField(body?.email) || '-'
  const topic = sanitizeField(body?.topic) || 'Consultoria / Geral'
  const details = sanitizeField(body?.details) || '-'
  const source = sanitizeField(body?.source) || 'https://ivini.dev'

  if (!name || !phone) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Nome e WhatsApp são obrigatórios.'
    })
  }

  const now = new Date()
  const timestamp = now.toISOString().replace('T', ' ').slice(0, 19)
  const id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`

  const line = `${timestamp} | ID: ${id} | Nome: ${name} | WhatsApp: ${phone} | Email: ${email} | Interesse: ${topic} | Escopo: ${details} | Origem: ${source}\n`

  const storageDir = join(process.cwd(), 'storage')
  const filePath = join(storageDir, 'leads.txt')

  await fs.mkdir(storageDir, { recursive: true })
  await fs.appendFile(filePath, line, 'utf-8')

  return {
    success: true,
    lead: {
      id,
      created_at: timestamp,
      name,
      phone,
      email: email === '-' ? '' : email,
      topic,
      details,
      source,
      raw_line: line.trim()
    }
  }
})

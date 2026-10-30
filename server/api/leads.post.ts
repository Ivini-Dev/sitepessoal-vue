import { promises as fs } from 'node:fs'
import { resolve, dirname } from 'node:path'

function sanitizeField(val: unknown, maxLen = 500): string {
  return String(val ?? '')
    .replace(/[\r\n|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))

  const name = sanitizeField(body?.name, 120)
  const phone = sanitizeField(body?.phone, 40)
  const email = sanitizeField(body?.email, 140) || 'nao-informado'
  const topic = sanitizeField(body?.topic, 160) || 'Consultoria / Geral'
  const details = sanitizeField(body?.details, 1000) || '-'
  const source = sanitizeField(body?.source || 'https://ivini.dev', 120)

  if (!name || !phone) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Os campos Nome e WhatsApp são obrigatórios.'
    })
  }

  const now = new Date()
  const timestamp = now.toISOString().replace('T', ' ').slice(0, 19)
  const leadId = sanitizeField(body?.id, 60) || `lead_${Date.now()}`

  const line = `${timestamp} | ID: ${leadId} | Nome: ${name} | WhatsApp: ${phone} | Email: ${email} | Interesse: ${topic} | Escopo: ${details} | Origem: ${source}`

  const rootFilePath = resolve(process.cwd(), 'leads.txt')
  const storageFilePath = resolve(process.cwd(), 'storage', 'leads.txt')

  await fs.mkdir(dirname(storageFilePath), { recursive: true })
  await fs.appendFile(rootFilePath, `${line}\n`, 'utf-8')
  await fs.appendFile(storageFilePath, `${line}\n`, 'utf-8')

  // Sincroniza também com o backend do clientes.ivini.dev (local container 8004 e remoto)
  const forwardTargets = [
    'http://127.0.0.1:8004/api/leads',
    'https://clientes.ivini.dev/api/leads'
  ]

  await Promise.allSettled(
    forwardTargets.map((url) =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          id: leadId,
          name,
          phone,
          email,
          topic,
          details,
          source
        })
      })
    )
  )

  return {
    ok: true,
    id: leadId,
    line,
    file: 'leads.txt'
  }
})

import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'

function parseLeadLine(line: string) {
  const parts = line.split('|').map((p) => p.trim())
  const timestamp = parts[0] || ''
  const data: Record<string, string> = { timestamp, raw: line }

  for (const part of parts.slice(1)) {
    const colonIdx = part.indexOf(':')
    if (colonIdx > -1) {
      const key = part.slice(0, colonIdx).trim().toLowerCase()
      const val = part.slice(colonIdx + 1).trim()
      if (key === 'id') data.id = val
      else if (key === 'nome') data.name = val
      else if (key === 'whatsapp') data.phone = val
      else if (key === 'email') data.email = val
      else if (key === 'interesse') data.topic = val
      else if (key === 'escopo') data.details = val
      else if (key === 'origem') data.source = val
    }
  }

  return data
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const rootFilePath = resolve(process.cwd(), 'leads.txt')
  const storageFilePath = resolve(process.cwd(), 'storage', 'leads.txt')

  let rawContent = ''
  try {
    rawContent = await fs.readFile(rootFilePath, 'utf-8')
  } catch {
    try {
      rawContent = await fs.readFile(storageFilePath, 'utf-8')
    } catch {
      rawContent = ''
    }
  }

  if (query.format === 'txt') {
    setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    setResponseHeader(event, 'Content-Disposition', 'attachment; filename="leads.txt"')
    return rawContent
  }

  const lines = rawContent
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)

  const leads = lines.map(parseLeadLine).reverse()

  return {
    ok: true,
    count: leads.length,
    leads,
    raw_txt: rawContent
  }
})

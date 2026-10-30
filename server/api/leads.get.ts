import { promises as fs } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filePath = join(process.cwd(), 'storage', 'leads.txt')

  let content = ''
  try {
    content = await fs.readFile(filePath, 'utf-8')
  } catch (_) {
    content = ''
  }

  if (query.format === 'txt') {
    setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    setResponseHeader(event, 'Content-Disposition', 'attachment; filename="leads.txt"')
    return content
  }

  const lines = content
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  const leads = lines.reverse().map((line) => {
    const parts = line.split('|').map((p) => p.trim())
    const getVal = (prefix: string) => {
      const found = parts.find((p) => p.toLowerCase().startsWith(prefix.toLowerCase()))
      return found ? found.slice(prefix.length).trim() : ''
    }

    return {
      created_at: parts[0] || '',
      id: getVal('ID:'),
      name: getVal('Nome:'),
      phone: getVal('WhatsApp:'),
      email: getVal('Email:') === '-' ? '' : getVal('Email:'),
      topic: getVal('Interesse:'),
      details: getVal('Escopo:'),
      source: getVal('Origem:'),
      raw_line: line
    }
  })

  return {
    success: true,
    count: leads.length,
    leads,
    raw_txt: content
  }
})

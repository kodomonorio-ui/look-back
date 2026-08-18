import { ContentItem } from '~/models/.server/content-item'
import { GOOGLE_TRENDS_PAGE } from '~/services/.server/google-trends'

export async function loader({ request }) {
  let url = new URL(request.url)
  let cursor = decodeCursor(url.searchParams.get('cursor'))
  let items = await ContentItem.feed(cursor, 12)
  let last = items.at(-1)
  return Response.json({ items, next_cursor: items.length === 12 && last ? encodeCursor({ score: last.trend_score, id: last.id }) : null, source: { name: 'Google Trends', url: GOOGLE_TRENDS_PAGE, region: 'JP' } })
}

function encodeCursor(value: any) { return Buffer.from(JSON.stringify(value)).toString('base64url') }
function decodeCursor(value: string | null) { if (!value) return undefined; try { return JSON.parse(Buffer.from(value, 'base64url').toString()) } catch { return undefined } }

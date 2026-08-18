import { syncGoogleTrends } from '~/services/.server/google-trends'

export async function loader({ request }) {
  let auth = request.headers.get('authorization')
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 })
  try { return Response.json(await syncGoogleTrends()) } catch (error) { return Response.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 503 }) }
}

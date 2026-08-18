import { syncGoogleTrends } from '../app/services/.server/google-trends'

await syncGoogleTrends()
console.log('Google Trends sync completed')

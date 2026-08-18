import { desc } from 'drizzle-orm'
import { db } from '~/.server/db'
import { trend_sources } from '~/.server/db/schema'

export const TrendSource = {
  create(data: typeof trend_sources.$inferInsert) { return db.insert(trend_sources).values(data).returning().get() },
  latest() { return db.select().from(trend_sources).orderBy(desc(trend_sources.fetched_at)).limit(1).get() },
}

import { and, desc, eq, lt, or, sql } from 'drizzle-orm'
import { db } from '~/.server/db'
import { content_items } from '~/.server/db/schema'

export const ContentItem = {
  async upsert(data: typeof content_items.$inferInsert) {
    return db.insert(content_items).values(data).onConflictDoUpdate({ target: [content_items.source, content_items.name], set: { traffic: data.traffic, trend_score: data.trend_score, source_item_url: data.source_item_url, fetched_at: data.fetched_at, last_seen_at: data.last_seen_at, updated_at: data.updated_at, bag: data.bag } }).returning().get()
  },
  async feed(cursor?: FeedCursor, limit = 10) {
    let where = cursor ? and(eq(content_items.review_status, 'approved'), or(lt(content_items.trend_score, cursor.score), and(eq(content_items.trend_score, cursor.score), lt(content_items.id, cursor.id)))) : eq(content_items.review_status, 'approved')
    return db.select().from(content_items).where(where).orderBy(desc(content_items.trend_score), desc(content_items.id)).limit(limit).all()
  },
  pending() { return db.select().from(content_items).where(eq(content_items.review_status, 'pending')).orderBy(desc(content_items.trend_score)).all() },
  review(public_id: string, status: 'approved' | 'rejected', category?: string) { return db.update(content_items).set({ review_status: status, category, published_at: status === 'approved' ? new Date() : null, updated_at: new Date() }).where(eq(content_items.public_id, public_id)).returning().get() },
}

type FeedCursor = { score: number; id: number }

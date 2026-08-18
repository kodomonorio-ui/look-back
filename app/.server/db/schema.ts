import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const trend_sources = sqliteTable('trend_sources', {
  id: integer().primaryKey({ autoIncrement: true }),
  public_id: text().notNull().unique(),
  source: text().notNull(),
  region: text().notNull(),
  source_url: text().notNull(),
  status: text().notNull(),
  item_count: integer().notNull().default(0),
  error: text(),
  fetched_at: integer({ mode: 'timestamp' }).notNull(),
  bag: text({ mode: 'json' }).$type<TrendSourceBag>(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
}, (table) => [index('trend_sources_fetched_at_idx').on(table.fetched_at)])

export const content_items = sqliteTable('content_items', {
  id: integer().primaryKey({ autoIncrement: true }),
  public_id: text().notNull().unique(),
  name: text().notNull(),
  category: text(),
  review_status: text().notNull().default('pending'),
  source: text().notNull(),
  source_url: text().notNull(),
  source_item_url: text(),
  traffic: text(),
  trend_score: integer().notNull().default(0),
  fetched_at: integer({ mode: 'timestamp' }).notNull(),
  last_seen_at: integer({ mode: 'timestamp' }).notNull(),
  published_at: integer({ mode: 'timestamp' }),
  bag: text({ mode: 'json' }).$type<ContentItemBag>(),
  created_at: integer({ mode: 'timestamp' }).notNull(),
  updated_at: integer({ mode: 'timestamp' }).notNull(),
}, (table) => [
  uniqueIndex('content_items_source_name_unq').on(table.source, table.name),
  index('content_items_feed_idx').on(table.review_status, table.trend_score, table.id),
])

export type TrendSourceBag = { copyright?: string }
export type ContentItemBag = { description?: string; picture?: string; news_titles?: string[] }

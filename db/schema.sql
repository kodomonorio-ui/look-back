CREATE TABLE trend_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  region TEXT NOT NULL,
  source_url TEXT NOT NULL,
  status TEXT NOT NULL,
  item_count INTEGER NOT NULL DEFAULT 0,
  error TEXT,
  fetched_at INTEGER NOT NULL,
  bag TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX trend_sources_fetched_at_idx ON trend_sources (fetched_at);

CREATE TABLE content_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT,
  review_status TEXT NOT NULL DEFAULT 'pending',
  source TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_item_url TEXT,
  traffic TEXT,
  trend_score INTEGER NOT NULL DEFAULT 0,
  fetched_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  published_at INTEGER,
  bag TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE UNIQUE INDEX content_items_source_name_unq ON content_items (source, name);
CREATE INDEX content_items_feed_idx ON content_items (review_status, trend_score, id);

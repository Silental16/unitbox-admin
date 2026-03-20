-- Analytics daily aggregation table
-- Populated by daily cron from Amplitude Export API
CREATE TABLE IF NOT EXISTS analytics_daily (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  user_id TEXT,                    -- Amplitude user_id (e.g. "user_599")
  developer_code TEXT,             -- developerCode from event_properties
  session_duration INTEGER DEFAULT 0,  -- seconds (real active time, 60s gap rule)
  collection_count INTEGER DEFAULT 0,
  preview_views INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  country TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, user_id, developer_code)
);

-- Indexes for dashboard queries
CREATE INDEX IF NOT EXISTS idx_analytics_daily_date ON analytics_daily(date);
CREATE INDEX IF NOT EXISTS idx_analytics_daily_developer ON analytics_daily(developer_code);
CREATE INDEX IF NOT EXISTS idx_analytics_daily_user ON analytics_daily(user_id);

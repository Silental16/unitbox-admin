-- ============================================================
-- 002_catalog_projects.sql
-- Catalog Projects Tracker — tracks AI-filled projects for dev 61
-- ============================================================

-- 1. Main projects tracking table
CREATE TABLE catalog_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  catalog_id INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','filling','filled','syncing','error')),
  units_count INTEGER DEFAULT 0,
  unit_types_count INTEGER DEFAULT 0,
  developer_name TEXT,
  fill_date TIMESTAMPTZ,
  fill_iterations INTEGER DEFAULT 0,
  fill_corrections INTEGER DEFAULT 0,
  rules_added TEXT[] DEFAULT '{}',
  queue_score INTEGER,
  notes TEXT DEFAULT '',
  drive_folder_url TEXT,
  sheets_url TEXT,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_catalog_projects_status ON catalog_projects(status);
CREATE INDEX idx_catalog_projects_catalog_id ON catalog_projects(catalog_id);

-- 2. Materials linked to a project
CREATE TABLE project_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES catalog_projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'other'
    CHECK (type IN ('drive_folder','document','presentation','spreadsheet','pdf','image','website','other')),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_project_materials_project ON project_materials(project_id);

-- 3. Chess board sources (Google Sheets with parsing config)
CREATE TABLE project_chess_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES catalog_projects(id) ON DELETE CASCADE,
  sheets_url TEXT NOT NULL,
  sheet_name TEXT,
  column_mapping JSONB DEFAULT '{}',
  color_legend JSONB DEFAULT '{}',
  parsing_notes TEXT DEFAULT '',
  last_sync_at TIMESTAMPTZ,
  last_sync_diff JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_project_chess_sources_project ON project_chess_sources(project_id);

-- 4. Change log (fills, syncs, manual edits)
CREATE TABLE project_change_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES catalog_projects(id) ON DELETE CASCADE,
  source TEXT NOT NULL DEFAULT 'manual'
    CHECK (source IN ('ai_fill','sync','manual','cron')),
  action TEXT NOT NULL,
  summary TEXT NOT NULL,
  diff JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_project_change_log_project ON project_change_log(project_id);
CREATE INDEX idx_project_change_log_created ON project_change_log(created_at DESC);

-- RLS policies
ALTER TABLE catalog_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_chess_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_change_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage catalog_projects"
  ON catalog_projects FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage project_materials"
  ON project_materials FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage project_chess_sources"
  ON project_chess_sources FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage project_change_log"
  ON project_change_log FOR ALL
  USING (auth.role() = 'authenticated');

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER catalog_projects_updated_at
  BEFORE UPDATE ON catalog_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER project_chess_sources_updated_at
  BEFORE UPDATE ON project_chess_sources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

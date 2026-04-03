-- ============================================================
-- 003_fill_sessions_and_log.sql
-- Fill Sessions & Log — persistent AI fill audit trail
-- Tracks every decision, action, correction across sessions
-- ============================================================

-- 1. Fill sessions (one row per fill "run")
CREATE TABLE fill_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES catalog_projects(id) ON DELETE CASCADE,
  session_label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','paused','completed','failed')),
  current_phase TEXT DEFAULT 'phase_0'
    CHECK (current_phase IN ('phase_0','phase_1','phase_2','phase_3','phase_4','phase_5','retrospective')),
  phases_completed TEXT[] DEFAULT '{}',
  agent_type TEXT DEFAULT 'orchestrator'
    CHECK (agent_type IN ('orchestrator','project','units','financial','media','content')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fill_sessions_project ON fill_sessions(project_id);
CREATE INDEX idx_fill_sessions_status ON fill_sessions(status);

-- 2. Fill log entries (every action, decision, correction)
CREATE TABLE project_fill_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES catalog_projects(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES fill_sessions(id) ON DELETE CASCADE,
  phase TEXT NOT NULL
    CHECK (phase IN ('phase_0','phase_1','phase_2','phase_3','phase_4','phase_5','retrospective')),
  domain TEXT
    CHECK (domain IN ('orchestrator','project','units','financial','media','content')),
  action TEXT NOT NULL,
  decision TEXT,
  problem TEXT,
  correction TEXT,
  tool_used TEXT,
  rule_ref TEXT,
  severity TEXT NOT NULL DEFAULT 'info'
    CHECK (severity IN ('info','warning','error','correction')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fill_log_project ON project_fill_log(project_id);
CREATE INDEX idx_fill_log_session ON project_fill_log(session_id);
CREATE INDEX idx_fill_log_severity ON project_fill_log(severity);
CREATE INDEX idx_fill_log_created ON project_fill_log(created_at DESC);

-- 3. Add session tracking to catalog_projects
ALTER TABLE catalog_projects
  ADD COLUMN IF NOT EXISTS active_session_id UUID REFERENCES fill_sessions(id),
  ADD COLUMN IF NOT EXISTS last_session_id UUID REFERENCES fill_sessions(id);

-- 4. RLS policies
ALTER TABLE fill_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_fill_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage fill_sessions"
  ON fill_sessions FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage project_fill_log"
  ON project_fill_log FOR ALL
  USING (auth.role() = 'authenticated');

-- 5. Updated_at trigger (reuses function from 002)
CREATE TRIGGER fill_sessions_updated_at
  BEFORE UPDATE ON fill_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

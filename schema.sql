-- AIForEdu.ai D1 Database Schema
-- Run: wrangler d1 execute aiforedu-db --file=schema.sql

CREATE TABLE IF NOT EXISTS lead_captures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'unknown',
  resource TEXT,
  captured_at TEXT NOT NULL,
  UNIQUE(email, source)
);

CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  ip_hash TEXT,
  user_agent TEXT,
  referer TEXT,
  clicked_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  read_at TEXT
);

CREATE TABLE IF NOT EXISTS product_interest (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  action TEXT NOT NULL DEFAULT 'view',
  created_at TEXT NOT NULL
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON lead_captures(email);
CREATE INDEX IF NOT EXISTS idx_leads_source ON lead_captures(source);
CREATE INDEX IF NOT EXISTS idx_affiliate_slug ON affiliate_clicks(slug);
CREATE INDEX IF NOT EXISTS idx_affiliate_date ON affiliate_clicks(clicked_at);
CREATE INDEX IF NOT EXISTS idx_contact_date ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_product_slug ON product_interest(product_slug);

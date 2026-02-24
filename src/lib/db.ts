import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "grillcleaning.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initializeDb(db);
  }
  return db;
}

function initializeDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price_cents INTEGER NOT NULL,
      duration_minutes INTEGER NOT NULL,
      category TEXT NOT NULL DEFAULT 'standard',
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS technicians (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      service_area TEXT NOT NULL DEFAULT 'Cincinnati',
      is_active INTEGER NOT NULL DEFAULT 1,
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_address TEXT NOT NULL,
      customer_city TEXT NOT NULL DEFAULT 'Cincinnati',
      customer_state TEXT NOT NULL DEFAULT 'OH',
      customer_zip TEXT NOT NULL,
      service_id TEXT NOT NULL,
      technician_id TEXT,
      booking_date TEXT NOT NULL,
      booking_time TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      notes TEXT,
      total_cents INTEGER NOT NULL,
      payment_token TEXT UNIQUE,
      payment_status TEXT NOT NULL DEFAULT 'unpaid',
      reminder_sent INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (service_id) REFERENCES services(id),
      FOREIGN KEY (technician_id) REFERENCES technicians(id)
    );

    CREATE TABLE IF NOT EXISTS activity_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      details TEXT,
      ip_address TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS email_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipient TEXT NOT NULL,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      email_type TEXT NOT NULL,
      booking_id TEXT,
      status TEXT NOT NULL DEFAULT 'sent',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (booking_id) REFERENCES bookings(id)
    );
  `);

  // Add new columns to existing bookings table if missing
  try { db.exec(`ALTER TABLE bookings ADD COLUMN payment_token TEXT UNIQUE`); } catch { /* exists */ }
  try { db.exec(`ALTER TABLE bookings ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'unpaid'`); } catch { /* exists */ }
  try { db.exec(`ALTER TABLE bookings ADD COLUMN reminder_sent INTEGER NOT NULL DEFAULT 0`); } catch { /* exists */ }

  // Seed default services if none exist
  const count = db.prepare("SELECT COUNT(*) as count FROM services").get() as { count: number };
  if (count.count === 0) {
    const insert = db.prepare(
      "INSERT INTO services (id, name, description, price_cents, duration_minutes, category) VALUES (?, ?, ?, ?, ?, ?)"
    );

    const services = [
      [
        "svc_basic",
        "Basic Grill Cleaning",
        "Thorough cleaning of grill grates, burners, and exterior. Includes degreasing and sanitizing all cooking surfaces.",
        14900,
        60,
        "standard",
      ],
      [
        "svc_deep",
        "Deep Clean & Restoration",
        "Complete disassembly and deep cleaning of all components. Includes grate restoration, burner cleaning, grease trap service, and full exterior detail.",
        24900,
        120,
        "premium",
      ],
      [
        "svc_seasonal",
        "Seasonal Tune-Up",
        "Get your grill ready for the season with a full inspection, cleaning, and performance check. Includes ignition testing and gas line inspection.",
        19900,
        90,
        "standard",
      ],
      [
        "svc_commercial",
        "Commercial Grill Service",
        "Professional cleaning for restaurant and commercial grills. Includes deep degreasing, component inspection, and health code compliance check.",
        39900,
        180,
        "commercial",
      ],
    ];

    const insertMany = db.transaction((rows: (string | number)[][]) => {
      for (const row of rows) {
        insert.run(...row);
      }
    });

    insertMany(services);
  }
}

// Type definitions
export interface Service {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  duration_minutes: number;
  category: string;
  is_active: number;
  created_at: string;
}

export interface Technician {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_area: string;
  is_active: number;
  notes: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_zip: string;
  service_id: string;
  technician_id: string | null;
  booking_date: string;
  booking_time: string;
  status: string;
  notes: string | null;
  total_cents: number;
  payment_token: string | null;
  payment_status: string;
  reminder_sent: number;
  created_at: string;
}

export interface ActivityLog {
  id: number;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: string | null;
  ip_address: string | null;
  created_at: string;
}

export interface EmailLog {
  id: number;
  recipient: string;
  subject: string;
  body: string;
  email_type: string;
  booking_id: string | null;
  status: string;
  created_at: string;
}

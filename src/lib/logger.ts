import { getDb } from "./db";

export function logActivity(
  action: string,
  entityType: string,
  entityId?: string | null,
  details?: string | null,
  ipAddress?: string | null
) {
  const db = getDb();
  db.prepare(
    `INSERT INTO activity_log (action, entity_type, entity_id, details, ip_address)
     VALUES (?, ?, ?, ?, ?)`
  ).run(action, entityType, entityId || null, details || null, ipAddress || null);
}

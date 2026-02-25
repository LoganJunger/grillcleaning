import { dbRun } from "./db";

export async function logActivity(
  action: string,
  entityType: string,
  entityId?: string | null,
  details?: string | null,
  ipAddress?: string | null
) {
  await dbRun(
    `INSERT INTO activity_log (action, entity_type, entity_id, details, ip_address)
     VALUES (?, ?, ?, ?, ?)`,
    [action, entityType, entityId || null, details || null, ipAddress || null]
  );
}

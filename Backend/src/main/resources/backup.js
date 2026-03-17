# Full Backup der gamedb mit Authentifizierung
# --oplog: Schreibvorgänge während des Dumps erfassen (nur bei Replica Set)
# --gzip: Komprimierung
mongodump \
  --host localhost \
  --port 27017 \
  --username backup_user \
  --password BackupPass123! \
  --authenticationDatabase admin \
  --db gamedb \
  --oplog \
  --gzip \
  --out /backups/gamedb_$(date +%Y-%m-%d)



0 2 * * * mongodump \
  --host localhost --port 27017 \
  --username backup_user --password BackupPass123! \
  --authenticationDatabase admin \
  --db gamedb --oplog --gzip \
  --out /backups/gamedb_$(date +\%Y-\%m-\%d) \
&& find /backups -maxdepth 1 -name "gamedb_*" -mtime +7 -exec rm -rf {} \;


# Schritt 2: Wiederherstellen aus Backup
mongorestore \
  --host localhost \
  --port 27017 \
  --username backup_user \
  --password BackupPass123! \
  --authenticationDatabase admin \
  --db gamedb \
  --oplogReplay \
  --gzip \
  /backups/gamedb_2026-03-17/gamedb
use admin

// 1. Administrator — verwaltet Benutzer & Rollen
db.createUser({
    user: "admin_user",
    pwd: "AdminPass123!",
    roles: [
        { role: "userAdminAnyDatabase", db: "admin" },
        { role: "dbAdminAnyDatabase", db: "admin" }
    ]
})

// 2. App-Benutzer — liest und schreibt Daten
db.createUser({
    user: "app_user",
    pwd: "AppPass123!",
    roles: [
        { role: "readWrite", db: "gamedb" }
    ]
})

// 3. Read-only Benutzer — z.B. für Reporting
db.createUser({
    user: "readonly_user",
    pwd: "ReadPass123!",
    roles: [
        { role: "read", db: "gamedb" }
    ]
})

// 4. Moderator — nur Zugriff auf comments
db.createUser({
    user: "moderator_user",
    pwd: "ModPass123!",
    roles: [
        { role: "gameCommentsModerator", db: "gamedb" }
    ]
})

// 5. Backup-Benutzer — nur für mongodump
db.createUser({
    user: "backup_user",
    pwd: "BackupPass123!",
    roles: [
        { role: "backup", db: "admin" }
    ]
})


// Test App User

/*
docker exec -it mongo_primary mongosh \
  -u app_user -p AppPass123! \
  --authenticationDatabase admin */

use gamedb
db.games.insertOne({ title: "Zelda", genre: "Action" })


//Test readonly User

/* docker exec -it mongo_primary mongosh \
  -u readonly_user -p ReadPass123! \
  --authenticationDatabase admin */

use gamedb
db.games.insertOne({ title: "Zelda", genre: "Action" })
// → MongoServerError: not authorized on gamedb to execute
//   command { insert: "games" ... }

//Test Moderator

/*
docker exec -it mongo_primary mongosh \
  -u moderator_user -p ModPass123! \
  --authenticationDatabase admin
 */

use gamedb
db.comments.find()        // → Erfolgreich
db.games.find()           // → MongoServerError: not authorized

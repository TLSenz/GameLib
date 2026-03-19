mongosh -u admin_user -p AdminPass123! --authenticationDatabase steamDB

// Should work — list all databases
db.adminCommand({ listDatabases: 1 })

// Should work — create a user
use steamDB
db.createUser({ user: "test_temp", pwd: "Test123!", roles: [] })

// Cleanup
db.dropUser("test_temp")


mongosh -u app_user -p AppPass123! --authenticationDatabase steamDB


// Should work — insert a document
use steamDB
db.testCollection.insertOne({ test: "hello" })

// Should work — read it back
db.testCollection.findOne({ test: "hello" })

// Should work — delete it
db.testCollection.deleteOne({ test: "hello" })

// Should FAIL — no access to other DBs
    use admin
db.adminCommand({ listDatabases: 1 })

mongosh -u readonly_user -p ReadPass123! --authenticationDatabase steamDB

// Should work — read data
use steamDB
db.testCollection.findOne()

// Should FAIL — no write access
db.testCollection.insertOne({ test: "fail" })

mongosh -u moderator_user -p ModPass123! --authenticationDatabase steamDB

// Should work — access comments collection
use steamDB
db.comments.find()
db.comments.insertOne({ comment: "test", user: "mod" })

// Should FAIL — no access to other collections
db.games.find()

mongosh -u backup_user -p BackupPass123! --authenticationDatabase steamDB
// Should work — backup role allows this
use admin
db.adminCommand({ listDatabases: 1 })

# The real test — run an actual dump
mongodump -u backup_user -p BackupPass123! --authenticationDatabase admin --out /tmp/backup_test


// Should FAIL — backup role is read-only
use steamDB
db.testCollection.insertOne({ test: "fail" })
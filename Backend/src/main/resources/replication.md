keyfile generieren
mkdir -p mongo-replica/scripts
openssl rand -base64 756 > mongo-replica/scripts/keyfile
chmod 400 mongo-replica/scripts/keyfile



Command to start all
cd mongo-replica
docker compose up -d

# Status prüfen (nach ~30 Sekunden)
docker exec -it mongo_primary mongosh \
-u admin -p adminpassword \
--authenticationDatabase admin \
--eval "rs.status()"    


replikation demonstireren
docker exec -it mongo_primary mongosh \
-u admin -p adminpassword \
--authenticationDatabase admin

use gamedb
db.games.insertOne({
title: "The Legend of Zelda",
genre: "Action-Adventure",
year: 1986
})


docker exec -it mongo_secondary1 mongosh \
--port 27018 \
-u admin -p adminpassword \
--authenticationDatabase admin

// Secondaries erlauben erst nach diesem Befehl Reads
db.getMongo().setReadPref("secondary")
use gamedb
db.games.find()
// → Zeigt dasselbe Dokument wie auf dem Primary


docker exec -it mongo_secondary2 mongosh \
--port 27019 \
-u admin -p adminpassword \
--authenticationDatabase admin

db.getMongo().setReadPref("secondary")
use gamedb
db.games.find()
// → Gleiches Ergebnis — Replikation funktioniert ✓
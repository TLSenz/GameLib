// steamdb_seed.js
// Run with: mongosh --file steamdb_seed.js

use("steamDB");

db.games.drop();
db.achievements.drop();
db.comments.drop();

db.createCollection("games");
db.createCollection("achievements");
db.createCollection("comments");

// ─── GAMES ───────────────────────────────────────────────────────────
// Fields intentionally vary per document to showcase schema flexibility.
// Optional fields: shortDescription, storeSnapshot, lastUpdateAt,
//                  description, price (free games omit it)
db.games.insertMany([
  {
    steamAppId: NumberInt(730),
    title: "Counter-Strike 2",
    platforms: ["Windows", "Linux"],
    storeSnapshot: "https://cdn.steam.com/cs2_header.jpg",
    description:
      "Counter-Strike 2 is the largest technical leap forward in CS history.",
    shortDescription: "Competitive tactical FPS",
    genres: ["FPS", "Shooter", "Competitive"],
    developers: ["Valve"],
    rating: 8.5,
    releaseDate: new Date("2023-09-27"),
    lastUpdateAt: new Date("2026-03-01"),
  },
  {
    steamAppId: NumberInt(1245620),
    title: "Elden Ring",
    platforms: ["Windows"],
    description:
      "A new fantasy action RPG from FromSoftware and George R.R. Martin.",
    shortDescription: "Open-world action RPG",
    genres: ["RPG", "Action", "Open World"],
    price: 59.99,
    developers: ["FromSoftware Inc."],
    rating: 9.2,
    releaseDate: new Date("2022-02-25"),
    lastUpdateAt: new Date("2025-12-15"),
  },
  {
    steamAppId: NumberInt(892970),
    title: "Valheim",
    platforms: ["Windows", "Linux"],
    storeSnapshot: "https://cdn.steam.com/valheim_header.jpg",
    shortDescription: "Viking survival crafting",
    genres: ["Survival", "Open World", "Co-op"],
    price: 19.99,
    developers: ["Iron Gate AB"],
    rating: 8.8,
    releaseDate: new Date("2021-02-02"),
    lastUpdateAt: new Date("2026-02-10"),
  },
  {
    steamAppId: NumberInt(1091500),
    title: "Cyberpunk 2077",
    platforms: ["Windows", "PlayStation", "Xbox"],
    storeSnapshot: "https://cdn.steam.com/cyberpunk_header.jpg",
    description:
      "An open-world action-adventure story set in Night City.",
    genres: ["RPG", "Action", "Open World"],
    price: 59.99,
    developers: ["CD Projekt Red"],
    rating: 8.0,
    releaseDate: new Date("2020-12-10"),
  },
  {
    steamAppId: NumberInt(1174180),
    title: "Red Dead Redemption 2",
    platforms: ["Windows"],
    description:
      "An epic tale of honor and loyalty in the American frontier.",
    genres: ["Action", "Adventure"],
    price: 59.99,
    developers: ["Rockstar Games"],
    rating: 9.5,
    releaseDate: new Date("2019-11-05"),
  },
  {
    steamAppId: NumberInt(1551360),
    title: "Forza Horizon 5",
    platforms: ["Windows", "Xbox"],
    storeSnapshot: "https://cdn.steam.com/forza5_header.jpg",
    shortDescription: "Open world driving festival",
    genres: ["Racing", "Open World"],
    price: 59.99,
    developers: ["Playground Games"],
    releaseDate: new Date("2021-11-09"),
  },
  {
    steamAppId: NumberInt(1086940),
    title: "Baldur's Gate 3",
    platforms: ["Windows"],
    storeSnapshot: "https://cdn.steam.com/bg3_header.jpg",
    description:
      "A story-driven RPG where your choices shape the world.",
    genres: ["RPG", "Strategy"],
    price: 59.99,
    developers: ["Larian Studios"],
    rating: 9.8,
    releaseDate: new Date("2023-08-03"),
  },
  {
    steamAppId: NumberInt(271590),
    title: "Grand Theft Auto V",
    platforms: ["Windows"],
    genres: ["Action", "Open World"],
    price: 29.99,
    developers: ["Rockstar Games"],
    rating: 9.0,
    releaseDate: new Date("2015-04-14"),
  },
  {
    steamAppId: NumberInt(105600),
    title: "Terraria",
    platforms: ["Windows", "Linux", "Mac"],
    storeSnapshot: "https://cdn.steam.com/terraria_header.jpg",
    description:
      "Dig, fight, explore, build in this 2D adventure.",
    genres: ["Sandbox", "Adventure"],
    price: 9.99,
    developers: ["Re-Logic"],
    rating: 9.2,
    releaseDate: new Date("2011-05-16"),
  },
  {
    steamAppId: NumberInt(252490),
    title: "Rust",
    platforms: ["Windows", "Mac"],
    description:
      "The only aim in Rust is to survive. Play with friends or fly solo.",
    genres: ["Survival", "Multiplayer"],
    price: 39.99,
    developers: ["Facepunch Studios"],
    releaseDate: new Date("2018-02-08"),
  },
  {
    steamAppId: NumberInt(294100),
    title: "RimWorld",
    platforms: ["Windows", "Linux", "Mac"],
    description:
      "A story generator. A colony sim driven by an intelligent AI storyteller.",
    genres: ["Simulation", "Strategy"],
    price: 34.99,
    developers: ["Ludeon Studios"],
    rating: 9.3,
    releaseDate: new Date("2018-07-17"),
  },
  {
    steamAppId: NumberInt(552520),
    title: "Far Cry 5",
    platforms: ["Windows"],
    storeSnapshot: "https://cdn.steam.com/farcry5_header.jpg",
    shortDescription: "Open world shooter",
    genres: ["Action", "FPS", "Open World"],
    price: 59.99,
    developers: ["Ubisoft Montreal"],
    rating: 8.0,
    releaseDate: new Date("2018-03-27"),
  },
  {
    steamAppId: NumberInt(814380),
    title: "Sekiro",
    platforms: ["Windows"],
    genres: ["Action", "Souls-like"],
    price: 59.99,
    developers: ["FromSoftware Inc."],
    rating: 9.2,
    releaseDate: new Date("2019-03-22"),
  },
  {
    steamAppId: NumberInt(367520),
    title: "Hades",
    platforms: ["Windows", "Mac"],
    storeSnapshot: "https://cdn.steam.com/hades_header.jpg",
    description:
      "Defy the god of the dead as you hack and slash out of the Underworld.",
    genres: ["Action", "Roguelike"],
    price: 24.99,
    developers: ["Supergiant Games"],
    rating: 9.5,
    releaseDate: new Date("2020-09-17"),
  },
  {
    steamAppId: NumberInt(1158310),
    title: "Crusader Kings III",
    platforms: ["Windows", "Mac"],
    storeSnapshot: "https://cdn.steam.com/ck3_header.jpg",
    genres: ["Strategy", "RPG"],
    price: 49.99,
    developers: ["Paradox Development Studio"],
    rating: 9.1,
    releaseDate: new Date("2020-09-01"),
  },
  {
    steamAppId: NumberInt(752590),
    title: "A Plague Tale: Innocence",
    platforms: ["Windows"],
    description:
      "Follow young Amicia and her brother Hugo in a harsh medieval world.",
    genres: ["Action", "Adventure"],
    price: 39.99,
    developers: ["Asobo Studio"],
    releaseDate: new Date("2019-05-14"),
  },
  {
    steamAppId: NumberInt(548430),
    title: "Deep Rock Galactic",
    platforms: ["Windows"],
    storeSnapshot: "https://cdn.steam.com/drg_header.jpg",
    description:
      "4-player co-op mining action with procedurally generated caves.",
    genres: ["Co-op", "Action"],
    price: 29.99,
    developers: ["Ghost Ship Games"],
    rating: 9.0,
    releaseDate: new Date("2020-05-13"),
  },
  {
    steamAppId: NumberInt(1328670),
    title: "Mass Effect Legendary Edition",
    platforms: ["Windows"],
    storeSnapshot: "https://cdn.steam.com/masseffectle.jpg",
    genres: ["RPG", "Action"],
    price: 59.99,
    developers: ["BioWare"],
    rating: 9.2,
    releaseDate: new Date("2021-05-14"),
  },
  {
    steamAppId: NumberInt(1817070),
    title: "Hogwarts Legacy",
    platforms: ["Windows", "PlayStation", "Xbox"],
    description:
      "Experience the wizarding world in an open-world adventure.",
    genres: ["Action", "RPG", "Open World"],
    price: 59.99,
    developers: ["Avalanche Software"],
    rating: 8.5,
    releaseDate: new Date("2023-02-10"),
  },
  {
    steamAppId: NumberInt(1593500),
    title: "God of War Ragnarök",
    platforms: ["Windows"],
    storeSnapshot: "https://cdn.steam.com/gowr_header.jpg",
    description:
      "Kratos and Atreus embark on a mythic journey across Norse realms.",
    genres: ["Action", "Adventure"],
    price: 69.99,
    developers: ["Santa Monica Studio"],
    rating: 9.4,
    releaseDate: new Date("2022-11-09"),
  },
  {
    steamAppId: NumberInt(2778580),
    title: "Elden Ring: Shadow of the Erdtree",
    platforms: ["Windows"],
    genres: ["RPG", "Action", "Souls-like"],
    price: 39.99,
    developers: ["FromSoftware Inc."],
    rating: 9.0,
    releaseDate: new Date("2024-06-21"),
    isDLC: true,
    baseGameAppId: NumberInt(1245620),
  },
  {
    steamAppId: NumberInt(1888930),
    title: "Palworld",
    platforms: ["Windows"],
    storeSnapshot: "https://cdn.steam.com/palworld_header.jpg",
    description:
      "Open world survival game with monster collecting and crafting.",
    genres: ["Survival", "Open World", "Crafting"],
    price: 29.99,
    developers: ["Pocketpair"],
    releaseDate: new Date("2024-01-19"),
    earlyAccess: true,
  },
  {
    steamAppId: NumberInt(990080),
    title: "Helldivers 2",
    platforms: ["Windows", "PlayStation"],
    storeSnapshot: "https://cdn.steam.com/helldivers2_header.jpg",
    genres: ["Action", "Co-op", "Shooter"],
    price: 39.99,
    developers: ["Arrowhead Game Studios"],
    rating: 8.7,
    releaseDate: new Date("2024-02-08"),
  },
  {
    steamAppId: NumberInt(413150),
    title: "Stardew Valley",
    platforms: ["Windows", "Linux", "Mac", "iOS", "Android"],
    storeSnapshot: "https://cdn.steam.com/stardew_header.jpg",
    description:
      "You've inherited your grandfather's old farm plot in Stardew Valley.",
    genres: ["Simulation", "RPG"],
    price: 14.99,
    developers: ["ConcernedApe"],
    rating: 9.5,
    releaseDate: new Date("2016-02-26"),
    lastUpdateAt: new Date("2024-11-04"),
  },
  {
    steamAppId: NumberInt(1332010),
    title: "Lethal Company",
    platforms: ["Windows"],
    genres: ["Horror", "Co-op"],
    price: 9.99,
    developers: ["Zeekerss"],
    rating: 9.1,
    releaseDate: new Date("2023-10-23"),
    earlyAccess: true,
  },
]);

// ─── RESOLVE ObjectIds ───────────────────────────────────────────────
const ids = {};
db.games.find().forEach((g) => {
  ids[g.steamAppId] = g._id;
});
const id = (appId) => ids[appId];

// ─── ACHIEVEMENTS ────────────────────────────────────────────────────
// Some have descriptions, some have rarity, some are minimal
db.achievements.insertMany([
  { gameId: id(730), title: "First Blood", storeSnapshot: "https://cdn.steam.com/cs2_ach_firstblood.jpg", description: "Get the first kill in a match", rarity: 0.45 },
  { gameId: id(730), title: "Ace!", storeSnapshot: "https://cdn.steam.com/cs2_ach_ace.jpg", rarity: 0.02 },
  { gameId: id(730), title: "Headhunter", description: "Kill 500 enemies with headshots" },
  { gameId: id(730), title: "Guardian Angel" },
  { gameId: id(1245620), title: "Elden Lord", storeSnapshot: "https://cdn.steam.com/er_ach_eldenlord.jpg", description: "Achieve the Elden Lord ending", rarity: 0.12 },
  { gameId: id(1245620), title: "Shardbearer", storeSnapshot: "https://cdn.steam.com/er_ach_shardbearer.jpg" },
  { gameId: id(1245620), title: "Eternal Champion", description: "Defeat all remembrance bosses" },
  { gameId: id(892970), title: "Odin's Blessing", storeSnapshot: "https://cdn.steam.com/vh_ach_odin.jpg", rarity: 0.35 },
  { gameId: id(892970), title: "Explorer" },
  { gameId: id(892970), title: "Trader", description: "Complete 10 trades with Haldor" },
  { gameId: id(1091500), title: "The Rock", storeSnapshot: "https://cdn.steam.com/cyberpunk_ach_rock.jpg" },
  { gameId: id(1091500), title: "Night City Legend", description: "Reach max street cred", rarity: 0.08 },
  { gameId: id(1174180), title: "Legendary Cowboy", storeSnapshot: "https://cdn.steam.com/rdr2_ach_cowboy.jpg", description: "Complete the main story" },
  { gameId: id(1174180), title: "Horseman" },
  { gameId: id(1551360), title: "Drift King", rarity: 0.15 },
  { gameId: id(1086940), title: "Hero", storeSnapshot: "https://cdn.steam.com/bg3_ach_hero.jpg", description: "Save the Grove" },
  { gameId: id(1086940), title: "Descent into Avernus" },
  { gameId: id(271590), title: "American Dream", storeSnapshot: "https://cdn.steam.com/gta5_ach_dream.jpg" },
  { gameId: id(105600), title: "Master Explorer", description: "Explore every biome" },
  { gameId: id(252490), title: "Survivalist", storeSnapshot: "https://cdn.steam.com/rust_ach_survival.jpg", rarity: 0.22 },
  { gameId: id(294100), title: "Tribe Member" },
  { gameId: id(552520), title: "Hope County Deputy", storeSnapshot: "https://cdn.steam.com/farcry5_ach_deputy.jpg" },
  { gameId: id(814380), title: "Resurrection", description: "Resurrect for the first time", rarity: 0.85 },
  { gameId: id(367520), title: "Escape Artist", storeSnapshot: "https://cdn.steam.com/hades_ach_escape.jpg", description: "Escape the Underworld for the first time" },
  { gameId: id(1158310), title: "Crusader King" },
  { gameId: id(548430), title: "Morkite Mining", storeSnapshot: "https://cdn.steam.com/drg_ach_morkite.jpg", rarity: 0.55 },
  { gameId: id(1328670), title: "Spectre", description: "Become a Spectre" },
]);

// ─── COMMENTS ────────────────────────────────────────────────────────
// Some have genres, some have description, some are bare-minimum
db.comments.insertMany([
  { gameId: id(730), title: "Amazing update!", comment: "The new smoke grenades are game-changing.", created_at: new Date("2026-03-05T14:30:00Z"), description: "Review after 2000h of playtime", genres: ["FPS", "Shooter"], bewertung: 9.0 },
  { gameId: id(730), title: "Needs anti-cheat improvements", comment: "Too many cheaters in ranked matches lately.", created_at: new Date("2026-03-08T10:15:00Z"), bewertung: 5.5 },
  { gameId: id(730), title: "Best FPS ever", comment: "Still the king of tactical shooters after all these years.", created_at: new Date("2026-02-28T16:20:00Z"), genres: ["FPS", "Shooter", "Competitive"], bewertung: 9.5 },
  { gameId: id(1245620), title: "Masterpiece", comment: "Open world done right. Every corner has something to discover.", created_at: new Date("2026-02-20T18:00:00Z"), description: "First playthrough complete", bewertung: 9.5 },
  { gameId: id(1245620), title: "Hard but fair", comment: "Challenging but never frustrating. Perfect balance.", created_at: new Date("2026-01-10T12:00:00Z"), genres: ["RPG", "Action", "Souls-like"], bewertung: 9.8 },
  { gameId: id(892970), title: "Best with friends", comment: "Solo is okay but co-op with 3 friends is incredible.", created_at: new Date("2026-01-15T20:45:00Z"), bewertung: 8.0 },
  { gameId: id(892970), title: "Viking life", comment: "Building my longhouse was so satisfying.", created_at: new Date("2025-12-20T09:30:00Z"), description: "Builder review", genres: ["Survival", "Crafting"], bewertung: 8.5 },
  { gameId: id(1091500), title: "Worth the wait", comment: "After 2.0 update, this is finally the game we wanted.", created_at: new Date("2026-03-01T15:00:00Z"), description: "Post-patch review", bewertung: 8.5 },
  { gameId: id(1174180), title: "A work of art", comment: "The storytelling is unparalleled. Arthur Morgan is legendary.", created_at: new Date("2026-02-15T11:00:00Z"), bewertung: 10.0 },
  { gameId: id(1551360), title: "Beautiful driving", comment: "Mexico is the best horizon map yet!", created_at: new Date("2025-11-20T14:00:00Z"), description: "Car enthusiast", genres: ["Racing"], bewertung: 9.2 },
  { gameId: id(1086940), title: "Best RPG ever", comment: "No two playthroughs are the same. Incredible depth.", created_at: new Date("2026-02-05T18:30:00Z"), genres: ["RPG", "Strategy"], bewertung: 9.8 },
  { gameId: id(271590), title: "Still fun after years", comment: "The Online mode keeps it alive.", created_at: new Date("2026-01-25T10:00:00Z"), bewertung: 8.5 },
  { gameId: id(105600), title: "Endless content", comment: "There's always something new to build or explore.", created_at: new Date("2025-10-15T16:45:00Z"), description: "Creative builder", bewertung: 9.5 },
  { gameId: id(252490), title: "Brutal but addictive", comment: "The survival mechanics are intense.", created_at: new Date("2026-03-07T08:00:00Z"), bewertung: 7.5 },
  { gameId: id(294100), title: "Story generator", comment: "The AI storyteller creates hilarious situations.", created_at: new Date("2025-12-10T13:20:00Z"), genres: ["Simulation", "Strategy"], bewertung: 9.3 },
  { gameId: id(552520), title: "Great villain", comment: "Joseph Seed is one of the best antagonists ever.", created_at: new Date("2025-09-05T19:00:00Z"), description: "Story focused", bewertung: 8.2 },
  { gameId: id(814380), title: "Difficult but rewarding", comment: "Master the parry and feel like a shinobi.", created_at: new Date("2025-11-30T17:15:00Z"), genres: ["Action", "Souls-like"], bewertung: 9.4 },
  { gameId: id(367520), title: "Roguelike perfection", comment: "The narrative + gameplay loop is unmatched.", created_at: new Date("2026-01-05T20:00:00Z"), description: "Indie lover", bewertung: 9.7 },
  { gameId: id(1158310), title: "Endless replayability", comment: "I've played 500 hours and still discover new things.", created_at: new Date("2025-08-20T12:30:00Z"), bewertung: 9.1 },
  { gameId: id(548430), title: "Best co-op", comment: "Nothing beats mining with the boys.", created_at: new Date("2026-02-25T14:00:00Z"), genres: ["Co-op", "Action"], bewertung: 9.0 },
  { gameId: id(1328670), title: "Nostalgia hit", comment: "The legendary edition is the perfect way to revisit Shepard's story.", created_at: new Date("2025-07-10T10:30:00Z"), description: "ME fan", bewertung: 9.5 },
  { gameId: id(1817070), title: "Magical experience", comment: "Finally living out my wizard dreams!", created_at: new Date("2026-03-02T16:45:00Z"), bewertung: 8.8 },
  { gameId: id(1593500), title: "Father and son", comment: "Kratos and Atreus story is heartwarming.", created_at: new Date("2025-12-01T11:15:00Z"), description: "Story gamer", genres: ["Action", "Adventure"], bewertung: 9.6 },
  { gameId: id(1888930), title: "Pokemon with guns", comment: "Controversial but incredibly fun.", created_at: new Date("2026-01-20T09:00:00Z"), bewertung: 7.8 },
  { gameId: id(990080), title: "Super Earth!", comment: "Democracy in action. Love the difficulty.", created_at: new Date("2026-02-10T15:30:00Z"), genres: ["Action", "Co-op", "Shooter"], bewertung: 8.7 },
  { gameId: id(413150), title: "Relaxing farming", comment: "Perfect game to unwind after work.", created_at: new Date("2025-06-25T21:00:00Z"), description: "Casual player", bewertung: 9.5 },
  { gameId: id(1332010), title: "Scary fun", comment: "The quota system adds great tension.", created_at: new Date("2026-03-06T19:45:00Z"), bewertung: 9.2 },
]);

// ─── VERIFICATION ────────────────────────────────────────────────────
print("\n=== Verification ===");
print("Games:        " + db.games.countDocuments());
print("Achievements: " + db.achievements.countDocuments());
print("Comments:     " + db.comments.countDocuments());

// Show schema variation in games
print("\n=== Schema variation demo ===");
print("Games WITH storeSnapshot:    " +
  db.games.countDocuments({ storeSnapshot: { $exists: true } }));
print("Games WITHOUT storeSnapshot: " +
  db.games.countDocuments({ storeSnapshot: { $exists: false } }));
print("Games WITH description:      " +
  db.games.countDocuments({ description: { $exists: true } }));
print("Games WITHOUT description:   " +
  db.games.countDocuments({ description: { $exists: false } }));
print("Games WITH earlyAccess:      " +
  db.games.countDocuments({ earlyAccess: { $exists: true } }));
print("Games WITH isDLC:            " +
  db.games.countDocuments({ isDLC: { $exists: true } }));

print("\n=== CS2 Aggregation ===");
printjson(
  db.games
    .aggregate([
      { $match: { steamAppId: NumberInt(730) } },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "gameId",
          as: "gameComments",
        },
      },
      {
        $lookup: {
          from: "achievements",
          localField: "_id",
          foreignField: "gameId",
          as: "gameAchievements",
        },
      },
    ])
    .toArray()
);

print("\n✅ Seed complete!");
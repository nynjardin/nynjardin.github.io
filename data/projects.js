/*
 * Project data for the tracker. This is the ONLY file to edit to update the site.
 *
 * Text fields are bilingual: { fr: "...", en: "..." }.
 * Dates are "YYYY-MM-DD".
 * kind:   "port" (native port / recompilation), "server" (replacement server / online revival),
 *         "reimpl" (clean-room reimplementation), "tool", "upcoming".
 * status: "release" (something public to download), "active", "planned".
 * stages[].state: "done", "partial", "todo".
 * milestones[].type: optional "release" (shown as a diamond) or "upstream" (contribution merged upstream).
 * milestones[].tag: optional release tag ("v1.0" = the project's first repo, or "owner/repo@v1.0"). On the
 *   project page, releases fetched live from the owner's repos are added to the history unless a milestone has their tag.
 */
window.TRACKER = {
  owner: "nynjardin",
  updated: "2026-11-25",

  projects: [
    // ------------------------------------------------------------------ Burnout 3
    {
      id: "burnout3",
      title: "Burnout 3: Takedown",
      subtitle: { fr: "Portage PC natif — édition LAN", en: "Native PC port — LAN edition" },
      platform: "PS2 → PC",
      year: 2004,
      kind: "port",
      status: "release",
      started: "2026-10-13",
      lastActivity: "2026-11-19",
      summary: {
        fr: "Le portage PC natif de Burnout 3 (recompilation du programme PS2 en C++) retrouve son mode en ligne, en réseau local : créer un salon, en rejoindre un, régler la course et la lancer, sans aucun serveur tiers. Le salon est servi par le jeu lui-même. S'y ajoute un lanceur portable.",
        en: "The native PC port of Burnout 3 (the PS2 program recompiled to C++) gets its online mode back, over a local network: create a lobby, join one, set up the race and start it, with no third-party server. The lobby is served by the game itself. A portable launcher comes with it."
      },
      repos: [
        { repo: "nynjardin/burnout3-pc", label: { fr: "Édition LAN (téléchargements)", en: "LAN edition (downloads)" } },
        { repo: "nynjardin/burnout3-launcher", label: { fr: "Lanceur", en: "Launcher" } },
        { repo: "nynjardin/ps2-port-engine", label: { fr: "Moteur (fork)", en: "Engine (fork)" } }
      ],
      upstream: [
        { label: "danielgomesvieira2000/burnout3-pc", url: "https://github.com/danielgomesvieira2000/burnout3-pc", note: { fr: "le portage PC d'origine", en: "the original PC port" } },
        { label: "danielgomesvieira2000/ps2-port-engine", url: "https://github.com/danielgomesvieira2000/ps2-port-engine", note: { fr: "la chaîne de portage PS2", en: "the PS2 porting toolchain" } }
      ],
      contributions: [
        { label: "burnout3-pc #30", url: "https://github.com/danielgomesvieira2000/burnout3-pc/pull/30", state: "merged", title: { fr: "LAN : les réglages de l'hôte pour tous ; HEAVYWEIGHTS et EXTRA SERIES en ligne", en: "LAN: the host's gameplay settings for every player; HEAVYWEIGHTS and EXTRA SERIES online" } },
        { label: "ps2-port-engine #7", url: "https://github.com/danielgomesvieira2000/ps2-port-engine/pull/7", state: "merged", title: { fr: "Réglages de session (SessionSetting / ClearSessionSettings)", en: "Settings for a session: SessionSetting / ClearSessionSettings" } },
        { label: "ps2-port-engine #1", url: "https://github.com/danielgomesvieira2000/ps2-port-engine/pull/1", state: "open", title: { fr: "Jeu en LAN (inet sur Winsock, correctifs IOP) et travail de performances", en: "LAN play support (inet on Winsock, IOP fixes) and performance work" } }
      ],
      stages: [
        { label: { fr: "Pile réseau du jeu réveillée (DirtySock, DNAS contourné)", en: "The game's network stack awake (DirtySock, DNAS bypassed)" }, state: "done" },
        { label: { fr: "Course en LAN à deux instances", en: "LAN race between two instances" }, state: "done" },
        { label: { fr: "Salon servi par le jeu, découverte automatique", en: "Lobby served by the game, automatic discovery" }, state: "done" },
        { label: { fr: "Essai entre plusieurs PC", en: "Tried across several PCs" }, state: "done" },
        { label: { fr: "Release publique « LAN edition »", en: "Public \"LAN edition\" release" }, state: "done" },
        { label: { fr: "Édition 0.9.0-lan.1 (amont 0.9.0 fusionné)", en: "0.9.0-lan.1 edition (upstream 0.9.0 merged)" }, state: "partial" }
      ],
      works: [
        { fr: "MULTIPLAYER → LAN : créer, rejoindre, régler et lancer une course, résultats, revanche", en: "MULTIPLAYER → LAN: create, join, set up and start a race, results, rematch" },
        { fr: "Les réglages de l'hôte (trafic, CRASH BREAKER, miroir) appliqués à tous", en: "The host's settings (traffic, CRASH BREAKER, mirror) applied to everyone" },
        { fr: "Colonne PING dans la salle d'attente, liaisons retentées", en: "PING column in the waiting room, links retried" },
        { fr: "60 images/s en course, rattrapage sur les PC plus lents", en: "60 frames a second in races, catch-up on slower PCs" }
      ],
      next: [
        { fr: "Construire et publier la release 0.9.0-lan.1", en: "Build and publish the 0.9.0-lan.1 release" },
        { fr: "Vérifier à deux le retour au salon après une course", en: "Check the return to the lobby after a race with two players" },
        { fr: "ELIMINATOR en ligne (expérimental, encore désactivé)", en: "ELIMINATOR online (experimental, still disabled)" }
      ],
      milestones: [
        { date: "2026-10-13", text: { fr: "Ouverture du projet : image NTSC-U, analyse de la pile réseau PS2", en: "Project opened: NTSC-U image, analysis of the PS2 network stack" } },
        { date: "2026-10-14", text: { fr: "Première course complète à deux en LAN, lobby EA servi en local", en: "First complete two-player LAN race, EA lobby served locally" } },
        { date: "2026-10-16", type: "upstream", text: { fr: "Proposition de la prise en charge du LAN au moteur amont", en: "LAN support proposed to the upstream engine" } },
        { date: "2026-10-22", text: { fr: "Amont 0.6.1 fusionné : 60 images/s pleines en course", en: "Upstream 0.6.1 merged: full 60 frames a second in races" } },
        { date: "2026-10-29", text: { fr: "Réglages de l'hôte pour tous, voitures EXTRA en ligne ; essai à trois PC", en: "Host settings for everyone, EXTRA cars online; three-PC test" } },
        { date: "2026-11-12", text: { fr: "Amont 0.8.0 fusionné (Direct3D 11, Linux, Android)", en: "Upstream 0.8.0 merged (Direct3D 11, Linux, Android)" } },
        { date: "2026-11-13", type: "release", tag: "v0.8.0-lan.1", text: { fr: "Release « LAN edition » 0.8.0-lan.1", en: "\"LAN edition\" 0.8.0-lan.1 release" } },
        { date: "2026-11-13", type: "release", tag: "nynjardin/burnout3-launcher@v0.2.0", text: { fr: "Lanceur portable v0.2.0", en: "Portable launcher v0.2.0" } },
        { date: "2026-11-15", type: "upstream", text: { fr: "Deux contributions fusionnées dans le portage et le moteur amont", en: "Two contributions merged into the upstream port and engine" } },
        { date: "2026-11-19", text: { fr: "Amont 0.9.0-alpha fusionné (rendu natif, MSAA) ; 0.9.0-lan.1 en préparation", en: "Upstream 0.9.0-alpha merged (native renderer, MSAA); 0.9.0-lan.1 in preparation" } }
      ]
    },

    // ------------------------------------------------------------------ Burnout Paradise
    {
      id: "burnout-paradise",
      title: "Burnout Paradise",
      subtitle: { fr: "The Ultimate Box — serveur LAN privé", en: "The Ultimate Box — private LAN server" },
      platform: "PC",
      year: 2009,
      kind: "server",
      status: "active",
      started: "2026-10-14",
      lastActivity: "2026-10-28",
      summary: {
        fr: "Rejouer en ligne à Burnout Paradise (PC, version Steam), en réseau local, grâce à un serveur privé qui imite le service « Aries / DirtySock » d'EA de 2008. Le travail part d'un projet communautaire, qu'il complète : correctif d'un plantage, adresse du serveur écrite dans le jeu, lanceurs en double-clic.",
        en: "Play Burnout Paradise (PC, Steam build) online again, over a local network, with a private server that imitates EA's 2008 \"Aries / DirtySock\" service. The work starts from a community project and adds to it: a crash fix, the server address written into the game, double-click launchers."
      },
      repos: [],
      upstream: [
        { label: "PeyPeyup/Burnout-Paradise-UB-LAN", url: "https://github.com/PeyPeyup/Burnout-Paradise-UB-LAN", note: { fr: "le serveur LAN communautaire", en: "the community LAN server" } },
        { label: "teknogods/eaEmu", url: "https://github.com/teknogods/eaEmu", note: { fr: "référence du protocole", en: "protocol reference" } }
      ],
      stages: [
        { label: { fr: "Connexion du jeu au serveur, compte, lobby", en: "The game logs in to the server: account, lobby" }, state: "done" },
        { label: { fr: "Freeburn hébergé", en: "Freeburn hosted" }, state: "done" },
        { label: { fr: "Parties à 2 puis 4 PC", en: "Games with 2, then 4 PCs" }, state: "done" },
        { label: { fr: "Fin de course (écran des scores)", en: "End of race (score screen)" }, state: "partial" },
        { label: { fr: "Classements", en: "Leaderboards" }, state: "todo" },
        { label: { fr: "Paquet à partager", en: "Package to share" }, state: "todo" }
      ],
      works: [
        { fr: "Connexion, création de compte, connexion automatique, jeu en français", en: "Login, account creation, automatic login, game in French" },
        { fr: "Héberger et rejoindre un Freeburn, jusqu'à 4 PC essayés", en: "Host and join a Freeburn, up to 4 PCs tried" },
        { fr: "Correctif du plantage d'origine au démarrage avec une webcam", en: "Fix for the game's own crash at start-up with a webcam" },
        { fr: "Adresse du serveur écrite dans le jeu : ni fichier hosts ni DNS", en: "Server address written into the game: no hosts file, no DNS" }
      ],
      next: [
        { fr: "Débloquer l'écran des scores en fin de course (deux variantes de réponse à essayer)", en: "Unblock the end-of-race score screen (two reply variants left to try)" },
        { fr: "L'écran des classements", en: "The leaderboards screen" },
        { fr: "Passer les vidéos d'intro", en: "Skip the intro videos" }
      ],
      milestones: [
        { date: "2026-10-14", text: { fr: "Le jeu se connecte au serveur local et héberge un Freeburn ; plantage webcam corrigé", en: "The game logs in to the local server and hosts a Freeburn; webcam crash fixed" } },
        { date: "2026-10-15", text: { fr: "Copie du jeu refaite sans SteamStub", en: "Game copy rebuilt without SteamStub" } },
        { date: "2026-10-22", text: { fr: "Freeburn entre 2 puis 4 PC ; adresse du serveur écrite dans l'exe", en: "Freeburn across 2, then 4 PCs; server address written into the exe" } },
        { date: "2026-10-28", text: { fr: "Cause du blocage de l'écran des scores trouvée dans l'exe", en: "Cause of the stuck score screen found in the exe" } }
      ]
    },

    // ------------------------------------------------------------------ Evil Dead
    {
      id: "evil-dead",
      title: "Evil Dead: The Game",
      subtitle: { fr: "kraken-emu — le backend du jeu, émulé", en: "kraken-emu — the game's backend, emulated" },
      platform: "PC",
      year: 2022,
      kind: "server",
      status: "active",
      started: "2026-10-20",
      lastActivity: "2026-11-14",
      summary: {
        fr: "Le jeu a été retiré de la vente et ses serveurs ne répondent plus. kraken-emu réimplémente « Kraken », le backend gRPC de Saber : le jeu y est redirigé sans patch ni droits administrateur. Les données qu'il attend (personnages, tenues, compétences, niveaux) sont reconstruites à partir des fichiers du jeu.",
        en: "The game was delisted and its servers no longer answer. kraken-emu reimplements \"Kraken\", Saber's gRPC backend: the game is redirected to it with no patch and no administrator rights. The data it expects (characters, outfits, skills, levels) is rebuilt from the game's own files."
      },
      repos: [],
      upstream: [],
      stages: [
        { label: { fr: "Passer l'écran « accès Internet nécessaire »", en: "Get past the \"Internet access required\" screen" }, state: "done" },
        { label: { fr: "Menu principal, roster complet, didacticiel", en: "Main menu, full roster, tutorial" }, state: "done" },
        { label: { fr: "Partie LAN à 2 sur un PC (survivants contre l'IA)", en: "Two-player LAN match on one PC (survivors vs AI)" }, state: "done" },
        { label: { fr: "Progression : XP, niveaux, compétences", en: "Progression: XP, levels, skills" }, state: "partial" },
        { label: { fr: "Partie entre deux PC", en: "Match across two PCs" }, state: "todo" },
        { label: { fr: "Joueur contre joueur (démon)", en: "Player vs player (demon)" }, state: "todo" }
      ],
      works: [
        { fr: "Les 117 appels du backend reçoivent une réponse (396 définitions protobuf extraites de l'exe)", en: "All 117 backend calls are answered (396 protobuf definitions extracted from the exe)" },
        { fr: "Groupe, recherche et confirmation de match, hôte désigné", en: "Party, match search and confirmation, host chosen" },
        { fr: "Fin de match : classement des deux côtés, retour au menu", en: "End of match: results on both sides, back to the menu" },
        { fr: "XP et niveaux persistants, compétences réellement actives", en: "Persistent XP and levels, skills actually active" }
      ],
      next: [
        { fr: "Premier essai sur deux PC", en: "First try on two PCs" },
        { fr: "Compétences uniques (système de quêtes à émuler)", en: "Unique skills (quest system to emulate)" },
        { fr: "Mode joueur contre joueur", en: "Player vs player mode" }
      ],
      milestones: [
        { date: "2026-10-20", text: { fr: "« Accès Internet nécessaire » levé : arguments du lanceur Epic et émulateur EOS", en: "\"Internet access required\" lifted: Epic launcher arguments and EOS emulator" } },
        { date: "2026-10-21", text: { fr: "Jouable en solo grâce au backend Kraken émulé", en: "Playable solo thanks to the emulated Kraken backend" } },
        { date: "2026-10-23", text: { fr: "Lobby, choix des personnages, voyage vers l'arène", en: "Lobby, character select, travel to the arena" } },
        { date: "2026-11-03", text: { fr: "Partie LAN à deux stable sur un PC", en: "Stable two-player LAN match on one PC" } },
        { date: "2026-11-14", text: { fr: "Fin de match, XP et niveaux persistants, compétences, choix de la carte", en: "End of match, persistent XP and levels, skills, map choice" } }
      ]
    },

    // ------------------------------------------------------------------ MotorStorm
    {
      id: "motorstorm",
      title: "MotorStorm: Apocalypse",
      subtitle: { fr: "Recompilation statique PS3 → PC", en: "PS3 → PC static recompilation" },
      platform: "PS3 → PC",
      year: 2011,
      kind: "port",
      status: "active",
      started: "2026-11-19",
      lastActivity: "2026-11-25",
      summary: {
        fr: "Un portage PC natif de MotorStorm: Apocalypse, par recompilation statique du code PowerPC et SPU de la PS3 en C++ (avec ps3recomp). Les courses tournent avec un rendu correct, et le mode LAN caché dans le jeu a été réveillé : on joue en réseau sans aucun serveur. Pacific Rift est aussi recompilé, sans portage pour l'instant.",
        en: "A native PC port of MotorStorm: Apocalypse, by static recompilation of the PS3's PowerPC and SPU code to C++ (with ps3recomp). Races run with correct rendering, and the LAN mode hidden in the game has been woken up: network play needs no server at all. Pacific Rift is lifted too, with no port yet."
      },
      repos: [],
      upstream: [
        { label: "sp00nznet/ps3recomp", url: "https://github.com/sp00nznet/ps3recomp", note: { fr: "la chaîne de recompilation PS3", en: "the PS3 recompilation toolchain" } }
      ],
      stages: [
        { label: { fr: "Code PPU et SPU recompilé, le jeu démarre", en: "PPU and SPU code recompiled, the game boots" }, state: "done" },
        { label: { fr: "Courses complètes, rendu correct", en: "Complete races, correct rendering" }, state: "done" },
        { label: { fr: "30 images/s tenues, vrai Full HD", en: "30 frames a second held, true Full HD" }, state: "done" },
        { label: { fr: "LAN sans serveur, 2 et 3 joueurs sur un PC", en: "Serverless LAN, 2 and 3 players on one PC" }, state: "done" },
        { label: { fr: "LAN entre deux PC", en: "LAN across two PCs" }, state: "todo" },
        { label: { fr: "Release publique", en: "Public release" }, state: "todo" }
      ],
      works: [
        { fr: "Menus et courses complètes sur deux circuits, son réglé", en: "Menus and complete races on two tracks, sound fixed" },
        { fr: "Résolution libre (1080p, 1440p), lanceur, jeu autonome dans son dossier", en: "Free resolution (1080p, 1440p), launcher, game self-contained in its folder" },
        { fr: "Salon, « Trouver une partie », courses d'affilée, circuit et mode choisis par l'hôte", en: "Lobby, \"Find a game\", back-to-back races, track and mode picked by the host" },
        { fr: "Progression en ligne (jetons, rang) gardée en local", en: "Online progression (chips, rank) kept locally" }
      ],
      next: [
        { fr: "Essai sur un deuxième PC, conduite réelle à deux", en: "Try on a second PC, real two-player driving" },
        { fr: "4 joueurs et plus", en: "4 players and more" },
        { fr: "Les carrés sombres autour des véhicules", en: "The dark squares around vehicles" }
      ],
      milestones: [
        { date: "2026-11-19", text: { fr: "59 670 fonctions PPU et 21 images SPU recompilées, premier démarrage", en: "59,670 PPU functions and 21 SPU images recompiled, first boot" } },
        { date: "2026-11-20", text: { fr: "Tous les jobs SPU recompilés : première course (~5 images/s)", en: "All SPU jobs recompiled: first race (~5 frames a second)" } },
        { date: "2026-11-22", text: { fr: "Lumière corrigée, 17 → 24 images/s en roulant", en: "Lighting fixed, 17 → 24 frames a second while driving" } },
        { date: "2026-11-23", text: { fr: "Son réglé, scintillements corrigés, compilation guidée par profil", en: "Sound fixed, flicker fixed, profile-guided build" } },
        { date: "2026-11-24", text: { fr: "30 images/s tenues, vrai Full HD, lanceur ; mode LAN du jeu réveillé : course à deux puis à trois", en: "30 frames a second held, true Full HD, launcher; the game's LAN mode woken up: two-, then three-player race" } },
        { date: "2026-11-25", text: { fr: "« Trouver une partie », courses d'affilée, progression en ligne sauvegardée", en: "\"Find a game\", back-to-back races, online progression saved" } }
      ]
    },

    // ------------------------------------------------------------------ NFS Hot Pursuit
    {
      id: "nfs-hot-pursuit",
      title: "Need for Speed: Hot Pursuit",
      subtitle: { fr: "(2010) — serveur Blaze local", en: "(2010) — local Blaze server" },
      platform: "PC",
      year: 2010,
      kind: "server",
      status: "active",
      started: "2026-10-14",
      lastActivity: "2026-10-22",
      summary: {
        fr: "Jouer à Hot Pursuit (2010, PC) en réseau local, sans serveur d'EA ni service tiers, grâce à une émulation locale du backend Blaze d'EA. Le travail part du serveur communautaire hp-server et utilise le code en ligne du jeu lui-même.",
        en: "Play Hot Pursuit (2010, PC) over a local network, with no EA server and no third-party service, through a local emulation of EA's Blaze backend. The work starts from the community hp-server and uses the game's own online code."
      },
      repos: [],
      upstream: [
        { label: "mxmstr/hp-server", url: "https://github.com/mxmstr/hp-server", note: { fr: "le serveur Blaze communautaire (Go)", en: "the community Blaze server (Go)" } }
      ],
      stages: [
        { label: { fr: "Serveur construit, tests verts", en: "Server built, tests green" }, state: "done" },
        { label: { fr: "Connexion du jeu : login, pseudo, Autolog", en: "The game logs in: login, name, Autolog" }, state: "done" },
        { label: { fr: "Course entre deux PC", en: "Race across two PCs" }, state: "done" },
        { label: { fr: "À trois joueurs", en: "Three players" }, state: "partial" },
        { label: { fr: "Amis et menus Autolog complets", en: "Friends and complete Autolog menus" }, state: "todo" },
        { label: { fr: "Paquet à partager", en: "Package to share" }, state: "todo" }
      ],
      works: [
        { fr: "Login, pseudo par l'écran EA, création et recherche de partie, course", en: "Login, name through the EA screen, create and find a game, race" },
        { fr: "Exe patché avec l'adresse du serveur : plus besoin d'Interposer", en: "Exe patched with the server address: no Interposer needed" },
        { fr: "Lancer le serveur et patcher le jeu en double-clic", en: "Start the server and patch the game with a double-click" }
      ],
      next: [
        { fr: "Retester à trois (un joueur restait invisible : garde-fou ajouté au serveur)", en: "Test again with three (one player stayed invisible: server safeguard added)" },
        { fr: "La liste d'amis, vide des deux côtés", en: "The friends list, empty on both sides" },
        { fr: "Les icônes du menu Autolog", en: "The Autolog menu icons" }
      ],
      milestones: [
        { date: "2026-10-14", text: { fr: "Ouverture : serveur construit, 57 tests verts, redirection par Interposer", en: "Opened: server built, 57 tests green, redirection through Interposer" } },
        { date: "2026-10-15", text: { fr: "Course en ligne entre deux PC réussie", en: "Online race across two PCs works" } },
        { date: "2026-10-22", text: { fr: "Exe patché avec l'adresse du serveur, scripts en double-clic, garde-fou à trois joueurs", en: "Exe patched with the server address, double-click scripts, three-player safeguard" } }
      ]
    },

    // ------------------------------------------------------------------ NFS World
    {
      id: "nfs-world",
      title: "Need for Speed: World",
      subtitle: { fr: "SBRW Go — le serveur réécrit en Go", en: "SBRW Go — the server rewritten in Go" },
      platform: "PC",
      year: 2010,
      kind: "server",
      status: "active",
      started: "2026-10-20",
      lastActivity: "2026-11-25",
      summary: {
        fr: "Une réimplémentation en Go, avec une base SQLite embarquée, du serveur communautaire SBRW-Reloaded-Core (Java) pour le client NFS World. Le client est figé : chaque échange (HTTP/XML, XMPP, UDP) est reproduit à l'identique, et chaque route est couverte par un test.",
        en: "A Go reimplementation, with an embedded SQLite database, of the community SBRW-Reloaded-Core server (Java) for the NFS World client. The client is frozen: every exchange (HTTP/XML, XMPP, UDP) is reproduced exactly, and every route has a test."
      },
      repos: [],
      upstream: [
        { label: "SBRW-Reloaded/SBRW-Reloaded-Core", url: "https://github.com/SBRW-Reloaded/SBRW-Reloaded-Core", note: { fr: "le serveur de référence (Java)", en: "the reference server (Java)" } },
        { label: "WorldUnitedNFS/freeroam", url: "https://github.com/WorldUnitedNFS/freeroam", note: { fr: "le monde ouvert (UDP)", en: "free roam (UDP)" } }
      ],
      stages: [
        { label: { fr: "Socle HTTP, authentification, profils", en: "HTTP core, authentication, profiles" }, state: "done" },
        { label: { fr: "De la connexion au monde ouvert", en: "From login to the open world" }, state: "done" },
        { label: { fr: "Courses solo, drag, poursuite", en: "Solo races, drag, pursuit" }, state: "done" },
        { label: { fr: "Boutique et garage", en: "Shop and garage" }, state: "partial" },
        { label: { fr: "Lobbies et courses multijoueur", en: "Multiplayer lobbies and races" }, state: "partial" },
        { label: { fr: "Nouveautés (circulation partagée, police)", en: "New features (shared traffic, police)" }, state: "todo" }
      ],
      works: [
        { fr: "Connexion, création de profil, monde ouvert, chasse au trésor", en: "Login, profile creation, open world, treasure hunt" },
        { fr: "Courses solo, drag et poursuite validées en jeu, XP et passage de niveau", en: "Solo races, drag and pursuit checked in game, XP and level-ups" },
        { fr: "Achats : voitures, pièces, peintures, packs de cartes", en: "Shopping: cars, parts, paints, card packs" },
        { fr: "Chat en jeu (serveur XMPP intégré), lobby et compte à rebours", en: "In-game chat (built-in XMPP server), lobby and countdown" }
      ],
      next: [
        { fr: "Lancer une course multijoueur à deux clients", en: "Start a multiplayer race with two clients" },
        { fr: "Personnalisation des voitures au garage", en: "Car customisation in the garage" },
        { fr: "Circulation partagée en course, police active en monde ouvert", en: "Shared traffic in races, active police in the open world" }
      ],
      milestones: [
        { date: "2026-10-20", text: { fr: "Premier essai avec le vrai client : connexion, courses solo, chat, XP, poursuite", en: "First try with the real client: login, solo races, chat, XP, pursuit" } },
        { date: "2026-11-25", text: { fr: "Packs de cartes validés en jeu ; lobbies multijoueur, relais UDP de course et arbitrage portés", en: "Card packs checked in game; multiplayer lobbies, race UDP relay and arbitration ported" } }
      ]
    },

    // ------------------------------------------------------------------ Star Trek Bridge Crew
    {
      id: "star-trek-bridge-crew",
      title: "Star Trek: Bridge Crew",
      subtitle: { fr: "Serveur de remplacement", en: "Replacement server" },
      platform: "PC (VR)",
      year: 2017,
      kind: "server",
      status: "active",
      started: "2026-10-19",
      lastActivity: "2026-10-22",
      summary: {
        fr: "Relancer le jeu et son multijoueur après la fermeture des services d'Ubisoft. Deux bibliothèques de remplacement simulent Ubisoft en local, un relais Photon patché remplace les serveurs de jeu, et un petit patch du jeu le connecte directement au relais.",
        en: "Bring the game and its multiplayer back after Ubisoft's services shut down. Two replacement libraries simulate Ubisoft locally, a patched Photon relay replaces the game servers, and a small patch of the game connects it straight to the relay."
      },
      repos: [],
      upstream: [
        { label: "gbe_fork (Goldberg)", url: "https://github.com/Detanup01/gbe_fork", note: { fr: "émulation de Steam", en: "Steam emulation" } }
      ],
      stages: [
        { label: { fr: "Le jeu démarre sans Ubisoft", en: "The game boots without Ubisoft" }, state: "done" },
        { label: { fr: "Relais Photon (Name, Master, Game)", en: "Photon relay (Name, Master, Game)" }, state: "done" },
        { label: { fr: "Deux joueurs sur deux PC lancent une mission", en: "Two players on two PCs start a mission" }, state: "done" },
        { label: { fr: "Paquet joueur et installeur", en: "Player package and installer" }, state: "done" },
        { label: { fr: "Mission complète, 4 joueurs, VR et non-VR", en: "Complete mission, 4 players, VR and non-VR" }, state: "todo" }
      ],
      works: [
        { fr: "Démarrage jusqu'au menu sans compte Ubisoft", en: "Boot to the menu with no Ubisoft account" },
        { fr: "Salles visibles, matchmaking de base, mission lancée à deux", en: "Rooms visible, basic matchmaking, mission started by two" },
        { fr: "Connexion directe au relais : ni Interposer ni fichier hosts", en: "Direct connection to the relay: no Interposer, no hosts file" }
      ],
      next: [
        { fr: "Une mission complète à deux (test d'endurance)", en: "A complete mission with two players (endurance test)" },
        { fr: "Essai avec le vrai Steam à la place de l'émulateur", en: "Try with real Steam instead of the emulator" },
        { fr: "Moins de faux positifs antivirus", en: "Fewer antivirus false positives" }
      ],
      milestones: [
        { date: "2026-10-19", text: { fr: "Deux joueurs sur deux PC se retrouvent dans une salle et lancent une mission", en: "Two players on two PCs meet in a room and start a mission" } },
        { date: "2026-10-21", text: { fr: "Patch du jeu : connexion directe au relais ; premier paquet joueur", en: "Game patch: direct connection to the relay; first player package" } },
        { date: "2026-10-22", text: { fr: "Paquet joueur mis à jour", en: "Player package updated" } }
      ]
    },

    // ------------------------------------------------------------------ Virtual-On
    {
      id: "virtual-on",
      title: "Virtual-On Oratorio Tangram",
      subtitle: { fr: "Recompilation Xbox 360 — jeu en réseau local", en: "Xbox 360 recompilation — local network play" },
      platform: "Xbox 360 → PC",
      year: 2009,
      kind: "port",
      status: "release",
      started: "2026-10-30",
      lastActivity: "2026-11-03",
      summary: {
        fr: "Contribution au projet Oratan-recomp, la recompilation PC de Cyber Troopers Virtual-On Oratorio Tangram (Ver. 5.66) : le System Link et les modes Xbox LIVE fonctionnent désormais en réseau local, avec une option dans le menu F1. La contribution a été fusionnée dans le projet d'origine.",
        en: "A contribution to Oratan-recomp, the PC recompilation of Cyber Troopers Virtual-On Oratorio Tangram (Ver. 5.66): System Link and the Xbox LIVE modes now work over a local network, with an option in the F1 menu. The contribution was merged into the original project."
      },
      repos: [
        { repo: "kitaaaaaa/Oratan-recomp", label: { fr: "Projet d'origine (téléchargements)", en: "Original project (downloads)" } },
        { repo: "nynjardin/Oratan-recomp", label: { fr: "Fork", en: "Fork" } }
      ],
      upstream: [
        { label: "kitaaaaaa/Oratan-recomp", url: "https://github.com/kitaaaaaa/Oratan-recomp", note: { fr: "la recompilation", en: "the recompilation" } },
        { label: "rexglue/rexglue-sdk", url: "https://github.com/rexglue/rexglue-sdk", note: { fr: "le SDK de recompilation Xbox 360", en: "the Xbox 360 recompilation SDK" } }
      ],
      contributions: [
        { label: "Oratan-recomp #2", url: "https://github.com/kitaaaaaa/Oratan-recomp/pull/2", state: "merged", title: { fr: "System Link et Xbox LIVE Player Match sur le réseau local", en: "System Link and Xbox LIVE Player Match on the local network" } }
      ],
      stages: [
        { label: { fr: "Recompilation jouable du début à la fin (projet d'origine)", en: "Recompilation playable start to finish (original project)" }, state: "done" },
        { label: { fr: "System Link en LAN", en: "System Link over LAN" }, state: "done" },
        { label: { fr: "Modes Xbox LIVE en LAN, « le gagnant reste »", en: "Xbox LIVE modes over LAN, \"winner stays\"" }, state: "done" },
        { label: { fr: "Fusionné dans le projet d'origine", en: "Merged into the original project" }, state: "done" }
      ],
      works: [
        { fr: "Recherche puis hébergement automatique d'une partie System Link", en: "System Link games found, or hosted automatically" },
        { fr: "Xbox LIVE Player Match sur le réseau local", en: "Xbox LIVE Player Match on the local network" },
        { fr: "Options F1 : System Link, nom du joueur ; script pare-feu fourni", en: "F1 options: System Link, player name; firewall script provided" }
      ],
      next: [],
      milestones: [
        { date: "2026-10-30", text: { fr: "Parties en groupe sur le LAN dans le SDK : invitations, file des challengers", en: "LAN party play in the SDK: invites, a challenger queue" } },
        { date: "2026-11-03", text: { fr: "System Link et modes Xbox LIVE en LAN", en: "System Link and Xbox LIVE modes over LAN" } },
        { date: "2026-11-03", type: "upstream", text: { fr: "Contribution fusionnée dans Oratan-recomp", en: "Contribution merged into Oratan-recomp" } }
      ]
    },

    // ------------------------------------------------------------------ OpenRedRacing
    {
      id: "openredracing",
      title: "OpenRedRacing",
      subtitle: { fr: "Big Red Racing, réimplémenté", en: "Big Red Racing, reimplemented" },
      platform: "PC",
      year: 1996,
      kind: "reimpl",
      status: "release",
      started: "2026-09-10",
      lastActivity: "2026-10-23",
      summary: {
        fr: "Une réimplémentation de Big Red Racing (Big Red Software / Domark, 1996), dans l'esprit d'OpenRCT2 ou OpenRA : un nouveau moteur C++ portable (SDL2, OpenGL 3.3) qui joue au jeu à partir de vos propres fichiers d'origine, avec des améliorations : résolution libre, manette, écran partagé à 4, LAN jusqu'à 6.",
        en: "A reimplementation of Big Red Racing (Big Red Software / Domark, 1996), in the spirit of OpenRCT2 or OpenRA: a new portable C++ engine (SDL2, OpenGL 3.3) that plays the game from your own original files, with improvements: free resolution, gamepads, 4-way split screen, LAN up to 6."
      },
      repos: [
        { repo: "nynjardin/OpenRedRacing", label: { fr: "Sources et téléchargements", en: "Source and downloads" } }
      ],
      upstream: [],
      screenshots: [
        "https://raw.githubusercontent.com/nynjardin/OpenRedRacing/HEAD/screenshots/USA1.jpg",
        "https://raw.githubusercontent.com/nynjardin/OpenRedRacing/HEAD/screenshots/Japan.jpg",
        "https://raw.githubusercontent.com/nynjardin/OpenRedRacing/HEAD/screenshots/Moon.jpg",
        "https://raw.githubusercontent.com/nynjardin/OpenRedRacing/HEAD/screenshots/Mexico.jpg",
        "https://raw.githubusercontent.com/nynjardin/OpenRedRacing/HEAD/screenshots/Italy.jpg",
        "https://raw.githubusercontent.com/nynjardin/OpenRedRacing/HEAD/screenshots/WATER2.jpg"
      ],
      stages: [
        { label: { fr: "Formats du jeu décodés", en: "Game formats decoded" }, state: "done" },
        { label: { fr: "Les 24 circuits affichés", en: "All 24 circuits rendered" }, state: "done" },
        { label: { fr: "Physique d'origine, courses complètes, adversaires", en: "Original physics, full races, opponents" }, state: "done" },
        { label: { fr: "Écran partagé à 4, LAN à 6", en: "4-way split screen, LAN for 6" }, state: "done" },
        { label: { fr: "Release publique", en: "Public release" }, state: "done" },
        { label: { fr: "Championnat et finitions", en: "Championship and polish" }, state: "partial" }
      ],
      works: [
        { fr: "Les 24 circuits, décors destructibles, particules", en: "All 24 circuits, destructible scenery, particles" },
        { fr: "Physique d'origine en simulation déterministe à pas fixe", en: "Original handling as a deterministic fixed-step simulation" },
        { fr: "Son, musique, commentaires, menus et HUD d'origine", en: "Sound, music, commentary, the original menus and HUD" },
        { fr: "Écran partagé jusqu'à 4, LAN jusqu'à 6 (essayé entre deux PC)", en: "Split screen up to 4, LAN up to 6 (tried across two PCs)" }
      ],
      next: [
        { fr: "Championnat : les sept manches, à essayer en jeu", en: "Championship: the seven rounds, to try in game" },
        { fr: "Défauts de conduite (redressement, inertie en virage)", en: "Handling defects (pitch recovery, cornering inertia)" },
        { fr: "Peut-être : IA de pilotage, éditeur de circuits, démo WebAssembly", en: "Maybe: driving AI, circuit editor, WebAssembly demo" }
      ],
      milestones: [
        { date: "2026-09-10", text: { fr: "Percée : les .LEV et .VHC sont des archives, pas des blocs binaires", en: "Breakthrough: .LEV and .VHC are archives, not binary blobs" } },
        { date: "2026-09-16", text: { fr: "Caméra de poursuite portée", en: "Chase camera ported" } },
        { date: "2026-09-22", text: { fr: "Première course jouée, premiers retours", en: "First race played, first feedback" } },
        { date: "2026-09-24", text: { fr: "Les adversaires (fantômes enregistrés), collisions entre voitures", en: "Opponents (recorded ghosts), car-to-car collisions" } },
        { date: "2026-09-25", text: { fr: "Cœur du jeu en réseau : transport ENet, découverte LAN, course en lockstep", en: "Network game core: ENet transport, LAN discovery, lockstep race" } },
        { date: "2026-09-26", text: { fr: "Écran partagé à quatre", en: "Four-way split screen" } },
        { date: "2026-09-27", text: { fr: "Menus d'origine reconstruits", en: "Original menus rebuilt" } },
        { date: "2026-10-09", text: { fr: "Dépôt GitHub public", en: "Public GitHub repository" } },
        { date: "2026-10-11", type: "release", tag: "v0.8", text: { fr: "Première release publique", en: "First public release" } },
        { date: "2026-10-23", text: { fr: "Sources publiées", en: "Source published" } }
      ]
    },

    // ------------------------------------------------------------------ UberConnector
    {
      id: "uberconnector",
      title: "UberConnector",
      subtitle: { fr: "Un LAN virtuel pour jouer par Internet", en: "A virtual LAN to play over the Internet" },
      platform: "Windows",
      year: null,
      kind: "tool",
      status: "release",
      started: "2026-10-29",
      lastActivity: "2026-11-19",
      summary: {
        fr: "Une application Windows portable pour jouer aux jeux « LAN » par Internet : ni serveur, ni compte, ni installation. Les joueurs se retrouvent dans des salons chiffrés, se découvrent sans serveur central et se connectent directement, ou par un autre membre quand c'est impossible. Les jeux voient les autres joueurs comme sur un vrai réseau local.",
        en: "A portable Windows app to play \"LAN\" games over the Internet: no server, no account, no installation. Players meet in encrypted salons, find each other with no central server and connect directly, or through another member when they can't. Games see the other players as if on a real local network."
      },
      repos: [
        { repo: "nynjardin/UberConnector", label: { fr: "Sources et téléchargements", en: "Source and downloads" } }
      ],
      upstream: [
        { label: "EasyTier", url: "https://github.com/EasyTier/EasyTier", note: { fr: "le réseau chiffré entre membres", en: "the encrypted mesh between members" } }
      ],
      icon: "https://raw.githubusercontent.com/nynjardin/UberConnector/HEAD/crates/uc-app/icons/icon.png",
      stages: [
        { label: { fr: "Salons, invitations, modération", en: "Salons, invites, moderation" }, state: "done" },
        { label: { fr: "Découverte sans serveur (Nostr, DHT, trackers)", en: "Serverless discovery (Nostr, DHT, trackers)" }, state: "done" },
        { label: { fr: "Connexions directes et relais par les membres", en: "Direct connections and relaying through members" }, state: "done" },
        { label: { fr: "Mises à jour automatiques", en: "Automatic updates" }, state: "done" },
        { label: { fr: "Plus de demande UAC à chaque activation", en: "No UAC prompt at each activation" }, state: "todo" },
        { label: { fr: "« Lancer le jeu et jouer » (salon automatique par jeu)", en: "\"Launch the game and play\" (automatic salon per game)" }, state: "todo" }
      ],
      works: [
        { fr: "Carte réseau virtuelle présente seulement pendant le jeu", en: "Virtual network adapter present only while playing" },
        { fr: "Ouverture de port automatique, perçage de NAT", en: "Automatic port opening, NAT hole punching" },
        { fr: "Annonces de partie en diffusion relayées dans le salon", en: "Broadcast game announcements relayed into the salon" },
        { fr: "Chat, test réseau du jeu, qualité de lien par joueur", en: "Chat, game network test, link quality per player" }
      ],
      next: [
        { fr: "Démarrer l'assistant sans demande UAC", en: "Start the helper without a UAC prompt" },
        { fr: "Mises à jour signées", en: "Signed updates" },
        { fr: "Listes de relais et trackers personnalisables", en: "Custom relay and tracker lists" }
      ],
      milestones: [
        { date: "2026-10-29", type: "release", tag: "v0.1.0", text: { fr: "Première release publique : salons, découverte sans serveur, connexions directes", en: "First public release: salons, serverless discovery, direct connections" } },
        { date: "2026-11-11", type: "release", tag: "v0.1.4", text: { fr: "Port fixe pour les box sans UPnP", en: "Fixed port for routers without UPnP" } },
        { date: "2026-11-12", type: "release", tag: "v0.2.0", text: { fr: "Chat du salon sécurisé (identité des membres)", en: "Secured salon chat (member identity)" } },
        { date: "2026-11-14", type: "release", tag: "v0.2.2", text: { fr: "Trackers BitTorrent : on se trouve en ~2 secondes", en: "BitTorrent trackers: players find each other in ~2 seconds" } },
        { date: "2026-11-19", type: "release", tag: "v0.2.6", text: { fr: "Double-clic sur un salon pour y jouer", en: "Double-click a salon to play in it" } }
      ]
    },

    // ------------------------------------------------------------------ Mad Dash Racing
    {
      id: "mad-dash-racing",
      title: "Mad Dash Racing",
      subtitle: { fr: "Projet à venir", en: "Upcoming project" },
      platform: "Xbox",
      year: 2001,
      kind: "upcoming",
      status: "planned",
      started: "2026-10-30",
      lastActivity: "2026-10-30",
      summary: {
        fr: "Projet en préparation. Rien n'est encore publié.",
        en: "Project in preparation. Nothing is published yet."
      },
      repos: [],
      upstream: [],
      stages: [],
      works: [],
      next: [],
      milestones: []
    }
  ]
};

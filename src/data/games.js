// Preços em reais para o serviço de platina completa, começando do zero.
// Substitua cover por uma imagem local autorizada e marque coverIsPlaceholder: false.
const placeholder = '/images/game-cover-placeholder.svg';

export const games = [
  { id: 'np-001', name: "Dragon's Dogma 2", slug: 'dragons-dogma-2', platforms: ['PS5'], price: 400, genre: 'RPG de ação', tone: 'amber', cover: '/images/games/dragons-dogma-2.webp', coverIsPlaceholder: false },
  { id: 'np-002', name: 'Mortal Shell II', slug: 'mortal-shell-ii', platforms: ['PS5'], price: 220, genre: 'RPG de ação', tone: 'gray', cover: '/images/games/mortal-shell-ii.webp', coverIsPlaceholder: false },
  { id: 'np-003', name: 'Lords of the Fallen', slug: 'lords-of-the-fallen', platforms: ['PS5'], price: 250, genre: 'RPG de ação', tone: 'purple', cover: '/images/games/lords-of-the-fallen.webp', coverIsPlaceholder: false },
  { id: 'np-004', name: 'Nioh 2', slug: 'nioh-2', platforms: ['PS4', 'PS5'], price: 300, genre: 'RPG de ação', tone: 'red', cover: '/images/games/nioh-2.webp', coverIsPlaceholder: false },
  { id: 'np-005', name: 'Nioh 3', slug: 'nioh-3', platforms: ['PS5'], price: 200, genre: null, tone: 'red', cover: '/images/games/nioh-3.webp', coverIsPlaceholder: false },
  { id: 'np-006', name: 'Resident Evil 3', slug: 'resident-evil-3', platforms: ['PS4', 'PS5'], price: 300, genre: 'Survival horror', tone: 'green', cover: '/images/games/resident-evil-3.webp', coverIsPlaceholder: false },
  { id: 'np-007', name: 'Devil May Cry 5', slug: 'devil-may-cry-5', platforms: ['PS4', 'PS5'], price: 400, genre: 'Ação', tone: 'red', cover: '/images/games/devil-may-cry-5.webp', coverIsPlaceholder: false },
  { id: 'np-008', name: "Baldur's Gate 3", slug: 'baldurs-gate-3', platforms: ['PS5'], price: 300, genre: 'RPG', tone: 'purple', cover: '/images/games/baldurs-gate-3.webp', coverIsPlaceholder: false },
  { id: 'np-009', name: 'Diablo IV', slug: 'diablo-iv', platforms: ['PS4', 'PS5'], price: 600, genre: 'RPG de ação', tone: 'red', cover: '/images/games/diablo-iv.webp', coverIsPlaceholder: false },
  { id: 'np-010', name: 'Resident Evil 7', slug: 'resident-evil-7', platforms: ['PS4', 'PS5'], price: 220, genre: 'Survival horror', tone: 'green', cover: '/images/games/resident-evil-7.webp', coverIsPlaceholder: false },
  { id: 'np-011', name: 'Resident Evil 4', slug: 'resident-evil-4', platforms: ['PS4', 'PS5'], price: 250, genre: 'Survival horror', tone: 'green', cover: '/images/games/resident-evil-4.webp', coverIsPlaceholder: false },
  { id: 'np-012', name: 'Wo Long: Fallen Dynasty', slug: 'wo-long-fallen-dynasty', platforms: ['PS4', 'PS5'], price: 200, genre: 'RPG de ação', tone: 'amber', cover: '/images/games/wo-long-fallen-dynasty.webp', coverIsPlaceholder: false },
  { id: 'np-013', name: 'Devil May Cry 1', slug: 'devil-may-cry-1', platforms: ['PS4'], price: 350, genre: 'Ação', tone: 'red', cover: '/images/games/devil-may-cry-1.webp', coverIsPlaceholder: false },
  { id: 'np-014', name: 'Devil May Cry 2', slug: 'devil-may-cry-2', platforms: ['PS4'], price: 350, genre: 'Ação', tone: 'red', cover: '/images/games/devil-may-cry-2.webp', coverIsPlaceholder: false },
  { id: 'np-015', name: 'Devil May Cry 3', slug: 'devil-may-cry-3', platforms: ['PS4'], price: 350, genre: 'Ação', tone: 'red', cover: '/images/games/devil-may-cry-3.webp', coverIsPlaceholder: false },
  { id: 'np-016', name: 'Devil May Cry 4', slug: 'devil-may-cry-4', platforms: ['PS4'], price: 350, genre: 'Ação', tone: 'red', cover: '/images/games/devil-may-cry-4.webp', coverIsPlaceholder: false },
  { id: 'np-017', name: 'Cyberpunk 2077', slug: 'cyberpunk-2077', platforms: ['PS4', 'PS5'], price: 250, genre: 'RPG de ação', tone: 'purple', cover: '/images/games/cyberpunk.webp', coverIsPlaceholder: false },
  { id: 'np-018', name: 'God of War', slug: 'god-of-war', platforms: ['PS4', 'PS5'], price: 230, genre: 'Ação e aventura', tone: 'blue', cover: '/images/games/god-of-war.webp', coverIsPlaceholder: false },
  { id: 'np-019', name: 'God of War Ragnarök', slug: 'god-of-war-ragnarok', platforms: ['PS4', 'PS5'], price: 230, genre: 'Ação e aventura', tone: 'blue', cover: '/images/games/god-of-war-ragnarok.webp', coverIsPlaceholder: false },
  { id: 'np-020', name: 'Horizon Zero Dawn', slug: 'horizon-zero-dawn', platforms: ['PS4', 'PS5'], price: 250, genre: 'RPG de ação', tone: 'amber', cover: '/images/games/horizon-zero-dawn.webp', coverIsPlaceholder: false },
  { id: 'np-021', name: 'Horizon Forbidden West', slug: 'horizon-forbidden-west', platforms: ['PS4', 'PS5'], price: 250, genre: 'RPG de ação', tone: 'blue', cover: '/images/games/horizon-forbidden-west.webp', coverIsPlaceholder: false },
  { id: 'np-022', name: 'Sekiro: Shadows Die Twice', slug: 'sekiro-shadows-die-twice', platforms: ['PS4'], price: 200, genre: 'Ação e aventura', tone: 'amber', cover: '/images/games/sekiro.webp', coverIsPlaceholder: false },
  { id: 'np-023', name: 'Elden Ring', slug: 'elden-ring', platforms: ['PS4', 'PS5'], price: 200, genre: 'RPG de ação', tone: 'amber', cover: '/images/games/elden-ring.webp', coverIsPlaceholder: false },
  { id: 'np-024', name: 'Dark Souls II', slug: 'dark-souls-ii', platforms: ['PS4'], price: 200, genre: 'RPG de ação', tone: 'gray', cover: '/images/games/dark-souls-ii.webp', coverIsPlaceholder: false },
  { id: 'np-025', name: 'Ghost of Tsushima', slug: 'ghost-of-tsushima', platforms: ['PS4'], price: 200, genre: 'Ação e aventura', tone: 'red', cover: '/images/games/ghost-of-tsushima.webp', coverIsPlaceholder: false },
  { id: 'np-026', name: 'Phantom Blade Zero', slug: 'phantom-blade-zero', platforms: ['PS5'], price: 250, genre: null, tone: 'gray', cover: '/images/games/phantom-blade-zero.webp', coverIsPlaceholder: false },
].map(game => ({ cover: placeholder, coverIsPlaceholder: true, ...game }));

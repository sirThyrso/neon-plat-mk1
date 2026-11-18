import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { games } from '../src/data/games.js';
import { filterGames, formatPrice, getGameMessage } from '../src/lib/catalog.js';
import { GENERAL_CONTACT_MESSAGE, getWhatsAppUrl, WHATSAPP_NUMBER } from '../src/config/whatsapp.js';

// Lista de referência fornecida pelo cliente, independente dos dados implementados.
const expected = [
  ["Dragon's Dogma 2", ['PS5'], 400],
  ['Mortal Shell II', ['PS5'], 220],
  ['Lords of the Fallen', ['PS5'], 250],
  ['Nioh 2', ['PS4', 'PS5'], 300],
  ['Nioh 3', ['PS5'], 200],
  ['Resident Evil 3', ['PS4', 'PS5'], 300],
  ['Devil May Cry 5', ['PS4', 'PS5'], 400],
  ["Baldur's Gate 3", ['PS5'], 300],
  ['Diablo IV', ['PS4', 'PS5'], 600],
  ['Resident Evil 7', ['PS4', 'PS5'], 220],
  ['Resident Evil 4', ['PS4', 'PS5'], 250],
  ['Wo Long: Fallen Dynasty', ['PS4', 'PS5'], 200],
  ['Devil May Cry 1', ['PS4'], 350],
  ['Devil May Cry 2', ['PS4'], 350],
  ['Devil May Cry 3', ['PS4'], 350],
  ['Devil May Cry 4', ['PS4'], 350],
  ['Cyberpunk 2077', ['PS4', 'PS5'], 250],
  ['God of War', ['PS4', 'PS5'], 230],
  ['God of War Ragnarök', ['PS4', 'PS5'], 230],
  ['Horizon Zero Dawn', ['PS4', 'PS5'], 250],
  ['Horizon Forbidden West', ['PS4', 'PS5'], 250],
  ['Sekiro: Shadows Die Twice', ['PS4'], 200],
  ['Elden Ring', ['PS4', 'PS5'], 200],
  ['Dark Souls II', ['PS4'], 200],
  ['Ghost of Tsushima', ['PS4'], 200],
  ['Phantom Blade Zero', ['PS5'], 250],
];

test('catálogo contém exatamente os 26 jogos, preços e plataformas informados', () => {
  assert.equal(games.length, 26);
  assert.deepEqual(games.map(({ name, platforms, price }) => [name, platforms, price]), expected);
  assert.equal(new Set(games.map(game => game.id)).size, 26);
  assert.equal(new Set(games.map(game => game.slug)).size, 26);
  for (const game of games) {
    assert.match(game.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(Number.isFinite(game.price));
    assert.ok('genre' in game);
    assert.ok(existsSync(new URL(`../public${game.cover}`, import.meta.url)));
  }
});

test('busca ignora maiúsculas, espaços externos, acentos e variação de apóstrofo', () => {
  assert.equal(filterGames(games, { search: '  GOD OF WAR RAGNAROK  ' })[0].name, 'God of War Ragnarök');
  assert.equal(filterGames(games, { search: 'Baldur’s Gate' })[0].name, "Baldur's Gate 3");
  assert.equal(filterGames(games, { search: 'resident evil' }).length, 3);
});

test('filtros de plataforma e gênero funcionam junto com a busca', () => {
  assert.equal(filterGames(games).length, 26);
  assert.equal(filterGames(games, { platform: 'PS4' }).length, 20);
  assert.equal(filterGames(games, { platform: 'PS5' }).length, 19);
  assert.deepEqual(filterGames(games, { search: 'devil may cry', platform: 'PS5', genre: 'Ação' }).map(game => game.name), ['Devil May Cry 5']);
  assert.equal(filterGames(games, { search: 'resident', platform: 'PS4', genre: 'Survival horror' }).length, 3);
  assert.equal(filterGames(games, { search: 'resident', genre: 'RPG' }).length, 0);
  assert.equal(filterGames(games, { search: 'jogo inexistente' }).length, 0);
  assert.equal(filterGames(games, { search: '', platform: '', genre: '' }).length, 26);
});

test('preços são formatados em reais com centavos', () => {
  assert.equal(formatPrice(250).replace(/\s/g, ' '), 'R$ 250,00');
  assert.equal(formatPrice(600).replace(/\s/g, ' '), 'R$ 600,00');
});

test('mensagens preservam o jogo, o preço e cada plataforma selecionada', () => {
  for (const game of games) {
    for (const platform of game.platforms) {
      const complete = getGameMessage(game, platform);
      assert.equal(complete, `Olá! Gostaria de contratar a platina completa de ${game.name} para ${platform}, pelo valor de ${formatPrice(game.price)}.`);
      const personalized = getGameMessage(game, platform, true);
      assert.equal(personalized, `Olá! Gostaria de solicitar um orçamento personalizado para ${game.name} no ${platform}. Já tenho algum progresso no jogo e gostaria de informar quais troféus faltam.`);
      assert.ok(!personalized.includes(formatPrice(game.price)));
    }
    assert.throws(() => getGameMessage(game, 'PS3'), RangeError);
  }
});

test('configuração vazia ou inválida nunca gera um link de WhatsApp', () => {
  for (const number of ['', 'pendente', '+55 11', '00000000', '123', '1'.repeat(16)]) {
    assert.equal(getWhatsAppUrl('Olá!', number), null);
  }
});

test('contato geral usa o número comercial e a mensagem padronizada', () => {
  assert.equal(WHATSAPP_NUMBER, '5513997391390');
  assert.equal(GENERAL_CONTACT_MESSAGE, 'Olá! Conheci a NEON//PLAT pelo site e gostaria de saber mais sobre os serviços de platinas.');
  const href = getWhatsAppUrl(GENERAL_CONTACT_MESSAGE);
  assert.equal(href, `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(GENERAL_CONTACT_MESSAGE)}`);
  assert.equal(new URL(href).searchParams.get('text'), GENERAL_CONTACT_MESSAGE);
});

test('links comerciais codificam as mensagens de todos os jogos e plataformas sem perdas', () => {
  for (const game of games) {
    for (const platform of game.platforms) {
      for (const personalized of [false, true]) {
        const message = getGameMessage(game, platform, personalized);
        const href = getWhatsAppUrl(message);
        assert.equal(href, `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
        assert.equal(new URL(href).searchParams.get('text'), message);
      }
    }
  }
});

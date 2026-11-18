const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const formatPrice = price => currency.format(price);

const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’‘]/g, "'").toLowerCase().trim();

export function filterGames(games, { search = '', platform = '', genre = '' } = {}) {
  const query = normalize(search);
  return games.filter(game => normalize(game.name).includes(query)
    && (!platform || game.platforms.includes(platform))
    && (!genre || game.genre === genre));
}

export function getGameMessage(game, platform, personalized = false) {
  if (!game.platforms.includes(platform)) throw new RangeError('Selecione uma plataforma disponível para este jogo.');
  return personalized
    ? `Olá! Gostaria de solicitar um orçamento personalizado para ${game.name} no ${platform}. Já tenho algum progresso no jogo e gostaria de informar quais troféus faltam.`
    : `Olá! Gostaria de contratar a platina completa de ${game.name} para ${platform}, pelo valor de ${formatPrice(game.price)}.`;
}

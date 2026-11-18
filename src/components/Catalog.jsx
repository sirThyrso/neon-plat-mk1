import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Trophy, X } from 'lucide-react';
import { games } from '../data/games.js';
import { GENERAL_CONTACT_MESSAGE, getWhatsAppUrl } from '../config/whatsapp.js';
import { filterGames, formatPrice, getGameMessage } from '../lib/catalog.js';

const genres = [...new Set(games.map(game => game.genre).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));

function GameCover({ game }) {
  const [failed, setFailed] = useState(false);
  const placeholder = game.coverIsPlaceholder || failed;
  return <div className={`game-art ${game.tone}${game.coverIsPlaceholder ? '' : ' has-game-cover'}`}>
    {!failed && <img className={placeholder ? 'game-cover temporary-cover' : 'game-cover'} src={game.cover} alt={placeholder ? '' : `Capa de ${game.name}`} loading="lazy" onError={() => setFailed(true)} />}
    {placeholder && <div className="cover-placeholder"><Trophy size={28} aria-hidden="true"/><span>{game.name}</span><small>CAPA TEMPORÁRIA</small></div>}
    <span className="game-id">{game.id.toUpperCase()}</span>
  </div>;
}

function WhatsAppAction({ message = GENERAL_CONTACT_MESSAGE, children, className = '', describedBy }) {
  const href = getWhatsAppUrl(message);
  return href
    ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={17} aria-hidden="true"/></a>
    : <button className={className} type="button" disabled aria-describedby={describedBy}>{children}<ArrowUpRight size={17} aria-hidden="true"/></button>;
}

function GameDetails({ game, initialPlatform, onClose }) {
  const dialogRef = useRef(null);
  const platformRef = useRef(null);
  const [platform, setPlatform] = useState(game.platforms.includes(initialPlatform) ? initialPlatform : game.platforms[0]);
  const whatsappPending = !getWhatsAppUrl('');

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    platformRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return <dialog className="game-dialog" ref={dialogRef} aria-labelledby="game-details-title" onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="game-dialog-top"><span className="kicker">// PLATINA COMPLETA</span><button className="dialog-close" type="button" onClick={onClose} aria-label="Fechar detalhes e voltar ao catálogo"><X aria-hidden="true"/></button></div>
    <div className="game-details-layout">
      <GameCover game={game}/>
      <div className="game-details-content">
        <h2 id="game-details-title">{game.name}</h2>
        <p className="game-platforms">{game.platforms.join(' / ')}{game.genre && ` · ${game.genre}`}</p>
        <div className="game-price">{formatPrice(game.price)}</div>
        <p>Serviço de conquista da platina completa, começando do zero, para a versão selecionada. O valor anunciado é por jogo e por plataforma.</p>
        <label className="platform-selector" htmlFor="game-platform">VERSÃO DESEJADA
          <select id="game-platform" ref={platformRef} value={platform} onChange={event => setPlatform(event.target.value)}>
            {game.platforms.map(version => <option key={version} value={version}>{version}</option>)}
          </select>
        </label>
        {game.platforms.length > 1 && <p className="platform-price-note">O preço é o mesmo para PS4 e PS5. Selecione a versão que deseja contratar.</p>}
        {whatsappPending && <p className="whatsapp-notice" id="details-whatsapp-status" role="status">WhatsApp ainda não configurado. As solicitações estarão disponíveis após a configuração do contato.</p>}
        <WhatsAppAction className="btn primary catalog-contract" message={getGameMessage(game, platform)} describedBy="details-whatsapp-status">CONTRATAR PLATINA COMPLETA</WhatsAppAction>
        <div className="personalized-service">
          <h3>JÁ TEM PROGRESSO?</h3>
          <p>Solicite um orçamento personalizado para aproveitar seu progresso, conquistar troféus específicos ou consultar serviços de DLCs. O valor será avaliado conforme o pedido.</p>
          <WhatsAppAction className="outline-btn" message={getGameMessage(game, platform, true)} describedBy="details-whatsapp-status">SOLICITAR ORÇAMENTO PERSONALIZADO</WhatsAppAction>
        </div>
        <button className="catalog-reset" type="button" onClick={onClose}>VOLTAR AO CATÁLOGO</button>
      </div>
    </div>
  </dialog>;
}

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const filtered = filterGames(games, { search, platform, genre });
  const hasFilters = Boolean(search || platform || genre);
  const whatsappPending = !getWhatsAppUrl('');
  const clearFilters = () => { setSearch(''); setPlatform(''); setGenre(''); };

  return <section className="section catalog" id="jogos">
    <div className="section-top"><span className="kicker">// 02 — GAME DATABASE</span><span className="side-note">CATÁLOGO OFICIAL</span></div>
    <div className="catalog-head"><h2>ESCOLHA SEU<br/><em>PRÓXIMO ALVO.</em></h2><p>Escolha seu jogo e a versão desejada. Os preços são individuais para a platina completa, começando do zero. Já tem progresso? Solicite um orçamento personalizado.</p></div>
    <label className="search"><span aria-hidden="true">⌕</span><input type="search" placeholder="BUSCAR JOGO..." value={search} onChange={event => setSearch(event.target.value)} aria-label="Buscar jogo pelo nome"/><span aria-hidden="true">SEARCH_</span></label>
    <div className="catalog-filters">
      <fieldset className="platform-filters"><legend>PLATAFORMA</legend><div>{[['', 'Todos'], ['PS4', 'PS4'], ['PS5', 'PS5']].map(([value, label]) => <button type="button" key={value} aria-pressed={platform === value} onClick={() => setPlatform(value)}>{label}</button>)}</div></fieldset>
      <label className="genre-filter" htmlFor="catalog-genre">GÊNERO<select id="catalog-genre" value={genre} onChange={event => setGenre(event.target.value)}><option value="">Todos os gêneros</option>{genres.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
      {hasFilters && <button className="catalog-reset" type="button" onClick={clearFilters}>LIMPAR FILTROS</button>}
    </div>
    <p className="catalog-results" role="status">{filtered.length} {filtered.length === 1 ? 'jogo encontrado' : 'jogos encontrados'} · {games.length} no catálogo</p>
    {whatsappPending && <p className="whatsapp-notice" id="catalog-whatsapp-status">Integração com WhatsApp pendente. Você pode consultar os jogos e preços; a contratação será liberada quando o contato for configurado.</p>}
    <div className="game-grid">
      {filtered.map(game => <article className={`game-card ${game.tone}`} key={game.id} id={game.slug}>
        <GameCover game={game}/>
        <div className="game-info">
          <h3><button type="button" className="game-card-trigger" aria-haspopup="dialog" aria-label={`Abrir detalhes de ${game.name}`} aria-describedby={`${game.id}-platforms ${game.id}-price`} onClick={() => setSelectedGame(game)}>{game.name}</button></h3>
          <p className="game-platforms" id={`${game.id}-platforms`}>{game.platforms.join(' / ')}</p>
          <div className="game-price" id={`${game.id}-price`}><span className="game-price-prefix">A partir de</span>{formatPrice(game.price)}</div>
        </div>
      </article>)}
    </div>
    {!filtered.length && <div className="catalog-empty"><h3>NENHUM JOGO ENCONTRADO</h3><p>Tente outro nome ou limpe os filtros para explorar o catálogo completo.</p><button type="button" className="outline-btn" onClick={clearFilters}>LIMPAR FILTROS</button></div>}
    <div className="catalog-footer"><p>NÃO ENCONTROU SEU JOGO? <strong>ACEITAMOS CONSULTAS PARA OUTROS TÍTULOS.</strong></p><WhatsAppAction className="outline-btn" describedBy="catalog-whatsapp-status">CONSULTAR OUTRO JOGO</WhatsAppAction></div>
    {selectedGame && <GameDetails key={selectedGame.id} game={selectedGame} initialPlatform={platform} onClose={() => setSelectedGame(null)}/>}
  </section>;
}

import React, { useState } from 'react';
import { Gamepad2, Crosshair } from 'lucide-react';
import { PLAYER_PHOTO } from '../config/profile.js';

function ProfilePortrait({ src }) {
  const [failedSource, setFailedSource] = useState(null);
  const showPhoto = Boolean(src) && failedSource !== src;

  return <div className="profile-card">
    <div className="profile-portrait">
      {showPhoto
        ? <img src={src} alt="Retrato de sillythyr, jogador responsável pela NEON//PLAT" loading="lazy" onError={() => setFailedSource(src)}/>
        : <div className="profile-placeholder">
          <div className="profile-avatar" aria-hidden="true"><Gamepad2 strokeWidth={1}/></div>
          <span>PLAYER PROFILE // SILLYTHYR</span>
        </div>}
      <span className="profile-frame" aria-hidden="true"/>
    </div>
    <div className="profile-card-footer"><span>NEON<span>//</span>PLAT</span><Crosshair size={18} aria-hidden="true"/></div>
  </div>;
}

export default function PlayerProfile() {
  return <section className="section player-profile" id="sobre-mim" aria-labelledby="player-profile-title">
    <div className="section-top"><span className="kicker">// PLAYER PROFILE</span><span className="side-note">NEON//PLAT</span></div>
    <div className="profile-layout">
      <ProfilePortrait src={PLAYER_PHOTO}/>
      <div className="profile-content">
        <h2 id="player-profile-title"><span className="profile-heading-label">POR TRÁS DO SISTEMA //</span>{' '}<em>SILLYTHYR</em></h2>
        <div className="profile-bio">
          <p className="profile-intro"><strong>O Nick é sillythyr.</strong></p>
          <p>Comecei a trabalhar com platinas em 2020, durante a quarentena, como uma forma de ganhar uma grana extra. Seis anos depois, continuo por aqui.</p>
          <p>Sou completamente viciado em RPGs dark fantasy, principalmente Dark Souls e outros soulslikes. Quanto mais desafiador, melhor.</p>
          <p>Hoje, através da NEON//PLAT, ajudo outros jogadores a conquistarem aquelas platinas que exigem tempo, paciência ou algumas dezenas de tentativas a mais.</p>
        </div>
        <dl className="profile-stats">
          <div><dt>PSN:</dt><dd>sillythyr</dd></div>
          <div><dt>Na ativa desde:</dt><dd>2020</dd></div>
        </dl>
      </div>
    </div>
  </section>;
}

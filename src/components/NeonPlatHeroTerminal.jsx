import React, { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle } from 'lucide-react';
import { GENERAL_CONTACT_MESSAGE, getWhatsAppUrl } from '../config/whatsapp.js';
import styles from "./NeonPlatHeroTerminal.module.css";

const SERVICES = ["Platina completa", "Troféus específicos", "Conteúdo extra / DLC"];

const BARCODE = [
  2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2,
  1, 2, 3, 1,
];

const METRICS = [
  ["LAT", "24ms"],
  ["CH", "07"],
  ["FPS", "60"],
  ["SEC", "OK"],
];

const BOOT_MS = 2600;

export default function NeonPlatHeroTerminal() {
  const headline = "SUA PRÓXIMA PLATINA COMEÇA AQUI.";
  const rootRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), reduceMotion ? 0 : BOOT_MS);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  const handlePointerMove = useCallback(
    (event) => {
      if (reduceMotion || !rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rootRef.current.style.setProperty("--px", px.toFixed(3));
      rootRef.current.style.setProperty("--py", py.toFixed(3));
    },
    [reduceMotion],
  );

  const handlePointerLeave = useCallback(() => {
    rootRef.current?.style.setProperty("--px", "0");
    rootRef.current?.style.setProperty("--py", "0");
  }, []);

  const whatsappHref = getWhatsAppUrl(GENERAL_CONTACT_MESSAGE);

  const step = (n) => ({ "--b": n });

  return (
    <section
      id="inicio"
      ref={rootRef}
      className={`${styles.hero} ${reduceMotion ? styles.reduced : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-testid="neonplat-terminal-hero"
      aria-label="NEON//PLAT — serviços de troféus e platinas PlayStation"
    >
      {/* Ambiente */}
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.scan} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      {/* Trilhos laterais */}
      <div className={`${styles.rail} ${styles.railLeft} ${styles.bootFade}`} style={step(2)} aria-hidden="true">
        SECTOR//09 <span className={styles.railTick} /> TROPHY.NET
      </div>
      <div className={`${styles.rail} ${styles.railRight} ${styles.bootFade}`} style={step(2)} aria-hidden="true">
        製品 <span className={styles.railTick} /> PSN-07
      </div>

      {/* Topbar */}
      <div className={styles.topbar}>
        <div className={`${styles.brand} ${styles.bootReveal}`} style={step(1)} data-testid="neonplat-terminal-brand">
          <span className={styles.bracket}>[</span>
          NEON<span className={styles.slash}>//</span>PLAT
          <span className={styles.bracket}>]</span>
        </div>
        <div className={`${styles.readout} ${styles.bootReveal}`} style={step(2)} aria-hidden="true">
          <span className={styles.readoutWide}>NODE#PSN-07</span>
          <span className={`${styles.sep} ${styles.readoutWide}`}>/</span>
          <span className={styles.readoutWide}>LAT 56.83°N · LON 60.60°E</span>
          <span className={`${styles.sep} ${styles.readoutWide}`}>/</span>
          <span className={styles.live}>
            <span className={styles.signalDot} />
            LIVE
          </span>
        </div>
        <span className={`${styles.topRule} ${styles.bootDraw}`} style={step(0)} aria-hidden="true" />
      </div>

      {/* Conteúdo */}
      <div className={styles.content}>
        <div className={styles.copy}>
          <div className={`${styles.eyebrow} ${styles.bootReveal}`} style={step(3)} data-testid="neonplat-terminal-eyebrow">
            <span className={styles.eyebrowId}>ID.001</span>
            PLAYSTATION TROPHY SERVICES
          </div>

          <h1 className={styles.headline} aria-label={headline} data-testid="neonplat-terminal-headline">
            <span className={`${styles.line} ${styles.bootReveal}`} style={step(4)}>
              SUA PRÓXIMA
            </span>{" "}
            <span className={`${styles.line} ${styles.lineTarget}`}>
              <span className={`${styles.highlight} ${styles.bootReveal}`} style={step(5)}>
                PLATINA
              </span>
              <span className={`${styles.connector} ${styles.bootDraw}`} style={step(10)} aria-hidden="true" />
            </span>{" "}
            <span className={`${styles.line} ${styles.bootReveal}`} style={step(6)}>
              COMEÇA AQUI.
              <span className={styles.cursor} aria-hidden="true" />
            </span>
          </h1>

          <p className={`${styles.subheadline} ${styles.bootFade}`} style={step(7)} data-testid="neonplat-terminal-subheadline">
            Serviços especializados em troféus e platinas PlayStation, com atendimento personalizado.
          </p>

          <ul className={`${styles.tags} ${styles.bootFade}`} style={step(8)} data-testid="neonplat-terminal-services">
            {SERVICES.map((service) => (
              <li key={service} className={styles.tag}>
                {service}
              </li>
            ))}
          </ul>

          <div className={`${styles.actions} ${styles.bootFade}`} style={step(9)}>
            <a
              className={styles.ctaPrimary}
              href={whatsappHref || "#contato"}
              target={whatsappHref ? "_blank" : undefined}
              rel={whatsappHref ? "noopener noreferrer" : undefined}
              data-testid="neonplat-terminal-cta-whatsapp"
            >
              <MessageCircle className={styles.ctaIcon} aria-hidden="true" />
              SOLICITAR ORÇAMENTO
            </a>
            <a
              className={styles.ctaGhost}
              href="#servicos"
              data-testid="neonplat-terminal-cta-services"
            >
              VER OS SERVIÇOS
              <span className={styles.ctaArrow} aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Console técnico unificado */}
        <aside className={`${styles.console} ${styles.bootFade}`} style={step(11)} aria-hidden="true" data-testid="neonplat-terminal-console">
          <div className={styles.consoleHead}>
            <span>SYS.CONSOLE</span>
            <span className={styles.consoleId}>TROPHY.SCAN // 07</span>
            <span className={`${styles.consoleState} ${booted ? styles.isOnline : ""}`} data-testid="neonplat-terminal-console-state">
              <span className={styles.stateDot} />
              {booted ? "ONLINE" : "BOOT…"}
            </span>
          </div>

          <div className={`${styles.consoleBody} ${styles.bootFade}`} style={step(12)}>
            <div className={styles.reticle}>
              <span className={styles.ring} />
              <span className={styles.ringInner} />
              <span className={styles.crossH} />
              <span className={styles.crossV} />
              <span className={styles.sweep} />
              <span className={styles.core} />
            </div>
            <dl className={styles.readouts}>
              <div className={styles.readRow}>
                <dt>TARGET</dt>
                <dd>PLATINUM</dd>
              </div>
              <div className={styles.readRow}>
                <dt>STATUS</dt>
                <dd className={styles.signal}>UNLOCK</dd>
              </div>
              <div className={styles.readRow}>
                <dt>MATCH</dt>
                <dd className={styles.data}>98%</dd>
              </div>
            </dl>
          </div>

          <div className={`${styles.progress} ${styles.bootFade}`} style={step(13)}>
            <div className={styles.progressLabel}>
              <span>TROPHY SYNC</span>
              <span className={styles.data}>100%</span>
            </div>
            <div className={styles.bar}>
              <span className={`${styles.barFill} ${styles.bootDraw}`} style={step(14)} />
            </div>
          </div>

          <div className={`${styles.metrics} ${styles.bootFade}`} style={step(13)}>
            {METRICS.map(([label, value]) => (
              <div key={label} className={styles.metric}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className={`${styles.consoleFoot} ${styles.bootFade}`} style={step(14)}>
            <div className={styles.barcode}>
              {BARCODE.map((w, i) => (
                <span key={i} style={{ width: `${w}px` }} />
              ))}
            </div>
            <div className={styles.footMeta}>
              <span>RAD · INTERNAL-999</span>
              <span className={styles.caution}>▲ USE WITH CAUTION</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Ticker */}
      <div className={`${styles.ticker} ${styles.bootFade}`} style={step(14)} aria-hidden="true">
        <span className={styles.tickerPrompt}>&gt;_</span>
        <div className={styles.tickerWindow}>
          <div className={styles.tickerTrack}>
            {[0, 1].map((k) => (
              <span key={k} className={styles.tickerText}>
                SYS.v2.4 · RENDER OK · 60FPS · SECURE CHANNEL · SECTOR//09 · TROPHY SYNC 100% · PSN TROPHY NETWORK ·
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

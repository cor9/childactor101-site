"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, LockKeyhole, Printer, Shuffle, Star, X } from "lucide-react";

import { actingCards, type ActingCard, type DeckId } from "@/data/acting-decks";
import styles from "./decks.module.css";

const UNLOCK_KEY = "ca101-decks-unlocked";
const FAVORITES_KEY = "ca101-decks-favorites";
const deckOptions: { id: DeckId; label: string; count: number }[] = [
  { id: "bold", label: "Bold Acting Choices", count: 43 },
  { id: "comedy", label: "Comedy Choices · HA! HA!", count: 47 },
  { id: "all", label: "All Combined", count: 90 },
];

const instructions = {
  bold: {
    title: "Bold Acting Choices",
    paragraphs: [
      "Use this deck when playing with the scene and discovering the character. We should always be looking for our own distinctive POV of the scene to show Casting. With a goal of making BOLD choices this deck will allow the scene to unlock things for the Actor that makes them think or feel in a new and often unexpected way.",
      "It is important to always stay within the boundaries of the script, but an Actor should discuss what worked in the scene by obeying the card. These conversations and epiphanies are where the STRONG acting choices come from.",
      "This scene booster deck is intended for Children Ages 8+. And was developed during student lessons and 35 years of acting performance study from countless resources and methods by C. Ralston.",
    ],
  },
  comedy: {
    title: "Comedy Choices · HA! HA!",
    paragraphs: [
      "Being funny takes practice and failure. You have to catch people off-guard. The comedy must be strong and activated throughout the body. You must know what the joke is so you can land it - and get the laugh!",
      "To stand out in comedy scenes and especially when auditioning for comedic roles - it can be very frightening for many actors to take the bold enough stand to get the big laughs. Use this deck to be silly and try new things with a scene. Some of the off the wall ideas will inspire some truly funny moments. Just you wait. - Corey",
    ],
  },
};

function shuffle<T,>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function DeckShuffler() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [deck, setDeck] = useState<DeckId>("bold");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [position, setPosition] = useState(-1);
  const [transitionKey, setTransitionKey] = useState(0);
  const bags = useRef<Record<DeckId, string[]>>({ bold: [], comedy: [], all: [] });
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(UNLOCK_KEY) === "true");
      const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
      if (Array.isArray(saved)) setFavorites(saved.filter((id): id is string => typeof id === "string"));
    } catch { /* Storage may be unavailable in private browsing. */ }
    setReady(true);
  }, []);

  const activeCards = useMemo(() => actingCards.filter((card) => deck === "all" || card.deck === deck), [deck]);
  const visibleCards = useMemo(() => favoritesOnly ? activeCards.filter((card) => favorites.includes(card.id)) : activeCards, [activeCards, favorites, favoritesOnly]);
  const currentId = history[position];
  const currentCard = visibleCards.find((card) => card.id === currentId) ?? null;

  function resetView(nextDeck: DeckId, onlyFavorites: boolean) {
    setDeck(nextDeck);
    setFavoritesOnly(onlyFavorites);
    setHistory([]);
    setPosition(-1);
    setTransitionKey((key) => key + 1);
  }

  function draw() {
    if (!visibleCards.length) return;
    const eligible = new Set(visibleCards.map((card) => card.id));
    let bag = bags.current[deck].filter((id) => eligible.has(id));
    if (!bag.length) {
      bag = shuffle(visibleCards.map((card) => card.id));
      if (bag.length > 1 && bag[bag.length - 1] === currentId) {
        [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
      }
    }
    const id = bag.pop()!;
    bags.current[deck] = bag;
    const nextHistory = [...history.slice(0, position + 1), id];
    setHistory(nextHistory);
    setPosition(nextHistory.length - 1);
    setTransitionKey((key) => key + 1);
  }

  function step(direction: -1 | 1) {
    const next = position + direction;
    if (next >= 0 && next < history.length) {
      setPosition(next);
      setTransitionKey((key) => key + 1);
    } else if (direction === 1) draw();
  }

  function toggleFavorite(card: ActingCard) {
    const next = favorites.includes(card.id) ? favorites.filter((id) => id !== card.id) : [...favorites, card.id];
    setFavorites(next);
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)); } catch { /* Keep in-session state. */ }
    if (favoritesOnly && next.length === 0) resetView(deck, false);
  }

  function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.trim().toUpperCase() !== "CA101DECK") {
      setError("That code didn't work. Check it and try again.");
      return;
    }
    try { localStorage.setItem(UNLOCK_KEY, "true"); } catch { /* Keep in-session access. */ }
    setUnlocked(true);
    setError("");
  }

  if (!ready) return <div className={styles.loading} aria-live="polite">Loading your decks…</div>;

  if (!unlocked) return (
    <section className={styles.unlockWrap}>
      <div className={styles.unlockCard}>
        <div className={styles.unlockIcon}><LockKeyhole size={28} /></div>
        <span className={styles.eyebrow}>A little room for big choices</span>
        <h1>Your acting decks are ready.</h1>
        <p>Enter your access code to open 90 scene prompts you can shuffle, save, and print.</p>
        <form onSubmit={unlock} className={styles.unlockForm}>
          <label htmlFor="deck-code">Access code</label>
          <input id="deck-code" value={code} onChange={(event) => { setCode(event.target.value); setError(""); }} autoComplete="off" autoCapitalize="characters" placeholder="Enter your code" aria-invalid={!!error} aria-describedby={error ? "code-error" : undefined} />
          {error && <p id="code-error" className={styles.error}>{error}</p>}
          <button type="submit" className={styles.primaryButton}>Unlock decks <ArrowRight size={18} /></button>
        </form>
      </div>
    </section>
  );

  return (
    <main className={styles.page}>
      <div className={styles.siteContent}>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>The rehearsal room · Child Actor 101</span>
          <h1>Pick a card.<br /><em>Make a choice.</em></h1>
          <p>Ninety playful ways to unlock a fresh take. Choose a deck, draw a card, and see where the scene goes.</p>
        </header>

        <div className={styles.workspace}>
          <nav className={styles.deckTabs} aria-label="Choose a card deck">
            {deckOptions.map((option) => <button key={option.id} type="button" className={`${styles.deckTab} ${deck === option.id ? styles.deckTabActive : ""}`} aria-current={deck === option.id ? "page" : undefined} onClick={() => resetView(option.id, false)}><span>{option.label}</span><small>{option.count} cards</small></button>)}
          </nav>

          <div className={styles.toolbar}>
            <button type="button" onClick={() => setInstructionsOpen(true)}><BookOpen size={17} /> Instructions / How to Use</button>
            <button type="button" className={favoritesOnly ? styles.filterActive : ""} onClick={() => resetView(deck, !favoritesOnly)}><Star size={17} fill={favoritesOnly ? "currentColor" : "none"} /> View Favorites <span>{activeCards.filter((card) => favorites.includes(card.id)).length}</span></button>
          </div>

          <div className={styles.stage} onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={(event) => { const start = touchStart.current; touchStart.current = null; if (!start) return; const dx = event.changedTouches[0].clientX - start.x; const dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx > 0 ? -1 : 1); }}>
            <div key={transitionKey} className={`${styles.playingCard} ${currentCard?.deck === "comedy" ? styles.comedyCard : ""}`} aria-live="polite">
              <div className={styles.cardTop}><span className={styles.cardBadge}>{currentCard ? (currentCard.deck === "bold" ? "BOLD CHOICES" : "HA! HA! COMEDY") : "ACTING CHOICE DECKS"}</span>{currentCard && <span className={styles.cardNumber}>Card {currentCard.number} of {currentCard.deck === "bold" ? 43 : 47}</span>}</div>
              <div className={styles.cardCenter}><span className={styles.cardSparkle}>✳</span><p>{currentCard ? currentCard.prompt : favoritesOnly ? "No favorites here yet. Save a card you love, then come back." : "Your next great choice is one card away."}</p></div>
              <div className={styles.cardBottom}><span>CHILD ACTOR 101</span><span>✦</span></div>
            </div>
          </div>

          <div className={styles.controls}>
            <button type="button" className={styles.secondaryButton} onClick={() => step(-1)} disabled={position <= 0} aria-label="Previous card"><ArrowLeft size={18} /><span>Previous</span></button>
            <button type="button" className={styles.primaryButton} onClick={draw} disabled={!visibleCards.length}><Shuffle size={19} /> Draw Random Card</button>
            <button type="button" className={styles.secondaryButton} onClick={() => step(1)} disabled={!visibleCards.length} aria-label="Next card"><span>Next</span><ArrowRight size={18} /></button>
          </div>
          <div className={styles.underControls}>
            <button type="button" className={styles.favoriteButton} onClick={() => currentCard && toggleFavorite(currentCard)} disabled={!currentCard}><Star size={19} fill={currentCard && favorites.includes(currentCard.id) ? "currentColor" : "none"} /> {currentCard && favorites.includes(currentCard.id) ? "Favorited" : "Favorite"}</button>
            <span>Swipe left or right to move between cards</span>
          </div>

          <div className={styles.bottomRow}>
            <div><h2>Take the deck with you.</h2><p>Print all {activeCards.length} cards as low-ink, nine-card sheets.</p></div>
            <button type="button" className={styles.printButton} onClick={() => window.print()}><Printer size={18} /> Print 9-Up Sheet</button>
          </div>
          <aside className={styles.funnel}><div><span className={styles.eyebrow}>Ready for a choice that fits your script?</span><h2>Make your next take your own.</h2><p>Want acting choices written specifically for the exact script in your hand? Try Bold Choices — custom playable choices for your audition sides ($3.99/guide).</p></div><a href="https://boldchoices.childactor101.com" className={styles.funnelLink}>Explore Bold Choices <ArrowRight size={18} /></a></aside>
        </div>
      </div>

      <div className={styles.printOnly} data-decks-print>{Array.from({ length: Math.ceil(activeCards.length / 9) }, (_, page) => <section className={styles.printPage} key={page}><h1>{deckOptions.find((option) => option.id === deck)?.label} · Acting Choice Cards</h1><div className={styles.printGrid}>{activeCards.slice(page * 9, page * 9 + 9).map((card) => <article key={card.id} className={styles.printCard}><small>{card.deck === "bold" ? "BOLD ACTING CHOICES" : "HA! HA! COMEDY"} · {card.number}</small><p>{card.prompt}</p><footer>CHILD ACTOR 101</footer></article>)}</div></section>)}</div>

      {instructionsOpen && <div className={styles.modalBackdrop} onClick={() => setInstructionsOpen(false)}><div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="instructions-title" onClick={(event) => event.stopPropagation()}><button type="button" className={styles.closeButton} onClick={() => setInstructionsOpen(false)} aria-label="Close instructions"><X size={22} /></button><span className={styles.eyebrow}>A note from Corey</span><h2 id="instructions-title">Instructions / How to Use</h2>{(deck === "all" ? [instructions.bold, instructions.comedy] : [instructions[deck]]).map((section) => <section key={section.title}><h3>{section.title}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div></div>}
    </main>
  );
}

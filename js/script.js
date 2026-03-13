document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     NAVIGATION MOBILE
     ===================================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* =====================================================
     THÈME SOMBRE / CLAIR
     ===================================================== */
  const themeBtn  = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');

  if (themeBtn) {
    const applyTheme = (dark) => {
      document.body.classList.toggle('dark-theme', dark);
      if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
    };

    themeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-theme');
      applyTheme(!isDark);
      localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    });

    applyTheme(localStorage.getItem('theme') === 'dark');
  }

  /* =====================================================
     CITATIONS ALÉATOIRES (home)
     ===================================================== */
  const citations = [
    "Miminella, tu es mon rayon de soleil 🌸",
    "Chaque jour avec toi est plus doux qu'un Monchhichi 🐵💕",
    "À tes côtés, tout devient magique ✨",
    "Mon cœur bat pour toi, Ornella ❤️",
    "Tu es ma joie quotidienne, ma petite Miminella 💖",
    "Ta présence illumine chaque instant de ma vie 🌟",
    "Avec toi, chaque moment devient un souvenir précieux 💫",
  ];

  const citationEl = document.getElementById('citation');
  if (citationEl) {
    let lastIdx = -1;
    function setRandomCitation() {
      let idx;
      do { idx = Math.floor(Math.random() * citations.length); } while (idx === lastIdx);
      lastIdx = idx;
      citationEl.style.opacity = '0';
      citationEl.style.transform = 'translateY(6px)';
      setTimeout(() => {
        citationEl.textContent = citations[idx];
        citationEl.style.transition = 'all 0.3s ease';
        citationEl.style.opacity = '1';
        citationEl.style.transform = 'translateY(0)';
      }, 280);
    }

    citationEl.style.transition = 'all 0.3s ease';
    citationEl.textContent = citations[Math.floor(Math.random() * citations.length)];
    citationEl.style.cursor = 'pointer';
    citationEl.title = 'Clique pour une nouvelle citation ✨';
    citationEl.addEventListener('click', setRandomCitation);
  }

  /* =====================================================
     ÉLÉMENTS SECRETS
     ===================================================== */
  const coeurSecret = document.getElementById('coeur-secret');
  if (coeurSecret) {
    coeurSecret.addEventListener('click', () => {
      window.location.href = 'secret.html';
    });
  }

  const codeBtn = document.getElementById('code-secret-btn');
  if (codeBtn) {
    codeBtn.addEventListener('click', () => {
      const code = prompt('💝 Indice : Evenement récent où tu as beaucoup stressé (jjmmaa)');
      if (code && code.toLowerCase() === '310725') {
        window.location.href = 'secret2.html';
      } else if (code !== null) {
        showNotification('Ce n\'est pas le bon code... Réfléchis bien ! 💭');
      }
    });
  }

  /* =====================================================
     TIMERS EN TEMPS RÉEL
     ===================================================== */
  const dateDebut       = new Date('2025-04-24T00:00:00+02:00');
  const prochainEvent   = { month: 12, day: 24 };
  const ornellaBirthday = { month: 10, day: 25 };
  const aaronBirthday   = { month: 2,  day: 26 };

  function pad(n) { return String(n).padStart(2, '0'); }

  function formatDuration(ms) {
    if (ms <= 0) return '0j 0h 0m 0s';
    const days    = Math.floor(ms / 86400000); ms %= 86400000;
    const hours   = Math.floor(ms / 3600000);  ms %= 3600000;
    const minutes = Math.floor(ms / 60000);    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    return `${days}j ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  function getNextOccurrence(month, day) {
    const now  = new Date();
    let next   = new Date(now.getFullYear(), month - 1, day, 0, 0, 0);
    if (next <= now) next = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0);
    return next;
  }

  function updateTimers() {
    const now = new Date();
    const compteurEl = document.getElementById('compteur');
    if (compteurEl) compteurEl.textContent = formatDuration(now - dateDebut);
    const nextEventEl = document.getElementById('next-event');
    if (nextEventEl) nextEventEl.textContent = formatDuration(getNextOccurrence(prochainEvent.month, prochainEvent.day) - now);
    const ornellaEl = document.getElementById('ornella-birthday');
    if (ornellaEl) ornellaEl.textContent = formatDuration(getNextOccurrence(ornellaBirthday.month, ornellaBirthday.day) - now);
    const aaronEl = document.getElementById('aaron-birthday');
    if (aaronEl) aaronEl.textContent = formatDuration(getNextOccurrence(aaronBirthday.month, aaronBirthday.day) - now);
  }

  updateTimers();
  setInterval(updateTimers, 1000);

  /* =====================================================
     GALERIE LIGHTBOX avec navigation
     ===================================================== */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn    = document.querySelector('.lightbox__close');
  const prevBtn     = document.querySelector('.lightbox__prev');
  const nextBtn     = document.querySelector('.lightbox__next');
  const counterEl   = document.querySelector('.lightbox__counter');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  let currentIdx = 0;

  function openLightbox(idx) {
    if (!lightbox || !lightboxImg) return;
    currentIdx = idx;
    const img = galleryItems[idx].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.remove('hidden');
    if (counterEl) counterEl.textContent = `${idx + 1} / ${galleryItems.length}`;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function showNext() { openLightbox((currentIdx + 1) % galleryItems.length); }
  function showPrev() { openLightbox((currentIdx - 1 + galleryItems.length) % galleryItems.length); }

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn)  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    if (nextBtn)  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox || lightbox.classList.contains('hidden')) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft')  showPrev();
      if (e.key === 'Escape')     closeLightbox();
    });
  }

  /* =====================================================
     JEUX MULTI-ONGLETS
     ===================================================== */
  const gameTabs   = document.querySelectorAll('.game-tab');
  const gamePanels = document.querySelectorAll('.game-panel');

  if (gameTabs.length > 0) {
    gameTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        gameTabs.forEach(t => t.classList.remove('active'));
        gamePanels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.target);
        if (target) {
          target.classList.add('active');
          if (tab.dataset.target === 'quiz-game')   initQuizGame();
          if (tab.dataset.target === 'memory-game') initMemoryGame();
        }
      });
    });
    if (gameTabs[0]) gameTabs[0].click();
  }

  /* =====================================================
     JEU ATTRAPE-CŒURS
     ===================================================== */
  const gameArea   = document.getElementById('game-area');
  const player     = document.getElementById('player');
  const scoreDisp  = document.getElementById('score');
  const winMessage = document.getElementById('win-message');

  let gameScore = 0;
  let playerX   = 0;

  if (gameArea && player) {
    function initPlayer() {
      playerX = gameArea.offsetWidth / 2 - 28;
      player.style.left = playerX + 'px';
    }
    initPlayer();
    window.addEventListener('resize', initPlayer);

    document.addEventListener('keydown', (e) => {
      const panel = document.getElementById('hearts-game');
      if (panel && !panel.classList.contains('active')) return;
      if (e.key === 'ArrowLeft'  && playerX > 0) playerX -= 28;
      if (e.key === 'ArrowRight' && playerX < gameArea.offsetWidth - 56) playerX += 28;
      player.style.left = playerX + 'px';
    });

    let touchStartX = 0;
    gameArea.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    gameArea.addEventListener('touchmove', (e) => {
      const dx = e.touches[0].clientX - touchStartX;
      touchStartX = e.touches[0].clientX;
      playerX = Math.max(0, Math.min(gameArea.offsetWidth - 56, playerX + dx));
      player.style.left = playerX + 'px';
    }, { passive: true });

    function createFallingHeart() {
      const heart = document.createElement('div');
      heart.style.cssText = `
        position:absolute; top:-40px;
        font-size:1.8rem; pointer-events:none;
        animation: floatHeart 3.5s linear forwards;
        left:${Math.random() * (gameArea.offsetWidth - 32)}px;
      `;
      heart.textContent = '💖';
      gameArea.appendChild(heart);

      const check = setInterval(() => {
        if (!heart.parentElement) { clearInterval(check); return; }
        const hR = heart.getBoundingClientRect();
        const pR = player.getBoundingClientRect();
        if (hR.bottom >= pR.top && hR.left < pR.right && hR.right > pR.left && hR.top < pR.bottom) {
          gameScore++;
          if (scoreDisp) scoreDisp.textContent = 'Score : ' + gameScore;
          heart.remove(); clearInterval(check);
          if (gameScore >= 20 && winMessage) winMessage.classList.remove('hidden');
        }
        if (hR.top > gameArea.getBoundingClientRect().bottom) { heart.remove(); clearInterval(check); }
      }, 60);

      setTimeout(() => { if (heart.parentElement) { heart.remove(); clearInterval(check); } }, 4200);
    }

    setInterval(createFallingHeart, 1100);
  }

  /* =====================================================
     QUIZ D'AMOUR
     ===================================================== */
  function initQuizGame() {
    const quizGame = document.getElementById('quiz-game');
    if (!quizGame || quizGame.dataset.init) return;
    quizGame.dataset.init = '1';

    quizGame.innerHTML = `
      <h2 style="text-align:center;color:var(--rose);margin-bottom:var(--s3);font-family:'Dancing Script',cursive;font-size:2rem;">Quiz d'amour 💘</h2>
      <form id="quiz-form">
        <p style="color:var(--text-2);margin-bottom:var(--s2)"><strong>1. Quelle est la date de notre premier bisou ?</strong></p>
        <label class="quiz-option"><input type="radio" name="q1" value="24 avril"> 24 avril 💋</label>
        <label class="quiz-option"><input type="radio" name="q1" value="15 avril"> 15 avril</label>
        <label class="quiz-option"><input type="radio" name="q1" value="27 aout"> 27 août</label>
        <p style="color:var(--text-2);margin:var(--s3) 0 var(--s2)"><strong>2. Quel est notre mascotte préférée ?</strong></p>
        <label class="quiz-option"><input type="radio" name="q2" value="Monchhichi"> Monchhichi 🐵</label>
        <label class="quiz-option"><input type="radio" name="q2" value="Chat"> Chat 🐱</label>
        <label class="quiz-option"><input type="radio" name="q2" value="Lapin"> Lapin 🐰</label>
        <p style="color:var(--text-2);margin:var(--s3) 0 var(--s2)"><strong>3. Quand est l'anniversaire d'Ornella ?</strong></p>
        <label class="quiz-option"><input type="radio" name="q3" value="25 octobre"> 25 octobre 🎂</label>
        <label class="quiz-option"><input type="radio" name="q3" value="26 février"> 26 février</label>
        <label class="quiz-option"><input type="radio" name="q3" value="24 décembre"> 24 décembre</label>
        <button type="submit" class="btn btn-primary btn-lg" style="margin-top:var(--s3);width:100%;">Valider mes réponses ✨</button>
        <div id="quiz-result" style="display:none;margin-top:var(--s2);"></div>
      </form>
    `;

    document.getElementById('quiz-form').onsubmit = function(e) {
      e.preventDefault();
      let score = 0;
      if (this.q1.value === '24 avril')   score++;
      if (this.q2.value === 'Monchhichi') score++;
      if (this.q3.value === '25 octobre') score++;
      const res = document.getElementById('quiz-result');
      res.style.display = 'block';
      res.style.padding = 'var(--s2) var(--s3)';
      res.style.background = 'var(--rose)';
      res.style.color = 'white';
      res.style.borderRadius = 'var(--r-md)';
      res.style.fontWeight = '600';
      res.style.textAlign = 'center';
      if (score === 3) {
        res.textContent = '🎉 Parfait ! Tu es incollable sur notre amour ! 💖';
        createConfetti();
      } else {
        res.textContent = `Tu as eu ${score}/3. Réessaie ! 😊`;
      }
    };
  }

  /* =====================================================
     MEMORY GAME
     ===================================================== */
  function initMemoryGame() {
    const memGame = document.getElementById('memory-game');
    if (!memGame || memGame.dataset.init) return;
    memGame.dataset.init = '1';

    const hearts = ['💖','💗','❤️','💞','🧡','💜'];
    const deck   = [...hearts, ...hearts].sort(() => Math.random() - 0.5);

    memGame.innerHTML = `
      <h2 style="text-align:center;color:var(--rose);margin-bottom:var(--s2);font-family:'Dancing Script',cursive;font-size:2rem;">Memory cœur 🧠</h2>
      <p style="text-align:center;color:var(--text-2);margin-bottom:var(--s3)">Retrouve toutes les paires !</p>
      <div class="memory-grid" id="memory-cards"></div>
    `;

    const grid = document.getElementById('memory-cards');
    let first = null, second = null, canClick = true, pairs = 0;

    deck.forEach((symbol) => {
      const card = document.createElement('button');
      card.textContent = '❔';
      card.className = 'memory-card';
      card.dataset.value = symbol;

      card.addEventListener('click', function() {
        if (!canClick || this.disabled || this === first) return;
        this.textContent = symbol;
        this.classList.add('flipped');

        if (!first) {
          first = this;
        } else {
          second = this;
          canClick = false;
          setTimeout(() => {
            if (first.dataset.value === second.dataset.value) {
              first.disabled = second.disabled = true;
              first.style.opacity = second.style.opacity = '0.4';
              pairs++;
              if (pairs === hearts.length) {
                setTimeout(() => {
                  grid.innerHTML = '<p style="text-align:center;font-size:1.4rem;color:var(--rose);font-family:\'Dancing Script\',cursive;grid-column:1/-1;padding:var(--s4)">🎉 Bravo ! Toutes les paires trouvées ! 💕</p>';
                  createConfetti();
                }, 400);
              }
            } else {
              first.textContent = second.textContent = '❔';
              first.classList.remove('flipped');
              second.classList.remove('flipped');
            }
            first = second = null;
            canClick = true;
          }, 900);
        }
      });

      grid.appendChild(card);
    });
  }

  /* =====================================================
     LETTRE SECRÈTE (machine à écrire)
     ===================================================== */
  const letterEl = document.getElementById('secret-letter');

  if (letterEl) {
    const text = `Ma douce Miminella 🐵💖,

Chaque instant passé avec toi est un moment génial que je garde précieusement dans mon cœur.
Ton sourire illumine mes journées, et ton amour rend ma vie magique.

Je promets d'être toujours là pour toi, aujourd'hui, demain et pour toujours — surtout à jamais !
Tu es ma moitié que je recherchais depuis ma naissance et je t'ai enfin trouvée,
alors je ne vais plus te lâcher.
Tu es aussi et surtout, mon bonheur infini.

Ton MimiAaron 💕`;

    let i = 0;
    function typeNext() {
      if (i < text.length) {
        letterEl.textContent += text[i++];
        setTimeout(typeNext, 45);
      } else {
        setTimeout(triggerSurprise, 600);
      }
    }

    function triggerSurprise() {
      for (let k = 0; k < 30; k++) {
        setTimeout(() => {
          const h = document.createElement('div');
          h.className = 'falling-heart';
          h.textContent = ['❤️','💖','💞','💗'][Math.floor(Math.random() * 4)];
          h.style.left = Math.random() * 100 + 'vw';
          h.style.fontSize = (18 + Math.random() * 20) + 'px';
          document.body.appendChild(h);
          setTimeout(() => h.remove(), 5000);
        }, k * 180);
      }
      setTimeout(() => {
        const msg = document.createElement('div');
        msg.id = 'love-message';
        msg.textContent = 'Je t\'aime Miminella 💖';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 6500);
      }, 1200);
    }

    typeNext();
  }

  /* =====================================================
     PARTICULES DE FOND
     ===================================================== */
  const particlesBg = document.querySelector('.particles-bg');
  if (particlesBg) {
    for (let k = 0; k < 18; k++) {
      const p = document.createElement('div');
      const size = Math.random() * 8 + 4;
      p.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        background:var(--rose);
        opacity:${Math.random() * 0.18 + 0.04};
        border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation: float ${Math.random() * 12 + 8}s ease-in-out infinite;
        animation-delay:${Math.random() * 6}s;
      `;
      particlesBg.appendChild(p);
    }
  }

  /* =====================================================
     RETOUR EN HAUT
     ===================================================== */
  const backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.innerHTML = '↑';
  backBtn.setAttribute('aria-label', 'Retour en haut');
  document.body.appendChild(backBtn);

  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});

/* =====================================================
   NOTIFICATION HELPER (global)
   ===================================================== */
function showNotification(msg) {
  let notif = document.querySelector('.notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'notification';
    document.body.appendChild(notif);
  }
  notif.textContent = msg;
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 3500);
}

/* =====================================================
   CONFETTI (global)
   ===================================================== */
function createConfetti() {
  const colors = ['#d64f78','#f7a8c0','#c8973a','#fde8f0','#e87da0','#a18cd1'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left   = Math.random() * 100 + 'vw';
      c.style.top    = '-10px';
      c.style.width  = (6 + Math.random() * 8) + 'px';
      c.style.height = (6 + Math.random() * 8) + 'px';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
      c.style.animationDelay = (Math.random() * 0.5) + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3500);
    }, i * 25);
  }
}

function createSparkles() {
  const syms = ['⭐','✨','💫','🌟'];
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.textContent = syms[Math.floor(Math.random() * syms.length)];
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top  = (Math.random() * 50 + 40) + 'vh';
      s.style.fontSize = (1 + Math.random()) + 'rem';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 2200);
    }, i * 60);
  }
}

/* =====================================================
   ROULETTE CANVAS (shared by mots & defis)
   ===================================================== */
function initRouletteWheel(canvasId, items, storageKey, renderResult) {
  const canvas    = document.getElementById(canvasId);
  const spinBtn   = document.getElementById('spinBtn');
  const resultDiv = document.getElementById('result');
  if (!canvas || !spinBtn || !resultDiv) return;

  const ctx    = canvas.getContext('2d');
  const N      = items.length;
  const COLORS = [
    '#d64f78','#e87da0','#c8973a','#a18cd1','#e8b86d',
    '#8b5cf6','#c0415f','#d4875a','#7c6ab3','#e57090',
    '#b87a35','#9a58d0'
  ];

  let currentAngle = 0;

  function drawWheel(angle) {
    const W  = canvas.width;
    const cx = W / 2;
    const cy = W / 2;
    const r  = cx - 8;
    const slice = (2 * Math.PI) / N;

    ctx.clearRect(0, 0, W, W);

    for (let i = 0; i < N; i++) {
      const start = angle + i * slice;
      const end   = start + slice;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(start) * r, cy + Math.sin(start) * r);
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Emoji
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + slice / 2);
      ctx.textAlign = 'right';
      const fontSize = Math.max(14, Math.floor(r * 0.11));
      ctx.font = `${fontSize}px serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.shadowColor = 'rgba(0,0,0,0.25)';
      ctx.shadowBlur  = 4;
      const emoji = items[i].emoji || (items[i].type === 'bon' ? '🎁' : '💌');
      ctx.fillText(emoji, r - 14, 5);
      ctx.restore();
    }

    // Outer rim
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Center
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.15);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, '#f0f0f0');
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.15, 0, 2 * Math.PI);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = `${Math.floor(r * 0.12)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur   = 0;
    ctx.fillText('💖', cx, cy);
  }

  drawWheel(currentAngle);

  function canSpinToday() {
    const last = localStorage.getItem(storageKey);
    if (!last) return true;
    return new Date(last).toDateString() !== new Date().toDateString();
  }

  if (!canSpinToday()) {
    spinBtn.textContent = 'Reviens demain 💕';
    spinBtn.disabled    = true;
  }

  spinBtn.addEventListener('click', () => {
    if (spinBtn.disabled && canSpinToday()) return;
    if (!canSpinToday()) {
      resultDiv.innerHTML = `
        <div class="daily-limit-msg">
          <div style="font-size:2.5rem;margin-bottom:0.75rem">⏰</div>
          <div style="font-size:1.1rem;font-weight:700">Tu as déjà tourné la roue aujourd'hui !</div>
          <div style="font-size:0.9rem;margin-top:0.5rem;opacity:0.9">Reviens demain pour une nouvelle surprise 💖</div>
        </div>`;
      return;
    }

    spinBtn.disabled = true;
    resultDiv.innerHTML = '<div class="result-title">La roue tourne... 🎰</div><div class="result-text">Prépare-toi !</div>';

    const targetIdx    = Math.floor(Math.random() * N);
    const totalSpins   = 7 + Math.random() * 4;
    const slice        = (2 * Math.PI) / N;
    const targetAngle  = -(targetIdx * slice + slice / 2) - Math.PI / 2;
    const totalAngle   = Math.PI * 2 * totalSpins + (targetAngle - currentAngle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);

    const duration = 5500;
    const startTime  = performance.now();
    const startAngle = currentAngle;

    function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

    function animate(now) {
      const t = Math.min((now - startTime) / duration, 1);
      currentAngle = startAngle + totalAngle * easeOut(t);
      drawWheel(currentAngle);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        localStorage.setItem(storageKey, new Date().toISOString());
        resultDiv.innerHTML = renderResult(items[targetIdx]);
        spinBtn.textContent = '✅ À demain !';

        if (items[targetIdx].type === 'bon' || items[targetIdx].difficulty === 'hard') {
          createConfetti();
        } else {
          createSparkles();
        }
      }
    }

    requestAnimationFrame(animate);
  });
}

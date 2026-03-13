// Citations d'amour pour la page blog
const quotes = [
  "L'amour, c'est vouloir que l'autre soit heureux même si cela signifie que tu dois te sacrifier. 💖",
  "Tu es mon aujourd'hui et tous mes demains. ❤️",
  "Je t'aime plus qu'hier, moins que demain. 💕",
  "Aimer, c'est trouver sa richesse en autrui. 💞",
  "Le bonheur, c'est d'aimer et d'être aimé. 🌸",
  "Chaque instant passé à tes côtés est un cadeau. ✨",
  "Miminella, tu es la raison de mes sourires quotidiens. 🐵💖",
  "L'amour véritable ne se voit pas avec les yeux, mais avec le cœur. 💗",
  "Tu es mon port d'attache dans la tempête de la vie. ⚓️",
  "Avec toi, même les jours difficiles semblent plus doux. 🌷",
  "Je n'ai pas besoin du paradis si j'ai toi. 💖",
  "Deux âmes avec une seule pensée, deux cœurs qui ne battent qu'en un. 💞",
  "Tu es mon soleil quand les nuages envahissent mon ciel. ☀️",
  "L'amour est la poésie des sens. 💝",
  "Chaque jour à tes côtés est une nouvelle page de notre belle histoire. 📖",
  "Mon cœur sourit chaque fois que je pense à toi. 💖",
  "Tu es la meilleure chose qui me soit arrivée. 🌟",
  "Dans tes yeux, j'ai trouvé ma maison. 🏠",
  "L'amour ne se voit pas, il se ressent. 💕",
  "Tu es mon éternité préférée. ♾️",
  "Tomber amoureux de toi est la plus belle chute libre. 🪂",
  "Je t'aime — ces trois mots, c'est tout ce dont j'ai besoin. 💖",
  "Même séparés, nos cœurs battent à l'unisson. 🤍",
  "Chaque nuit je te souhaite bonne nuit, chaque matin tu es mes premières pensées. 🌙",
  "La distance ne fait que rendre notre amour plus fort. 💪❤️"
];

let currentQuoteIndex = -1;

function getDailyQuote() {
  const day = Math.floor(Date.now() / 86400000);
  return quotes[day % quotes.length];
}

function getRandomQuote() {
  let idx;
  do { idx = Math.floor(Math.random() * quotes.length); } while (idx === currentQuoteIndex);
  currentQuoteIndex = idx;
  return quotes[idx];
}

function refreshQuote() {
  const el = document.getElementById('daily-quote-text');
  if (!el) return;
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';
  setTimeout(() => {
    el.textContent = getRandomQuote();
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 320);
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('daily-quote-text');
  if (el) {
    const q = getDailyQuote();
    currentQuoteIndex = quotes.indexOf(q);
    el.textContent = q;
  }
});

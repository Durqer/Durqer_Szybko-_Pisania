const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Lista słów do gry
const words = [
  'znak',
  'tenis',
  'samolot',
  'piłka',
  'pies',
  'sok',
  'wojna',
  'śpioch',
  'minecraft',
  'depresja',
  'karabin',
  'ster',
  'srebny',
  'wysokość',
  'noobek',
  'szybko',
  'osiem',
  'pędzel',
  'admin',
  'boss',
  'discord',
  'durqer',
  'youtube',
  'dragi',
  'papieros',
  'pistolet',
  'gaz',
  'gedz',
  'rolex',
  'bmw',
  'sobel',
  'audi',
  'mercedes',
  'fivem',
  'lotto',
  'hazard',
  'lambo',
  'życie',
  'skype',
  'szkoła',
  'dom',
  'praca',
  'budda',
  'komentarz',
  'intro',
  'czarny',
  'biały',
  'czerwony',
  'żółty',
  'fioletowy',
  'miłość'
];


let randomWord;

// Wynik Początkowy
let score = 0;

// Czas początkowy
let time = 12;

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';


text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // Koniec Gry
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1> Skonczył Sie Czas ⏲ </h1>
    <p>Twój Rekord : ${score}</p>
    <button onclick="location.reload()">Jeszcze Raz</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

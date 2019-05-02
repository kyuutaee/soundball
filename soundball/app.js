const soundsElement = document.querySelector('#sounds');
const stopButton = document.querySelector('#stopButton');
const players = [];
let sounds = [];
let interval;
const keyCodes = [65, 83, 68, 70, 72, 74, 75, 76];

stopButton.addEventListener('click', stopAll);

(async () => {
  const sounds = await getSounds();
  addSoundsToPage(sounds);
})();

async function getSounds() {
  const response = await fetch('./sounds.json');
  const json = await response.json();
  return json;
}

function addSoundsToPage(sounds) {
  sounds.forEach(addSoundToPage);

  listenKeyPress();
}

function addSoundToPage(sound, index) {
  const soundDiv = document.createElement('div');
  soundDiv.className = 'sound';
  const soundTitle = document.createElement('h2');
  soundTitle.textContent = sound.title;
  soundDiv.appendChild(soundTitle);

  const key = document.createElement('section');
  key.setAttribute('src', `sound`);
  soundDiv.appendChild(key);

  const player = document.createElement('audio');
  player.setAttribute('src', `sounds/${sound.src}`);
  soundDiv.appendChild(player);
  players.push({ player, soundDiv, key });

  soundDiv.addEventListener('mousedown', () => {
    soundPress(soundDiv, player);
  });

  soundDiv.addEventListener('mouseup', () => {
    soundDiv.style.background = '';
  });

  soundsElement.appendChild(soundDiv);
}

function soundPress(div, player) {
  div.style.background = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
  player.currentTime = 0;
  player.play();

  sounds.push(player.getAttribute('src'));
}

function listenKeyPress() {
  document.addEventListener('keydown', event => {
    if (event.keyCode == 32) return stopAll();
    const playerIndex = keyCodes.indexOf(event.keyCode);
    const playerAndDiv = players[playerIndex];
    if (playerAndDiv && !playerAndDiv.keydown) {
      playerAndDiv.keydown = true;
      playerAndDiv.key.style.transform = 'scaleY(0.75)';

      soundPress(playerAndDiv.soundDiv, playerAndDiv.player);
      balls.push(new Ball(x, y, Math.floor(Math.random() * 10 + 20)));
    }
  });

  document.addEventListener('keyup', event => {
    const playerIndex = keyCodes.indexOf(event.keyCode);
    const playerAndDiv = players[playerIndex];
    if (playerAndDiv) {
      playerAndDiv.soundDiv.style.background = '';
      playerAndDiv.keydown = false;
      playerAndDiv.key.style.transform = '';
    }
  });
}

function stopAll() {
  players.forEach(({ player }) => {
    player.pause();
    balls = [];
    sounds = [];
    localStorage.setItem('sounds',null);
    clearInterval(interval);
  });
}

function save() {
  const saved = [];
  for (let i = 0; i < balls.length; i++) {
    saved.push({ x: balls[i].x, y: balls[i].y, radius: balls[i].radius });
  }
  localStorage.setItem('balls', JSON.stringify(saved));

  localStorage.setItem('sounds', JSON.stringify(sounds));
}

function playback() {
  const saved = JSON.parse(localStorage.getItem('balls'));
  balls = [];
  for (let i = 0; i < saved.length; i++) {
    balls.push(new Ball(saved[i].x, saved[i].y, saved[i].radius));
  }

  const savedSounds = JSON.parse(localStorage.getItem('sounds'));

  // eslint-disable-next-line no-var
  var count = 0;
   interval = setInterval(() => {
    console.log(count, savedSounds.length);
    if (count < savedSounds.length) {
      const audio = new Audio(savedSounds[count]);
      audio.play();
      count++;
    } else {
      clearInterval(interval);
    }
  }, 750);
}

document.querySelector('.save').addEventListener('click', () => {
  save();
});

document.querySelector('.back').addEventListener('click', () => {
  playback();
});

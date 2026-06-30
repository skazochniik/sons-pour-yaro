const tracks = [
  {
    playerTitle: "‿̩͙⊱༻♡༺⊰‿̩͙",
    title: "мяцмяцмяц мяуууууууууууууууу",
    tag: "легендарный",
    file: "audio/1.mp3"
  },
  {
    playerTitle: "₊˚⊹♡⋆.𐙚 ̊",
    title: "мяу мяу мяу мяу мяу",
    tag: "вайбовый",
    file: "audio/2.mp3"
  },
  {
    playerTitle: "⋆.˚𓇼⋆.˚｡𖦹°🫧⋆.ೃ࿔",
    title: "и и икххх",
    tag: "жёсткий",
    file: "audio/3.mp3"
  },
  {
    playerTitle: "₊˚ෆ⊹₊ ⋆",
    title: "мяу мяу мяууууу",
    tag: "секретный",
    file: "audio/4.mp3"
  },
  {
    playerTitle: "˚* ੈ✩‧₊💗* ੈ✩‧₊˚*",
    title: "хэлл на",
    tag: "мемный",
    file: "audio/5.mp3"
  },
  {
    playerTitle: ".・。.・゜✭・.・✫・゜・。",
    title: "мяу или мяу",
    tag: "мемный",
    file: "audio/6.mp3"
  },
  {
    playerTitle: "𖦹°‧★*ੈ✩‧₊˚✩",
    title: "бедный бисквит",
    tag: "мемный",
    file: "audio/7.mp3"
  },
  {
    playerTitle: "˚♡˚‧⁺༄",
    title: "хь мимимим",
    tag: "мемный",
    file: "audio/8.mp3"
  },
  {
    playerTitle: "🫧𓇼𓏲*ੈ✩‧₊˚🎐",
    title: "бисквичьи карманы",
    tag: "мемный",
    file: "audio/9.mp3"
  }
];

const tracksList = document.querySelector("#tracksList");
const tracksCount = document.querySelector("#tracksCount");

tracksCount.textContent = tracks.length;

function formatTime(seconds) {
  if (isNaN(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function stopOtherTracks(currentAudio, currentButton) {
  const allAudios = document.querySelectorAll(".track-audio");
  const allButtons = document.querySelectorAll(".play-btn");

  allAudios.forEach((audio) => {
    if (audio !== currentAudio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });

  allButtons.forEach((button) => {
    if (button !== currentButton) {
      button.textContent = "▶";
    }
  });

  document.querySelectorAll(".player-progress").forEach((slider) => {
    const audio = slider.closest(".track-card").querySelector(".track-audio");

    if (audio !== currentAudio) {
      slider.value = 0;
    }
  });

  document.querySelectorAll(".screen-time").forEach((time) => {
    const audio = time.closest(".track-card").querySelector(".track-audio");

    if (audio !== currentAudio) {
      time.textContent = "0:00";
    }
  });
}

tracks.forEach((track, index) => {
  const card = document.createElement("article");
  card.className = "track-card";

  const eqBars = Array.from({ length: 12 }, () => {
    return `<span class="eq-bar"></span>`;
  }).join("");

  card.innerHTML = `
    <div class="player-titlebar">
      <span>${track.playerTitle}</span>

      <div class="player-window-buttons">
        <span>–</span>
        <span>□</span>
        <span>×</span>
      </div>
    </div>

    <div class="player-screen">
      <div class="player-screen-top">
        <div class="screen-time">0:00</div>

        <div class="screen-meta">
          KBPS: 128<br>
          MP3 STEREO
        </div>
      </div>

      <div class="marquee-wrap">
        <div class="marquee-text">${track.title}</div>
      </div>

      <div class="eq-row">
        ${eqBars}
      </div>
    </div>

    <div class="player-progress-wrap">
      <input class="player-progress" type="range" min="0" max="100" value="0" />
    </div>

    <div class="player-controls">
      <button class="control-btn prev-btn" type="button">⏮</button>
      <button class="control-btn large play-btn" type="button">▶</button>
      <button class="control-btn stop-btn" type="button">■</button>

      <div class="volume-wrap">
        <div class="volume-label">volume</div>
        <input class="volume-slider" type="range" min="0" max="1" step="0.01" value="1" />
      </div>
    </div>

    <div class="track-actions">
      <a class="player-link" href="${track.file}" download>télécharger</a>
    </div>

    <audio class="track-audio" src="${track.file}"></audio>
  `;

  const audio = card.querySelector(".track-audio");
  const playBtn = card.querySelector(".play-btn");
  const stopBtn = card.querySelector(".stop-btn");
  const prevBtn = card.querySelector(".prev-btn");
  const timeDisplay = card.querySelector(".screen-time");
  const progress = card.querySelector(".player-progress");
  const volume = card.querySelector(".volume-slider");

  playBtn.addEventListener("click", () => {
    stopOtherTracks(audio, playBtn);

    if (audio.paused) {
      audio.play();
      playBtn.textContent = "Ⅱ";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  });

  stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;

    playBtn.textContent = "▶";
    progress.value = 0;
    timeDisplay.textContent = "0:00";
  });

  prevBtn.addEventListener("click", () => {
    audio.currentTime = 0;
    progress.value = 0;
    timeDisplay.textContent = "0:00";
  });

  volume.addEventListener("input", () => {
    audio.volume = volume.value;
  });

  audio.addEventListener("loadedmetadata", () => {
    if (!isNaN(audio.duration)) {
      progress.max = Math.floor(audio.duration);
    }
  });

  audio.addEventListener("timeupdate", () => {
    timeDisplay.textContent = formatTime(audio.currentTime);

    if (!isNaN(audio.duration)) {
      progress.max = Math.floor(audio.duration);
      progress.value = Math.floor(audio.currentTime);
    }
  });

  progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
  });

  audio.addEventListener("ended", () => {
    playBtn.textContent = "▶";
    progress.value = 0;
    timeDisplay.textContent = "0:00";
  });

  audio.addEventListener("pause", () => {
    if (!audio.ended) {
      playBtn.textContent = "▶";
    }
  });

  tracksList.appendChild(card);
});

const heroRandomBtn = document.querySelector("#heroRandomBtn");

if (heroRandomBtn) {
  heroRandomBtn.addEventListener("click", () => {
    const cards = document.querySelectorAll(".track-card");

    if (cards.length === 0) return;

    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomCard = cards[randomIndex];

    randomCard.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    randomCard.classList.add("shake");

    setTimeout(() => {
      randomCard.classList.remove("shake");
    }, 500);
  });
}

const gifBtn = document.querySelector("#gifBtn");
const gifOverlay = document.querySelector("#gifOverlay");

if (gifBtn && gifOverlay) {
  gifBtn.addEventListener("click", () => {
    gifOverlay.classList.add("is-open");
  });

  gifOverlay.addEventListener("click", () => {
    gifOverlay.classList.remove("is-open");
  });
}
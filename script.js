const image = document.querySelector('img');
const title = document.getElementById('title');
const album = document.getElementById('album');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
  {
    name: 'song1',
    displayName: 'Vaathi Coming',
    album: 'Master',
  },
  {
    name: 'song2',
    displayName: 'Kutti Story',
    album: 'Master',
  },
  {
    name: 'song3',
    displayName: 'Master the Blaster',
    album: 'Master',
  },
  {
    name: 'song4',
    displayName: 'Vaathi kabbadi',
    album: 'Master',
  },
  {
    name: 'song5',
    displayName: 'Beast BGM',
    album: 'Beast',
  }, 
  {
    name: 'song6',
    displayName: 'Quit Pannuda',
    album: 'Master',
  },
];

function loadSong(song) {
  title.textContent = song.displayName;
  album.textContent = song.album;
  music.src = `music/${song.name}.mp3`;
  image.src = `image/${song.name}.jpg`;
}

let songIndex = 0;
// loads the first song by default.
loadSong(songs[songIndex]);


function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Functions for pausing or playing the song.

let isPlaying = false;
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Event Listener for play (or) pause button, based on current state of the song.
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


function updateProgressBar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    // Updates the progress bar based on the progressPercent of the song.
    progress.style.width = `${progressPercent}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Updates progress bar based on the fast-forward position of the song.
function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

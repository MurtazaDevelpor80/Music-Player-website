const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const rewindButton = document.getElementById('rewind');
const forwardButton = document.getElementById('forward');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');

let isPlaying = false;
let currentSongIndex = 0;

// Song data (you can add multiple songs here)
const songs = [
    { title: "Dhanak", artist: "HYDRA", file: "song1.mp3" },
    { title: "The Sky full of star", artist: "Coldplay", file: "song2.mp3" },
    { title: "Supreme", artist: "Naseeb", file: "song3.mp3" }
];

// Load the song details
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.file;
}

// Play or Pause the song
function playPauseSong() {
    if (isPlaying) {
        audio.pause();
        playButton.textContent = 'Play';
    } else {
        audio.play();
        playButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

// Play the previous song
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playButton.textContent = 'Pause';
    isPlaying = true;
}

// Play the next song
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playButton.textContent = 'Pause';
    isPlaying = true;
}

// Rewind the current song by 5 seconds
function rewindSong() {
    audio.currentTime -= 5;
}

// Fast forward the current song by 5 seconds
function forwardSong() {
    audio.currentTime += 5;
}

// Format time in mm:ss format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update progress bar and time display
function updateProgressBar() {
    const { currentTime, duration } = audio;
    progressBar.value = (currentTime / duration) * 100;
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(duration);
}

// Seek to different parts of the song
function setProgress(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playButton.addEventListener('click', playPauseSong);
prevButton.addEventListener('click', playPrevSong);
nextButton.addEventListener('click', playNextSong);
rewindButton.addEventListener('click', rewindSong);
forwardButton.addEventListener('click', forwardSong);

// Update progress bar as the song plays
audio.addEventListener('timeupdate', updateProgressBar);

// Set the progress bar to the correct position when clicked
progressBar.addEventListener('input', (e) => {
    const duration = audio.duration;
    audio.currentTime = (progressBar.value * duration) / 100;
});

// When the song metadata is loaded, display the total duration
audio.addEventListener('loadedmetadata', () => {
    totalTimeDisplay.textContent = formatTime(audio.duration);
});

// Load the first song by default
loadSong(songs[currentSongIndex]);

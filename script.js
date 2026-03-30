
// transcribe of text source: https://spotscribe.io/podcasts/episode/51613591711
// example of transcrips in js using vtt files - https://james.cridland.net/blog/2025/html-audio-player-with-captions/
const audio = document.getElementById('podcast-audio');
const transcript = document.getElementById('podcast-transcript');

audio.textTracks[0].mode='showing';

audio.addEventListener('play', () => {
    transcript.style.display='block';

    audio.textTracks[0].addEventListener('cuechange', function () {
        transcript.innerText = this.activeCues[0].text;
    });
});
// transcribe of text source: https://spotscribe.io/podcasts/episode/51613591711
// example of transcrips in js using vtt files - https://james.cridland.net/blog/2025/html-audio-player-with-captions/
// const audio = document.getElementById('podcast-audio');
// const transcript = document.getElementById('podcast-transcript');

// audio.textTracks[0].mode='showing';
// transcript.style.display='block';

// audio.addEventListener('play', () => {

//     audio.textTracks[0].addEventListener('cuechange', function () {
//         transcript.innerText = this.activeCues[0].text;
//     });

//     switchSpeaker()
// });

const audio = document.getElementById('podcast-audio');
const transcript = document.getElementById('podcast-transcript');

audio.addEventListener('loadedmetadata', () => {
    const track = audio.textTracks[0];
    
    track.mode = 'hidden';

    track.addEventListener('cuechange', () => {

        if (track.activeCues.length > 0) {
            const cue = track.activeCues[0];
            const text = cue.text;

            transcript.innerHTML = text;

            if(text.includes('.music-playing')){
                transcript.style.setProperty('color', '#fff');
            }
            else {
                transcript.style.setProperty('color', '#000' )
            }
            if(text.includes('.scream')) {
                transcript.style.setProperty('font-size', '10em')
            }
            else {
                transcript.style.setProperty('font-size', '2em')
            }

            switchSpeaker(text);
        }
    })
})

function switchSpeaker(text) {

    const people = document.querySelectorAll('.speaker')
    const person1 = document.getElementById('speaker-1')
    const person2 = document.getElementById('speaker-2')
    const person3 = document.getElementById('speaker-3')

    people.forEach(p => 
        p.classList.remove('active')
    )

    if (text.includes('Jason Bateman')) {
        person1.classList.add('active')
    }

    if (text.includes('Sean Hayes')) {
       person2.classList.add('active')
    }
    

    if (text.includes('Will Arnett')) {
       person3.classList.add('active')
    }
}
// transcribe of text source: https://spotscribe.io/podcasts/episode/51613591711
// example of transcrips in js using vtt files - https://james.cridland.net/blog/2025/html-audio-player-with-captions/

const audio = document.getElementById('podcast-audio');
const transcript = document.getElementById('podcast-transcript');

audio.addEventListener('loadedmetadata', () => {
    const track = audio.textTracks[0];
    
    track.mode = 'hidden';

    track.addEventListener('cuechange', () => {

        if (track.activeCues.length > 0) {
            const cue = track.activeCues[0];
            const text = cue.text;

            // Bron (AI), prompt: "is it possible to edit one specific word of a que in the vtt document? So I want to adit the word giggle in the vtt, how do I edit the with either js or css"
            // hieronder het antwoord van AI, verplaatst een woord van vtt met hetzelfde maar dan een class, waardoor ik het kan stylen
            let formattedText = text;

            formattedText = formattedText
            .replace (
                /\bbest\b/i,
                `<span class="best">best</span>`
            )
            .replace (
                /\bgiggle\b/i,
                `<span class="giggle">giggle</span>`,
            )
            .replace (
                /\bShut up\b/i,
                `<span class="shut-up">Shut up</span>`
            )

            transcript.innerHTML = formattedText;

            // Met behulp van Diego bedacht en geschreven, hiermee stijl ik de transcriptie op het moment dat de aangegeven class in het vtt bestand zit.  
            if(text.includes('.music-playing')){
                transcript.classList.add('intro-animation');
            }
            else {
                transcript.classList.remove('intro-animation');
            }
            // if(text.includes('.scream')) {
            //     transcript.style.setProperty('font-size', '10em')
            // }
            // else {
            //     transcript.style.setProperty('font-size', '2em')
            // }

            switchSpeaker(text);
        }
    })
})

// Style profiles based on who is talking
function switchSpeaker(text) {

    const people = document.querySelectorAll('.speaker')
    const person1 = document.getElementById('speaker-1')
    const person2 = document.getElementById('speaker-2')
    const person3 = document.getElementById('speaker-3')

    people.forEach(p => 
        p.classList.remove('active')
    )

    if (text.includes('Jason:')) {
        person1.classList.add('active')
    }

    if (text.includes('Sean:')) {
       person2.classList.add('active')
    }

    if (text.includes('Will:')) {
       person3.classList.add('active')
    }
}
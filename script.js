// transcribe of text source: https://spotscribe.io/podcasts/episode/51613591711
// example of transcrips in js using vtt files - https://james.cridland.net/blog/2025/html-audio-player-with-captions/

const audio = document.getElementById('podcast-audio');
const transcript = document.getElementById('podcast-transcript');
const nextTranscript = document.getElementById('next-transcript');
const prevTranscript = document.getElementById('prev-transcript');

const transcriptContainer = document.querySelector('.transcript-container');

const textBar = document.getElementById('text-progress');

const vynilPng = document.querySelector('.vynil-png');

audio.addEventListener('loadedmetadata', () => {
    const track = audio.textTracks[0];
    
    // verstopt ingebouden captions
    track.mode = 'hidden';

    track.addEventListener('cuechange', () => {
        
        const allCues = track.cues;

        if (track.activeCues.length > 0) {
            const currentCue = track.activeCues[0];
            // Word gebruikt voor de "nextTranscription" functie.
            // Maakt een Array van de allCues const en zoekt in de array naar de currentCue.
            // Met hulp van Diego gemaakt, verdere uitleg nog door AI.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
            const currentIndex = Array.from(allCues).indexOf(currentCue);

            let text = currentCue.text;

            // Bron (AI), prompt: "is it possible to edit one specific word of a que in the vtt document? So I want to adit the word giggle in the vtt, how do I edit the with either js or css"
            // hieronder het antwoord van AI, verplaatst een woord van vtt met hetzelfde maar dan een class, waardoor ik het kan stylen
            let formattedText = text;

            formattedText = formattedText
            .replace (/\bbest\b/i, `<span class="best">best</span>`)
            .replace (/\bold\b/i, `<span class="old">old</span>`)
            .replace (/\bflexible\b/i, `<span class="flexible">flexible</span>`)
            .replace (/\bgiggle\b/i, `<span class="giggle">giggle</span>`)
            .replace (/\bShut up\b/i, `<span class="shut-up">Shut up</span>`)

            transcript.classList.add('fade-out');

            // http://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
            setTimeout(() => {
                transcript.innerHTML = formattedText;
                transcript.classList.remove('fade-out');

            }, 150);

            // Functie geschreven met hulp van AI. Checked bij de if statement of er een caption na de huidige is. 
            // Als dat zo is plaats het de huidige caption + 1 (dus de volgende) als tekst in netTranscript
            // Prompt, samen met mijn code gestuurd: I'm making a podcast site for someone that is deaf. In the transcriptions I want to showcase the upcoming transcript. 
            if (currentIndex < allCues.length - 1 ) {
                nextTranscript.innerHTML = allCues[currentIndex + 1].text;
            } else {
                nextTranscript.innerHTML = "";
            }

            // previous transcript
            if (currentIndex > 0 ) {
                prevTranscript.innerHTML = allCues[currentIndex - 1].text;
            } else {
                prevTranscript.innerHTML = "";
            }

            // timer progress bar
            const duration = currentCue.endTime - currentCue.startTime;

            textBar.style.transition = 'none';
            textBar.style.width = '0%';

            textBar.offsetHeight;

            textBar.style.transition = `width ${duration}s linear`;
            textBar.style.width = '100%';

            // Met behulp van Diego bedacht en geschreven, hiermee stijl ik de transcriptie op het moment dat de aangegeven class in het vtt bestand zit.
            // Nadeel hiervan kan geen losse woorden stylen 
            if(text.includes('.music-playing')){
                transcript.classList.add('intro-animation');
                transcriptContainer.classList.add('color-change');
            }
            else {
                transcript.classList.remove('intro-animation');
                transcriptContainer.classList.remove('color-change');
            }

            switchSpeaker(text);
        }
    });

    audio.addEventListener('play', () => {
        vynilPng.classList.add('rotate');
        
        // progress bar text timer
        if (track.activeCues.length > 0) {
            const currentCue = track.activeCues[0];
            const remaingDuration = currentCue.endTime - audio.currentTime; 

            textBar.style.transition = `width ${remaingDuration}s linear`;
            textBar.style.width = '100%';
        }
    });

    audio.addEventListener('pause', () => {
        vynilPng.classList.remove('rotate');
        const currentTextBarWidth = getComputedStyle(textBar).width;
        textBar.style.transition = 'none';
        textBar.style.width = currentTextBarWidth;
    });

    // changing text size
    const slider = document.querySelector('.font-size-slider');

    slider.addEventListener('input', () => {
        const fontSize = slider.value;
        transcript.style.fontSize = `${fontSize}px`;
    });

    // removing sections of website
    const speakersContainer = document.querySelector('.speaker-section');
    const removeSpeaker = document.getElementById('settings-speakers');

    removeSpeaker.addEventListener('change', function() {
        if(this.checked) {
            speakersContainer.style.display = "none";
        } else {
            speakersContainer.style.display = "flex";
        }
    });

    const detailsContainer = document.querySelector('.about-podcast');
    const removeDetails = document.getElementById('settings-details');

    removeDetails.addEventListener('change', function () {
        if(removeDetails.checked) {
            detailsContainer.style.display = "none";
        } else {
            detailsContainer.style.display = "flex";
        }
    });

    const barContainer = document.querySelector('.text-progress-container');
    const removeBar = document.getElementById('settings-bar');

    removeBar.addEventListener('change', function () {
        if(removeBar.checked) {
            barContainer.classList.add('hidden');
        } else {
            barContainer.classList.remove('hidden');
        }
    });

    const bigTranscriptContainer = document.querySelector('.podcast')
    document.body.addEventListener('change', function () {
        if(removeDetails.checked && removeSpeaker.checked) {
            bigTranscriptContainer.classList.add('transcript-container-max-width')
        } else {
            bigTranscriptContainer.classList.remove('transcript-container-max-width')
        }
    });

    document.body.addEventListener('change', function () {
        // easter egg
        if(slider.value == 30 && removeDetails.checked && removeSpeaker.checked) {
            document.body.classList.add('spin-easter-egg');
        } else {
            document.body.classList.remove('spin-easter-egg');
        }
    });
});

// Style profiles based on who is talking
function switchSpeaker(text) {

    const people = document.querySelectorAll('.speaker');
    const person1 = document.getElementById('speaker-1');
    const person2 = document.getElementById('speaker-2');
    const person3 = document.getElementById('speaker-3');

    people.forEach( p => 
        p.classList.remove('active')
    );

    if (text.includes('Jason:')) {
        person1.classList.add('active');
    };

    if (text.includes('Sean:')) {
       person2.classList.add('active');
    };

    if (text.includes('Will:')) {
       person3.classList.add('active');
    };
}
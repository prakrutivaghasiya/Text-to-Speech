// Init SpeechSynth API
const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rate = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitch = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');
const body = document.querySelector('body');

// Init voices array
let voices = [];

function getVoices(){
    voices = synth.getVoices();
    
    // Creating option for each voice in select!
    voices.forEach(voice => {
        const option = document.createElement('option');

        option.textContent = voice.name + '(' + voice.lang + ')';

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        voiceSelect.appendChild(option);
    });
}

getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

function speak(){
    // check if already speaking
    if(synth.speaking){
        console.error('Already Speaking...');
        return;
    }
    if(textInput.value !== ''){

        // Add background Animation
        body.style.background = '#141414 url("wave.gif")';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100%';

        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e => {
            body.style.background = '#022a38';
            console.log('Done Speaking...');
        }

        speakText.onerror = e => {
            console.error('Something went wrong!');
        }

        // Selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices to get voice
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        synth.speak(speakText);
    }
}

// Events

// Form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

// Pitch change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// Voice change from select option
voiceSelect.addEventListener('change', e => speak());
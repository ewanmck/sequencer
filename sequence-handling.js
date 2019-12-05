// look at Tone.js for sequence handling
const context = new AudioContext();
let samplesArray = [null, null, null, null, null, null, null, null];
let filepathArray = [null, null, null, null, null, null, null, null];
let bufferArray = [null, null, null, null, null, null, null, null];

async function getFile(audioContext, filepath) {
    // fetch(filepath) currently tries to pull from a url, might want to just
    // load directly as a file from a seperate dir
    let response = await fetch(filepath);
    let arrayBuffer = await response.arrayBuffer();
    let audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

async function setupSample(filePath) {
    let sample = await getFile(context, filePath);
    return sample;
}

// define function that takes
const handleSampleSetup = async function (event) {
    if(trackSelection != null && soundSelection != null){
        console.log(currLibraryButton)
        console.log(soundSelection);
        let filepath = libraryData[currLibraryButton.text()][soundSelection];
        filepathArray[trackSelection-1] = filepath;
        setupSample(filepath).then((sample) => {
            bufferArray[trackSelection-1] = sample;
            console.log(sample);
            // let sampleNode = context.createBufferSource();
            // sampleNode.buffer = sample;
            // sampleNode.connect(context.destination);
            // samplesArray[trackSelection-1] = sampleNode;
        });
    }
}

async function remakeSample(location) {
    setupSample(filepathArray[location]).then((sample) => {
        let sampleNode = context.createBufferSource();
        sampleNode.buffer = sample;
        sampleNode.connect(context.destination);
        samplesArray[trackSelection-1] = sampleNode;
    });
}

function playSample(audioContext, audioBuffer) {
    console.log("playing");
    let sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination);
    sampleSource.start();
    return sampleSource;
}

let tempo = 120.0;
const bpmControl = $('#bpm');
bpmControl.on('input', function() {
    tempo = Number(this.value);
}, false);

let lookahead = 25.0;
let scheduleAheadTime = 0.1;

let currentNote = 0;
let nextNoteTime = 0.0;

function nextNote() {
    const secondsPerBeat = 120.0 / tempo;

    nextNoteTime += secondsPerBeat;

    currentNote++;
    if (currentNote === 16) {
            currentNote = 0;
    }
}

const padsInQueue = [];

function scheduleNote(beatNumber, time) {

    beatNumber += 1;
    console.log(beatNumber)
    // push the note on the queue, even if we're not playing.
    padsInQueue.push({ note: beatNumber, time: time });

    // add functionality that checks if a track is muted to skip over the sample

    if (track1Toggles[beatNumber] == true && bufferArray[0] != null) {
        playSample(context, bufferArray[0]);
    }
    if (track2Toggles[beatNumber] == true && bufferArray[1] != null) {
        playSample(context, bufferArray[1]);
    }
    if (track3Toggles[beatNumber] == true && bufferArray[2] != null) {
        playSample(context, bufferArray[2]);
    }
    if (track4Toggles[beatNumber] == true && bufferArray[3] != null) {
        playSample(context, bufferArray[3]);
    }
    if (track5Toggles[beatNumber] == true && bufferArray[4] != null) {
        playSample(context, bufferArray[4]);
    }
    if (track6Toggles[beatNumber] == true && bufferArray[5] != null) {
        playSample(context, bufferArray[5]);
    }
    if (track7Toggles[beatNumber] == true && bufferArray[6] != null) {
        playSample(context, bufferArray[6]);
    }
    if (track8Toggles[beatNumber] == true && bufferArray[7] != null) {
        playSample(context, bufferArray[7]);
    }

}

const scheduler = function() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    console.log("started");
    while (nextNoteTime < context.currentTime + scheduleAheadTime ) {
        scheduleNote(currentNote, nextNoteTime);
        nextNote();
    }
    // timerID = window.setTimeout(scheduler, lookahead);
}

$(document).ready(function () {
    $(".submission").on("click", handleSampleSetup);
    $(".play").on("click", scheduler);
})

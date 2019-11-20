
const context = new AudioContext();
let samplesArray = [null, null, null, null, null, null, null, null];

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
        let filepath = libraryData[currLibraryButton][soundSelection];
        setupSample(filepath).then((sample) => {
            let sampleNode = context.createBufferSource();
            sampleNode.buffer = sample;
            sampleNode.connect(context.destination);
            samplesArray[trackSelection-1] = sampleNode;
        });
    }
}

function playSample(audioContext, audioBuffer) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination)
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
    // push the note on the queue, even if we're not playing.
    notesInQueue.push({ note: beatNumber, time: time });

    // add functionality that checks if a track is muted to skip over the sample

    if (track1Toggles[beatNumber] == true && samplesArray[0] != null) {
        samplesArray[0].start();
    }
    if (track2Toggles[beatNumber] == true && samplesArray[1] != null) {
        samplesArray[1].start();
    }
    if (track3Toggles[beatNumber] == true && samplesArray[2] != null) {
        samplesArray[2].start();
    }
    if (track4Toggles[beatNumber] == true && samplesArray[3] != null) {
        samplesArray[3].start();
    }
    if (track5Toggles[beatNumber] == true && samplesArray[4] != null) {
        samplesArray[4].start();
    }
    if (track6Toggles[beatNumber] == true && samplesArray[5] != null) {
        samplesArray[5].start();
    }
    if (track7Toggles[beatNumber] == true && samplesArray[6] != null) {
        samplesArray[6].start();
    }
    if (track8Toggles[beatNumber] == true && samplesArray[7] != null) {
        samplesArray[7].start();
    }
    
}

function scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
        scheduleNote(currentNote, nextNoteTime);
        nextNote();
    }
    // timerID = window.setTimeout(scheduler, lookahead);
}

$(document).ready(function () {
    $(".submission").on("click", handleSampleSetup);
})

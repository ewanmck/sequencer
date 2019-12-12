
let tonesArray = [null, null, null, null, null, null, null, null];

const handleSampleSetup = function () {
    if (trackSelection != null && soundSelection != null) {
        let sample = new Tone.Player(libraryData[currLibraryButton.text()][soundSelection]).toMaster();
        sample.volume.value = -25;
        tonesArray[trackSelection - 1] = sample;

    }

}

let beatNumber = 0;

function addBeat() {
    beatNumber = (beatNumber + 1) % 16;
}


let loop = new Tone.Loop(function (time) {
    if (track1Toggles[beatNumber + 1] == true && tonesArray[0] != null) {
        tonesArray[0].start();
    }
    if (track2Toggles[beatNumber + 1] == true && tonesArray[1] != null) {
        tonesArray[1].start();
    }
    if (track3Toggles[beatNumber + 1] == true && tonesArray[2] != null) {
        tonesArray[2].start();
    }
    if (track4Toggles[beatNumber + 1] == true && tonesArray[3] != null) {
        tonesArray[3].start();
    }
    if (track5Toggles[beatNumber + 1] == true && tonesArray[4] != null) {
        tonesArray[4].start();
    }
    if (track6Toggles[beatNumber + 1] == true && tonesArray[5] != null) {
        tonesArray[5].start();
    }
    if (track7Toggles[beatNumber + 1] == true && tonesArray[6] != null) {
        tonesArray[6].start();
    }
    if (track8Toggles[beatNumber + 1] == true && tonesArray[7] != null) {
        tonesArray[7].start();
    }

    addBeat();

    console.log("playing");
}, "16n").start(0);




let playState = false;

const looper = function () {
    console.log("looper called");
    if (playState) {
        console.log("stop");
        Tone.Transport.stop();
        
    } else {
        console.log("start");
        Tone.Transport.bpm.value = $(".bpm").val();
        Tone.Transport.start();
    }
    playState = !playState;
}

function bpmToSeconds(bpm) {
    return 60 / bpm;
}

const changeBPM = function (event) {
    let bpmVal = $(".bpm").val();
    Tone.Transport.bpm.value = bpmVal;
}


$(document).ready(function () {
    $(".submission").on("click", handleSampleSetup);
    $(".play").on("click", looper);
    $(".bpm").on("input", changeBPM);

});


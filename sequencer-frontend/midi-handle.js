let launchpad;

WebMidi.enable(function (err) {

    if (err) {
        console.log("WebMidi could not be enabled.", err);
    } else {
        console.log("WebMidi enabled!");
        launchpad = WebMidi.getInputById("-600345023");
        launchpadLights = WebMidi.getOutputById("842158253");
        //console.log(launchpad);

        launchpad.addListener('noteon', "all", function (e) {
            //console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
            handleNote(e);
        });

        launchpad.addListener('controlchange', "all", function(e){
            if (e.value == 127) {
                toggleRegion();
            }
            //console.log("Received 'controlchange' message.", e);
        })
        
        toggleLights();
    }

});

let region = 0;



const toggleRegion = function () {
    if (region === 0) {
        region = 8;
    } else {
        region = 0;
    }
    toggleLights();
    //console.log(region);
}

const handleNote = function (e) {

    //if (e.note.name == "")


    if (e.note.name == "C" && e.note.octave == -1) {
        //start track1
        toggleButtonState($("#track1").find(".buttons").children()[0+region]);

    } else if (e.note.name == "C#" && e.note.octave == -1) {
        toggleButtonState($("#track1").find(".buttons").children()[1+region]);
    } else if (e.note.name == "D" && e.note.octave == -1) {
        toggleButtonState($("#track1").find(".buttons").children()[2+region]);
    } else if (e.note.name == "D#" && e.note.octave == -1) {
        toggleButtonState($("#track1").find(".buttons").children()[3+region]);
    } else if (e.note.name == "E" && e.note.octave == -1) {
        toggleButtonState($("#track1").find(".buttons").children()[4+region]);
    } else if (e.note.name == "F" && e.note.octave == -1) {
        toggleButtonState($("#track1").find(".buttons").children()[5+region]);
    }  else if (e.note.name == "F#" && e.note.octave == -1) {
        toggleButtonState($("#track1").find(".buttons").children()[6+region]);
    } else if (e.note.name == "G" && e.note.octave == -1) {
        toggleButtonState($("#track1").find(".buttons").children()[7+region]);
        //finish track1
        //start track2
    } else if (e.note.name == "E" && e.note.octave == 0) {
        toggleButtonState($("#track2").find(".buttons").children()[0+region]);
    } else if (e.note.name == "F" && e.note.octave == 0) {
        toggleButtonState($("#track2").find(".buttons").children()[1+region]);
    } else if (e.note.name == "F#" && e.note.octave == 0) {
        toggleButtonState($("#track2").find(".buttons").children()[2+region]);
    } else if (e.note.name == "G" && e.note.octave == 0) {
        toggleButtonState($("#track2").find(".buttons").children()[3+region]);
    } else if (e.note.name == "G#" && e.note.octave == 0) {
        toggleButtonState($("#track2").find(".buttons").children()[4+region]);
    } else if (e.note.name == "A" && e.note.octave == 0) {
        toggleButtonState($("#track2").find(".buttons").children()[5+region]);
    } else if (e.note.name == "A#" && e.note.octave == 0) {
        toggleButtonState($("#track2").find(".buttons").children()[6+region]);
    } else if (e.note.name == "B" && e.note.octave == 0) {
        toggleButtonState($("#track2").find(".buttons").children()[7+region]);
        //finish track2
        //start track3
    } else if (e.note.name == "G#" && e.note.octave == 1) {
        toggleButtonState($("#track3").find(".buttons").children()[0+region]);
    } else if (e.note.name == "A" && e.note.octave == 1) {
        toggleButtonState($("#track3").find(".buttons").children()[1+region]);
    } else if (e.note.name == "A#" && e.note.octave == 1) {
        toggleButtonState($("#track3").find(".buttons").children()[2+region]);
    } else if (e.note.name == "B" && e.note.octave == 1) {
        toggleButtonState($("#track3").find(".buttons").children()[3+region]);
    } else if (e.note.name == "C" && e.note.octave == 2) {
        toggleButtonState($("#track3").find(".buttons").children()[4+region]);
    } else if (e.note.name == "C#" && e.note.octave == 2) {
        toggleButtonState($("#track3").find(".buttons").children()[5+region]);
    } else if (e.note.name == "D" && e.note.octave == 2) {
        toggleButtonState($("#track3").find(".buttons").children()[6+region]);
    } else if (e.note.name == "D#" && e.note.octave == 2) {
        toggleButtonState($("#track3").find(".buttons").children()[7+region]);
        //finish track3
        //start track4
    } else if (e.note.name == "C" && e.note.octave == 3) {
        toggleButtonState($("#track4").find(".buttons").children()[0+region]);
    } else if (e.note.name == "C#" && e.note.octave == 3) {
        toggleButtonState($("#track4").find(".buttons").children()[1+region]);
    } else if (e.note.name == "D" && e.note.octave == 3) {
        toggleButtonState($("#track4").find(".buttons").children()[2+region]);
    } else if (e.note.name == "D#" && e.note.octave == 3) {
        toggleButtonState($("#track4").find(".buttons").children()[3+region]);
    } else if (e.note.name == "E" && e.note.octave == 3) {
        toggleButtonState($("#track4").find(".buttons").children()[4+region]);
    } else if (e.note.name == "F" && e.note.octave == 3) {
        toggleButtonState($("#track4").find(".buttons").children()[5+region]);
    } else if (e.note.name == "F#" && e.note.octave == 3) {
        toggleButtonState($("#track4").find(".buttons").children()[6+region]);
    } else if (e.note.name == "G" && e.note.octave == 3) {
        toggleButtonState($("#track4").find(".buttons").children()[7+region]);
        //finish track4
        //start track 5
    } else if (e.note.name == "E" && e.note.octave == 4) {
        toggleButtonState($("#track5").find(".buttons").children()[0+region]);
    } else if (e.note.name == "F" && e.note.octave == 4) {
        toggleButtonState($("#track5").find(".buttons").children()[1+region]);
    } else if (e.note.name == "F#" && e.note.octave == 4) {
        toggleButtonState($("#track5").find(".buttons").children()[2+region]);
    } else if (e.note.name == "G" && e.note.octave == 4) {
        toggleButtonState($("#track5").find(".buttons").children()[3+region]);
    } else if (e.note.name == "G#" && e.note.octave == 4) {
        toggleButtonState($("#track5").find(".buttons").children()[4+region]);
    } else if (e.note.name == "A" && e.note.octave == 4) {
        toggleButtonState($("#track5").find(".buttons").children()[5+region]);
    } else if (e.note.name == "A#" && e.note.octave == 4) {
        toggleButtonState($("#track5").find(".buttons").children()[6+region]);
    } else if (e.note.name == "B" && e.note.octave == 4) {
        toggleButtonState($("#track5").find(".buttons").children()[7+region]);
        //finish track5
        //start track6
    } else if (e.note.name == "G#" && e.note.octave == 5) {
        toggleButtonState($("#track6").find(".buttons").children()[0+region]);
    } else if (e.note.name == "A" && e.note.octave == 5) {
        toggleButtonState($("#track6").find(".buttons").children()[1+region]);
    } else if (e.note.name == "A#" && e.note.octave == 5) {
        toggleButtonState($("#track6").find(".buttons").children()[2+region]);
    } else if (e.note.name == "B" && e.note.octave == 5) {
        toggleButtonState($("#track6").find(".buttons").children()[3+region]);
    } else if (e.note.name == "C" && e.note.octave == 6) {
        toggleButtonState($("#track6").find(".buttons").children()[4+region]);
    } else if (e.note.name == "C#" && e.note.octave == 6) {
        toggleButtonState($("#track6").find(".buttons").children()[5+region]);
    } else if (e.note.name == "D" && e.note.octave == 6) {
        toggleButtonState($("#track6").find(".buttons").children()[6+region]);
    } else if (e.note.name == "D#" && e.note.octave == 6) {
        toggleButtonState($("#track6").find(".buttons").children()[7+region]);
        //finish track6
        //start track7
    } else if (e.note.name == "C" && e.note.octave == 7) {
        toggleButtonState($("#track7").find(".buttons").children()[0+region]);
    } else if (e.note.name == "C#" && e.note.octave == 7) {
        toggleButtonState($("#track7").find(".buttons").children()[1+region]);
    } else if (e.note.name == "D" && e.note.octave == 7) {
        toggleButtonState($("#track7").find(".buttons").children()[2+region]);
    } else if (e.note.name == "D#" && e.note.octave == 7) {
        toggleButtonState($("#track7").find(".buttons").children()[3+region]);
    } else if (e.note.name == "E" && e.note.octave == 7) {
        toggleButtonState($("#track7").find(".buttons").children()[4+region]);
    } else if (e.note.name == "F" && e.note.octave == 7) {
        toggleButtonState($("#track7").find(".buttons").children()[5+region]);
    } else if (e.note.name == "F#" && e.note.octave == 7) {
        toggleButtonState($("#track7").find(".buttons").children()[6+region]);
    } else if (e.note.name == "G" && e.note.octave == 7) {
        toggleButtonState($("#track7").find(".buttons").children()[7+region]);
        //finish track7
        //start track8
    } else if (e.note.name == "E" && e.note.octave == 8) {
        toggleButtonState($("#track8").find(".buttons").children()[0+region]);
    } else if (e.note.name == "F" && e.note.octave == 8) {
        toggleButtonState($("#track8").find(".buttons").children()[1+region]);
    } else if (e.note.name == "F#" && e.note.octave == 8) {
        toggleButtonState($("#track8").find(".buttons").children()[2+region]);
    } else if (e.note.name == "G" && e.note.octave == 8) {
        toggleButtonState($("#track8").find(".buttons").children()[3+region]);
    } else if (e.note.name == "G#" && e.note.octave == 8) {
        toggleButtonState($("#track8").find(".buttons").children()[4+region]);
    } else if (e.note.name == "A" && e.note.octave == 8) {
        toggleButtonState($("#track8").find(".buttons").children()[5+region]);
    } else if (e.note.name == "A#" && e.note.octave == 8) {
        toggleButtonState($("#track8").find(".buttons").children()[6+region]);
    } else if (e.note.name == "B" && e.note.octave == 8) {
        toggleButtonState($("#track8").find(".buttons").children()[7+region]);
    } 
    toggleLights();
}

function toggleButtonState(selected) {
    let button = $(selected);
    button.toggleClass("is-grey");
    button.toggleClass("is-warning");
    let trackID = button.parent().parent().parent().attr("id");
    let buttonNum = button.text();
    tracks[trackID][buttonNum] = !tracks[trackID][buttonNum];
}

const updateLights = function () {

}

console.log(WebMidi.outputs);

//below call changes the note at i to on if j = 127, off if j=0
//launchpadLights.playNote(i, 1, {rawVelocity: true, velocity: j});

function toggleLights() {
    for (let i = 0; i < 8; i++) {
        if (track1Toggles[i + region + 1]) {
            launchpadLights.playNote(i, 1, {rawVelocity: true, velocity: 127});
        } else {
            launchpadLights.playNote(i, 1, {rawVelocity: true, velocity: 0});
        }

        if (track2Toggles[i + region + 1]) {
            launchpadLights.playNote(i+ 8 * 2, 1, {rawVelocity: true, velocity: 127});
        } else {
            launchpadLights.playNote(i+ 8 * 2, 1, {rawVelocity: true, velocity: 0});
        }

        if (track3Toggles[i + region + 1]) {
            launchpadLights.playNote(i+ 8 * 4, 1, {rawVelocity: true, velocity: 127});
        } else {
            launchpadLights.playNote(i+ 8 * 4, 1, {rawVelocity: true, velocity: 0});
        }

        if (track4Toggles[i + region + 1]) {
            launchpadLights.playNote(i + 8 * 6, 1, {rawVelocity: true, velocity: 127});
        } else {
            launchpadLights.playNote(i + 8 * 6, 1, {rawVelocity: true, velocity: 0});
        }

        if (track5Toggles[i + region + 1]) {
            launchpadLights.playNote(i+ 8 * 8, 1, {rawVelocity: true, velocity: 127});
        } else {
            launchpadLights.playNote(i + 8 * 8, 1, {rawVelocity: true, velocity: 0});
        }

        if (track6Toggles[i + region + 1]) {
            launchpadLights.playNote(i + 8 * 10, 1, {rawVelocity: true, velocity: 127});
        } else {
            launchpadLights.playNote(i + 8 * 10, 1, {rawVelocity: true, velocity: 0});
        }

        if (track7Toggles[i + region + 1]) {
            launchpadLights.playNote(i + 8 * 12, 1, {rawVelocity: true, velocity: 127});
        } else {
            launchpadLights.playNote(i + 8 * 12, 1, {rawVelocity: true, velocity: 0});
        }

        if (track8Toggles[i + region + 1]) {
            launchpadLights.playNote(i + 8 * 14, 1, {rawVelocity: true, velocity: 127});
        } else {
            launchpadLights.playNote(i + 8 * 14, 1, {rawVelocity: true, velocity: 0});
        }
    }
    
}



// input.addListener('noteon', "all", function(e) {
//     console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
// });
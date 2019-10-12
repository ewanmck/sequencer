
/*TODO:
    add in all of the sample names
    assign them specific values
    use those values to pull the sound from the folder
*/

let trackSelection = null; 


const updateLibrary = function(event) {
    let whitespace = $(".sound-selection")
    whitespace.empty();
    let selection = $(event.target).text();
    let keys = Object.keys(libraryData[selection]);
    for (let i = 0; i < keys.length; i++) {
        whitespace.append(`<button class="button sound">${keys[i]}</button>`);
    }
    $(".sound").on("click", updateCurrentSelection);
}

const updateCurrentSelection = function(event) {
    let currentSelection = $(event.target).text();
    console.log(currentSelection);


}

const updateTrackSelection = function(event) {
    trackSelection = $(event.target).text();
    console.log(trackSelection);
}


function registerLibraryListeners() {
    $(".library").on("click", updateLibrary);
    $(".sound").on("click", updateCurrentSelection);
    $(".track").on("click", updateTrackSelection);
}

$(function() {
    registerLibraryListeners()
});


let libraryData = {
    "kick": {
        "SPV3_KICK2" : "final-project/samples/SPV3_KICK2 fav.wav"
    },
    "snare": {
        "Jack Ü" : "final-project/samples/Jack Ü - Take Ü There Snare.wav"
    },
    "hats": {
        "hy_hat" : "/Users/ewan/comp426-cli/final-project/samples/hy_hat.wav"
    },
    "tom": {
        "SPV3_TOM2" : "final-project/samples/SPV3_TOM2.wav"
    },
    "synth": {
        "synth 3" : "final-project/samples/synth 3.wav"
    },
    "sample": {
        "AiryFlute_01_SP" : "final-project/samples/AiryFlute_01_SP.wav"
    },
    "fx": {},
};
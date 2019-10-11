
/*TODO:
    add in all of the sample names
    assign them specific values
    use those values to pull the sound from the folder
*/

const addKickLibrary = function() {
    $(".sound-selector").empty();
}

const addSnareLibrary = function() {
    $(".sound-selector").empty();
}

const addHatsLibrary = function() {
    $(".sound-selector").empty();
}

const addTomLibrary = function() {
    $(".sound-selector").empty();
}

const addSynthLibrary = function() {
    $(".sound-selector").empty();
}

const addSampleLibrary = function() {
    $(".sound-selector").empty();
}

const addFXLibrary = function() {
    $(".sound-selector").empty();
}



function registerLibraryListeners() {
    $(".kick").on("click", addKickLibrary);
    $(".snare").on("click", addSnareLibrary);
    $(".hats").on("click", addHatsLibrary);
    $(".tom").on("click", addTomLibrary);
    $(".synth").on("click", addSynthLibrary);
    $(".sample").on("click", addSampleLibrary);
    $(".fx").on("click", addFXLibrary);
}

$(function() {
    registerLibraryListeners()
});
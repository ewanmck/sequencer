
/*TODO:
    add in all of the sample names
    assign them specific values
    use those values to pull the sound from the folder
*/


let currLibraryButton = null;
let currSoundButton = null;
let currTrackButton = null;
let trackSelection = null;
let soundSelection = null; 


const updateLibrary = function(event) {
    let whitespace = $(".sound-selection")
    whitespace.empty();
    soundSelection = null;

    let selection = $(event.target).text();
    let keys = Object.keys(libraryData[selection]);
    for (let i = 0; i < keys.length; i++) {
        whitespace.append(`<button class="button is-info sound">${keys[i]}</button>`);
    }
    $(".sound").on("click", updateCurrentSelection);


    //change button colors
    if(currLibraryButton != null){
        currLibraryButton.css("background-color", "hsl(204, 86%, 53%)");
    }
 
    currLibraryButton = $(event.target);
    currLibraryButton.css("background-color", "hsl(190, 86%, 53%)");
}

const updateCurrentSelection = function(event) {
    soundSelection = $(event.target).text();
    console.log(soundSelection);

    //change button colors
    if(currSoundButton != null){
        currSoundButton.css("background-color", "hsl(204, 86%, 53%)");
    }
     
    currSoundButton = $(event.target);
    currSoundButton.css("background-color", "hsl(190, 86%, 53%)");


}

const updateTrackSelection = function(event) {
    trackSelection = $(event.target).text();
    console.log(trackSelection);

    //change button colors
    if(currTrackButton != null){
        currTrackButton.css("background-color", "hsl(204, 86%, 53%)");
    }
         
    currTrackButton = $(event.target);
    currTrackButton.css("background-color", "hsl(190, 86%, 53%)");
}

//send sound to track
$(".submission").on("click", function(){
    if((trackSelection == null) || (soundSelection == null)){
        //give the user some info on why submission failed
        return;
    }
    else{
        let tracks = $("#body").children();
        $(tracks[trackSelection-1]).children().first().children().last().children().first().text(soundSelection);
    }
})


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
        "SPV3_KICK2" : "samples/SPV3_KICK2 fav.wav"
    },
    "snare": {
        "Jack Ü" : "samples/Jack Ü - Take Ü There Snare.wav"
    },
    "hats": {
        "hy_hat" : "samples/hy_hat.wav"
    },
    "tom": {
        "SPV3_TOM2" : "samples/SPV3_TOM2.wav"
    },
    "synth": {
        "synth 3" : "samples/synth 3.wav"
    },
    "sample": {
        "AiryFlute_01_SP" : "samples/AiryFlute_01_SP.wav"
    },
    "fx": {},
};
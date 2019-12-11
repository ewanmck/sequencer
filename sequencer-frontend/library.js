
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
    whitespace.addClass("jspScrollable");

    let keys = Object.keys(libraryData[selection]);
    for (let i = 0; i < keys.length; i++) {
        whitespace.append($("<button></button>").text(keys[i]).addClass("button is-info sound"));
    }
    //api.reinitialise();
    $(".sound").on("click", updateCurrentSelection);

    whitespace.attr('style', "");
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
        let tracks = $("#body").children();`    `
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
        "SPV3_KICK2" : "samples/SPV3_KICK2 fav.wav",
        "atom_kick" : "samples/atom_kick.wav",
        "EkaliBlessingsKick" : "samples/EkaliBlessingsKick.wav",
    },
    "bass" :{
        "disorted moog bass" : "samples/disorted moog bass.wav",
        "sam g's 808" : "samples/sam g's 808.wav",
        "slide808" : "samples/slide808.wav",
        "us 808" : "samples/us 808.wav",
    }, 
    "snare": {
        "Jack Ü" : "samples/Jack Ü - Take Ü There Snare.wav",
        "CLAP_BORN" : "samples/CLAP_BORN.wav",
        "Fed up slap" : "samples/Fed up slap.wav",
        "OrphansChopSnare" : "samples/OrphansChopSnare.wav",
    },
    "hats": {
        "hy_hat" : "samples/hy_hat.wav",
        "flash-3" : "samples/flash-3.mp3",
        "shaker (5)" : "samples/shaker (5).wav",
    },
    "tom": {
        "SPV3_TOM2" : "samples/SPV3_TOM2.wav"
    },
    "synth": {
        "synth 3" : "samples/synth 3.wav",
        "Chop (3)" : "samples/Chop (3).wav",
        "EM_Synth Chord 6 (Dmin7)" : "samples/EM_Synth Chord 6 (Dmin7).wav",
        "Synth (8)" : "samples/Synth (8).wav"
    },
    "sample": {
        "AiryFlute_01_SP" : "samples/AiryFlute_01_SP.wav",
        "A_KotoStab_SP" : "samples/A_KotoStab_SP.wav",
        "C_LiveRhodes_SP" : "samples/C_LiveRhodes_SP.wav",
        "e_fat" : "samples/e_fat.wav",
        "F_SoulStab_SP" : "samples/F_SoulStab_SP.wav",
    },
    "fx": {
        "Big Pot 5" : "samples/Big Pot 5.wav",
        "Coins on a Skin b" : "samples/Coins on a Skin b.wav",
        "perc 3" : "samples/perc 3.wav",
        "vox 5" : "samples/vox 5.wav",
        "VOX 6" : "samples/VOX 6.wav"
    },
};
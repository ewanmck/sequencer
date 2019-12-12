//button handlers

let track1Toggles = {
    "1" : false,
    "2" : false,
    "3" : false,
    "4" : false,
    "5" : false,
    "6" : false,
    "7" : false,
    "8" : false,
    "9" : false,
    "10" : false,
    "11" : false,
    "12" : false,
    "13" : false,
    "14" : false,
    "15" : false,
    "16" : false,
}

let track2Toggles = {
    "1" : false,
    "2" : false,
    "3" : false,
    "4" : false,
    "5" : false,
    "6" : false,
    "7" : false,
    "8" : false,
    "9" : false,
    "10" : false,
    "11" : false,
    "12" : false,
    "13" : false,
    "14" : false,
    "15" : false,
    "16" : false,
}

let track3Toggles = {
    "1" : false,
    "2" : false,
    "3" : false,
    "4" : false,
    "5" : false,
    "6" : false,
    "7" : false,
    "8" : false,
    "9" : false,
    "10" : false,
    "11" : false,
    "12" : false,
    "13" : false,
    "14" : false,
    "15" : false,
    "16" : false,
}

let track4Toggles = {
    "1" : false,
    "2" : false,
    "3" : false,
    "4" : false,
    "5" : false,
    "6" : false,
    "7" : false,
    "8" : false,
    "9" : false,
    "10" : false,
    "11" : false,
    "12" : false,
    "13" : false,
    "14" : false,
    "15" : false,
    "16" : false,
}

let track5Toggles = {
    "1" : false,
    "2" : false,
    "3" : false,
    "4" : false,
    "5" : false,
    "6" : false,
    "7" : false,
    "8" : false,
    "9" : false,
    "10" : false,
    "11" : false,
    "12" : false,
    "13" : false,
    "14" : false,
    "15" : false,
    "16" : false,
}

let track6Toggles = {
    "1" : false,
    "2" : false,
    "3" : false,
    "4" : false,
    "5" : false,
    "6" : false,
    "7" : false,
    "8" : false,
    "9" : false,
    "10" : false,
    "11" : false,
    "12" : false,
    "13" : false,
    "14" : false,
    "15" : false,
    "16" : false,
}

let track7Toggles = {
    "1" : false,
    "2" : false,
    "3" : false,
    "4" : false,
    "5" : false,
    "6" : false,
    "7" : false,
    "8" : false,
    "9" : false,
    "10" : false,
    "11" : false,
    "12" : false,
    "13" : false,
    "14" : false,
    "15" : false,
    "16" : false,
}

let track8Toggles = {
    "1" : false,
    "2" : false,
    "3" : false,
    "4" : false,
    "5" : false,
    "6" : false,
    "7" : false,
    "8" : false,
    "9" : false,
    "10" : false,
    "11" : false,
    "12" : false,
    "13" : false,
    "14" : false,
    "15" : false,
    "16" : false,
}

let tracks = {
    "track1" : track1Toggles,
    "track2" : track2Toggles,
    "track3" : track3Toggles,
    "track4" : track4Toggles,
    "track5" : track5Toggles,
    "track6" : track6Toggles,
    "track7" : track7Toggles,
    "track8" : track8Toggles,
}

//Toggles the button in css and toggles the value in the set of dictionaries
const toggleButtons= function(event) {
    let button = $(event.target);
    //console.log(button);

    button.toggleClass("is-grey");
    button.toggleClass("is-warning");

    let trackID = button.parent().parent().parent().attr("id");
    let buttonNum = button.text();
    tracks[trackID][buttonNum] = !tracks[trackID][buttonNum];
};

function registerButtonHandler() {
    $(".sequencer").on("click", toggleButtons);
}

$(function() {
   registerButtonHandler();
});

$(document).ready(function(){
	$('.scroll-pane').jScrollPane();
});

//Functionality of objects in the sequencer that can be edited by the user

let currUser = localStorage.getItem("currUser");

let trackGenerator = function (trackNum, trackInfo) {
    let row = $("<div id='track" + trackNum + "' class = 'row columns'></div>");
    let column1 = $("<div class='column'></div");
    let column2 = $("<div class='column is-four-fifths'></div>");
    let trackNumText = $("<p class='subtitle has-text-black-bis has-text-centered'></p>");
    let trackNameText = $("<p class= 'has-text-centered is-italic'></p>");
    let buttons = $("<div class='buttons are-large is-inverted is-centered'></div>");

    for (let i = 1; i <= 16; i++) {
        let numberedButton = $("<a class='button is-grey sequencer'>" + i + "</a>")
        buttons.append(numberedButton);
    }

    trackNumText.html("TRACK " + trackNum);



    if (trackInfo != null) {
        trackNameText.html(trackInfo.trackNames[trackNum - 1])
        if (trackInfo.trackNames[trackNum - 1] == null) {
            trackNameText.html("No Track Selected");
        } else {
            let sample = new Tone.Player(loadedLibrary[trackInfo.trackNames[trackNum - 1]]).toMaster();
            sample.volume.value = -25;
            tonesArray[trackNum - 1] = sample;
        }
    } else {
        trackNameText.html("No Track Selected");
    }
    //console.log(trackInfo.trackToggles.track1);



    trackNumText.append(trackNameText);
    column1.append(trackNumText);
    column2.append(buttons);

    row.append(column1);
    row.append(column2);

    return row;

}

//load saved data (change to load from database eventually)
let loadFunc = function () {
    let currTrackInfo = null;
    console.log("hello")
    let title = document.getElementById('sequenceTitle');
    let titleEdit = document.getElementById('seqTitleEdit');
    if (localStorage.getItem("currentTrack") == null) {
        title.innerHTML = "Track Name Here";
        titleEdit.value = "Track Name Here";
    } else {
        currTrackInfo = JSON.parse(localStorage.getItem("currentTrack"))
        //set name from current
        title.innerHTML = currTrackInfo.sequenceName;
        titleEdit.value = currTrackInfo.sequenceName;
        //set bpm from current
        $(".bpm").val(currTrackInfo.bpm);
        Tone.Transport.bpm.value = currTrackInfo.bpm;
        //TODO: set toggles from current

        //set sounds from current
        tonesArray = currTrackInfo.trackNames;



    }
    title.addEventListener('click', function () {
        title.style.display = "none";
        titleEdit.style.display = "block";
        titleEdit.focus();
    });
    titleEdit.addEventListener('focusout', function () {
        titleEdit.style.display = "none";
        title.innerHTML = titleEdit.value;
        title.style.display = "inline";

    });

    //load the tracks
    let body = $("#body")
    for (let i = 1; i <= 8; i++) {
        let newTrack;
        if (localStorage.getItem("currentTrack") == null) {
            newTrack = trackGenerator(i, null);
        }
        else {
            newTrack = trackGenerator(i, currTrackInfo);
        }

        

        if (i % 2 == 0) {
            newTrack.addClass("has-background-grey-lighter");
        } else {
            newTrack.addClass("has-background-grey-light");
        }


        body.append(newTrack);
        let currentTrackToggles = currTrackInfo.trackToggles["track" + (i)];
        for (let j = 0; j < 16; j++) {
            if (currentTrackToggles[j]) {
                let track = '#track' + i;
                toggleButtonState($(track).find(".buttons").children()[j-1]);
            }
        }
    }



}

loadFunc();

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

async function saveTrack() {

    let sequenceName = $("#sequenceTitle").html();
    let bpm = $(".bpm").val();
    console.log("BPM:" + bpm)
    let trackNames = [null, null, null, null, null, null, null, null];
    for (let i = 0; i < 8; i++) {
        if ($("#track" + (i + 1)).find(".is-italic").html() == "No Track Selected") {
            trackNames[i] == null;
        } else {
            trackNames[i] = $("#track" + (i + 1)).find(".is-italic").html();
        }
    }
    let trackToggles = tracks;
    console.log(trackToggles)

    let author = localStorage.getItem("currUser");

    console.log(trackNames);

    return await pubRoot.post(`/tracks/` + sequenceName + "/", {
        data: { sequenceName, author, trackNames, trackToggles, bpm }
    })
}


//save the track to /public/ and save name to /user/currUser for reference
// const saveTrack = async function() {
//     let trackName = $("#sequenceTitle");
//     let currUser = localStorage.getItem("currUser");
//     try{
//         const response = await axios({
//             method: 'post',
//             url: 'http://localhost:3000/public/tracks/',
//             data: {
//                 "name": trackName,
//                 "author": currUser,
//             }
//         })

//     } catch (error) {
//         console.log(error);
//         alert("Save failed");
//     }

// }

function logoutHandler() {
    //log out
    localStorage.setItem("jwtToken", null)
    localStorage.setItem("currUser", null)
    location.replace("http://localhost:3001/login.html")
}

$("#logButton").on("click", logoutHandler);


$(document).ready(function () {
    $(".save").on("click", saveTrack);
    console.log(currUser);
    if (currUser !== "null") {
        $("#logButton").html("Logout");
    } else {
        $("#logButton").html("Login");
    }
});

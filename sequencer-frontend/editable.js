//Functionality of objects in the sequencer that can be edited by the user

let currUser = localStorage.getItem("currUser");

let trackGenerator = function(trackNum){
    let row = $("<div id='track" + trackNum + "' class = 'row columns'></div>");
    let column1 = $("<div class='column'></div");
    let column2 = $("<div class='column is-four-fifths'></div>");
    let trackNumText = $("<p class='subtitle has-text-black-bis has-text-centered'></p>");
    let trackNameText = $("<p class= 'has-text-centered is-italic'></p>");
    let buttons = $("<div class='buttons are-large is-inverted is-centered'></div>");

    for(let i = 1; i <= 16; i++){
        let numberedButton = $("<a class='button is-grey sequencer'>" + i + "</a>")
        buttons.append(numberedButton);
    }

    trackNumText.html("TRACK " + trackNum);
    trackNameText.html("No Track Selected");

    trackNumText.append(trackNameText);
    column1.append(trackNumText);
    column2.append(buttons);

    row.append(column1);
    row.append(column2);

    return row;
}

//load saved data (change to load from database eventually)
let loadFunc = function(){
    
    let title = document.getElementById('sequenceTitle');
    let titleEdit = document.getElementById('seqTitleEdit');
    if(localStorage.getItem("currentTrack") == null){
        title.innerHTML = "Track Name Here";
        titleEdit.value = "Track Name Here";
    }else{
        console.log(JSON.parse(currentTrackObject.sequenceName))
        title.innerHTML = currentTrackObject.sequenceName//localStorage.getItem("currentTrack").sequenceName;
        titleEdit.value = currentTrackObject.sequenceName//localStorage.getItem("currentTrack").sequenceName;
    }
    title.addEventListener('click', function(){
        title.style.display = "none";
        titleEdit.style.display = "block";
        titleEdit.focus();
    });
    titleEdit.addEventListener('focusout', function(){
        titleEdit.style.display = "none";
        title.innerHTML = titleEdit.value;
        title.style.display = "inline";
        
    });

    //load the tracks
    let body = $("#body")
    for(let i = 1; i<=8; i++){
        //console.log("sup");
        let newTrack = trackGenerator(i);
        if(i%2 == 0){
            newTrack.addClass("has-background-grey-lighter");
        }else{
        newTrack.addClass("has-background-grey-light");
        }
        body.append(newTrack);
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
    let trackNames = tonesArray;
    console.log(trackNames)
    let trackToggles = tracks;
    console.log(trackToggles)

    let author = localStorage.getItem("currUser");

    return await pubRoot.post(`/tracks/` + sequenceName + "/", { 
        data: {sequenceName, author, trackNames, trackToggles, bpm}
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

function logoutHandler(){
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

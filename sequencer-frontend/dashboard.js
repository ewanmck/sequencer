let currUser = localStorage.getItem("currUser")
let trackCounter = 0;
let yourTrackCounter = 0;
let mostPopular = null
let yourMostPopular = null;
let tracks = null;

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

const accRoot = new axios.create({
    baseURL: "http://localhost:3000/account"
});
  
console.log(currUser);



//get popular tracks from server
async function loadTrackList(filteredList = null, whichList = null){
    if(filteredList == null){
        let response = await getAllTracks();
        tracks = response.data.result;
    }
    else{
        tracks = list;
    }
    console.log(tracks);
    trackNames = Object.keys(tracks);
    trackInfo = Object.values(tracks);

    trackCounter = trackInfo.length;

    let popularTracks = $("#popTracks");
    let yourTracks = $("#yourTracks");

    console.log(localStorage.getItem("currUser"))

    if (localStorage.getItem("currUser") == "null") {
        yourTracks.append($('<p class="has-text-centered">Log in to view your tracks!</p>'))
    }

    for(i=0; i<trackNames.length; i++){

        let newRecord = $("<div class = 'columns'></div>");
        newRecord.width("100%");
        newRecord.height("70px");
        newRecord.css("background-color", "lightblue")
        newRecord.css("margin", "5px")
        newRecord.addClass("list-item")
        console.log( trackInfo[i])
        newRecord.data("trackInfo", trackInfo[i])
        console.log( "Data: " +newRecord.data("trackInfo"));
        newRecord.append($("<div class = 'column'>" +trackNames[i]+"</div>"))
        newRecord.append($("<div class = 'column has-text-centered'>" +trackInfo[i]["author"]+"</div>"))
        newRecord.append($("<div class = 'column has-text-centered'>" +trackInfo[i]["likes"]+"</div>"))
        
        newRecord.on("click", function(event){
            console.log($(this).data("trackInfo"))
            localStorage.setItem("currentTrack", JSON.stringify($(this).data("trackInfo")))
            location.replace("http://localhost:3001");
        })

        popularTracks.append(newRecord);
        if(currUser == trackInfo[i]["author"]){
            yourTracks.append(newRecord.clone());
            yourTrackCounter += 1;

        }

        $("#totalTracks").html(trackCounter + " tracks")
        $("#yourTotalTracks").html(yourTrackCounter + " tracks")
        //append into right list
    }
}
loadTrackList();

//TODO: make this functional. Filter does not work on generic objects
//      additionally, it is using the loadTrackList improperly currently
async function search(whichList){
    let response = await getAllTracks();
    console.log(response);
    let tracks = response.data.result;
    console.log(tracks);
    let searchParam = null;

    if(whichList == "userTracks"){
        tracks = tracks.filter(function(track){
            return track.author == currUser;
        }
        )
        searchParam = ($("#userSearch").val())
    }else{
        searchParam = ($("#allSearch").val())
    }

    let filteredList = tracks.filter(function(track){
        return (track.author.includes(searchParam) || track.trackName.includes(searchParam))
    }
    )
    loadTrackList(filteredList, whichList);
}

$("#userSearchButton").on("click", function() {
    search("userTracks");
})
$("#allSearchButton").on("click", function() {
    search("allTracks");
})



async function getAllTracks() {
    return await pubRoot.get("/tracks");   
}

function logoutHandler(){
    //log out
    localStorage.setItem("jwtToken", null)
    localStorage.setItem("currUser", null)
    location.replace("http://localhost:3001/login.html")
}



$("#logButton").on("click", logoutHandler);
$("#seqButton").on("click", function() {
    location.replace("http://localHost:3001")
})

let userData;
let skillLevel;

const loadUserData = async function () {
    try{
        userData = await accRoot.get('/status', {
            headers: { 'Authorization': "Bearer " + localStorage.getItem("jwtToken") }
        }).then(function (response) {
            console.log(response);
            skillLevel = response.data.user.data.skill;
            console.log(skillLevel);
            $("#skill").html("Skill Level : " + skillLevel);
        });
    } catch (e) {
        console.log(e);
    }
    
}

let skillUpdateStatus = false;

const handleSkillUpdate = function() {
    if (!skillUpdateStatus) {
        console.log("skill");
        let skillBox = $("#skill");
        let selection = $("<div class='select'><select id = 'skillSelect'><option>1 - What's a Sequencer?</option><option>2 - Heard of it</option><option>3 - Some experience</option><option>2 - Very experienced</option><option>5 - Producer</option></select></div>");
        skillBox.replaceWith(selection);
    } else {

    }
    
}

$(document).ready(function() {
    //console.log(currUser);
    console.log(currUser !== "null");
    //$("#skillChange").on("click", handleSkillUpdate);
    if (currUser !== "null") {
        $("#logButton").html("Logout");
    } else {
        $("#logButton").html("Login");
    }

    if (currUser !== "null") {
        $("#dashTitle").html(currUser + "'s Dashboard")
    } else {
        $("#dashTitle").html("Dashboard");
    }
    loadUserData();
    
})

//async function deleteSong(trackName){
//    await pubRoot.delete(`/tracks/trackName`)
//}

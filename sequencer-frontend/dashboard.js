let currUser = localStorage.getItem("currUser")
let trackCounter = 0;
let yourTrackCounter = 0;
let mostPopular = null
let yourMostPopular = null;
let tracks = null;

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

const privRoot = new axios.create({
    baseURL: "http://localhost:3000/private"
});

const userRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
});
  
console.log(currUser);



//get public tracks from server
async function loadAllList(permissions){
    console.log("loading")
    //if(filteredList == null){
    let response = null;
    if(permissions == "private"){
        console.log("loading private")
        response = await getTracks("private");
        loadUserList();
        
    }
    else{
        response = await getTracks("public")
    }

    if(response == null){
        ($("#allTracks").html("No tracks available!"))
    }

    tracks = response.data.result;

    //}
    //else{
    //  tracks = list;
    //}

    trackNames = Object.keys(tracks);
    trackInfo = Object.values(tracks);

    trackCounter = trackInfo.length;

    let allTracks = $("#allTracks");
    let yourTracks = $("#yourTracks");

    console.log(localStorage.getItem("currUser"))

    if(permissions == "public"){
        yourTracks.append($('<p class="has-text-centered">Log in to view your tracks!</p>'))
    }
    //if (localStorage.getItem("currUser") == "null") {
    //    yourTracks.append($('<p class="has-text-centered">Log in to view your tracks!</p>'))
    //}

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

        allTracks.append(newRecord);

        $("#totalTracks").html(trackCounter + " tracks")
        //append into right list
    }
}


async function reloadAllList(){
    $("#yourTracks").empty();
    $("#allTracks").empty();
    loadAllList("private");
}


//get your unlisted tracks from server
async function loadUserList(){
    let response = await getTracks("user");

    if(response == null){
        ($("#yourTracks").html("No tracks available!"))
    }

    tracks = response.data.result;

    //}
    //else{
    //  tracks = list;
    //}

    trackNames = Object.keys(tracks);
    trackInfo = Object.values(tracks);

    trackCounter = trackInfo.length;

    let yourTracks = $("#yourTracks");


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

        let deleteButton = $("<button class = 'button delete'></button>");
        deleteButton.on("click", async function(event){
            await deleteHandler(event);
            console.log("madeIt")
            reloadAllList();
        }
        );

        newRecord.append($("<div class = 'column has-text-centered'><</div>").append(deleteButton))
        
        newRecord.on("click", function(event){
            if(event.target.classList[1] == "delete"){
                return;
            }
            console.log($(this).data("trackInfo"))
            localStorage.setItem("currentTrack", JSON.stringify($(this).data("trackInfo")))
            location.replace("http://localhost:3001");
        })


        yourTracks.append(newRecord);
        yourTrackCounter += 1;


        $("#yourTotalTracks").html(yourTrackCounter + " tracks")
        //append into right list
    }

}

async function deleteHandler(event){
    trackName = $(event.target).parent().parent().children().eq(0).html();
    console.log(trackName)
    try{
    await userRoot.delete("/tracks/" + trackName,
    {
        headers: { 'Authorization': "Bearer " + localStorage.getItem("jwtToken") }
    });
    await privRoot.delete("/tracks/" + trackName,
    {
        headers: { 'Authorization': "Bearer " + localStorage.getItem("jwtToken") }
    });

    return await pubRoot.delete("/tracks/" + trackName,);
    }
    catch(e){

    }



}





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



async function getTracks(location) {
    try{
    switch (location){
        case "public":
            return await pubRoot.get("/tracks");
        case "private":
            return await privRoot.get("/tracks",
            {
                headers: { 'Authorization': "Bearer " + localStorage.getItem("jwtToken") }
            });
        case "user":
            return await userRoot.get("/tracks",
            {
                headers: { 'Authorization': "Bearer " + localStorage.getItem("jwtToken") }
            });
        

    } 
    }catch(e){
        return null;
    } 
}


function logoutHandler(){
    //log out
    localStorage.setItem("jwtToken", null)
    localStorage.setItem("currUser", null)
    localStorage.setItem("currentTrack", null)
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
    

    if (currUser !== "null") {
        $("#logButton").html("Logout");
        
        loadAllList("private");

    } else {
        $("#logButton").html("Login");
        
        loadAllList("public")
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

let currUser = localStorage.getItem("currUser")
let trackCounter = 0;
let yourTrackCounter = 0;
let mostPopular = null
let yourMostPopular = null;
let tracks = null;

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});
  

$("#dashTitle").html(currUser + "'s Dashboard")

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
    for(i=0; i<trackNames.length; i++){
        console.log(trackNames[i]);
        console.log(trackInfo[i])
        let newRecord = $("<div class = 'columns'></div>");
        newRecord.width("100%");
        newRecord.height("70px");
        newRecord.css("background-color", "lightblue")
        newRecord.css("margin", "5px")
        newRecord.addClass("list-item")

        newRecord.append($("<div class = 'column'>" +trackNames[i]+"</div>"))
        newRecord.append($("<div class = 'column has-text-centered'>" +trackInfo[i]["author"]+"</div>"))
        newRecord.append($("<div class = 'column has-text-centered'>" +trackInfo[i]["likes"]+"</div>"))
        //newRecord.append(recordColumns)
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

$("#logoutButton").on("click", logoutHandler);
$("#seqButton").on("click", function() {
    location.replace("http://localHost:3001")
})


//async function deleteSong(trackName){
//    await pubRoot.delete(`/tracks/trackName`)
//}

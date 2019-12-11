//Functionality of objects in the sequencer that can be edited by the user


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
    if(/*there's no track name saved*/true){
        title.innerHTML = "Track Name Here";
        titleEdit.value = "Track Name Here";

    }else{
        //load from database
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

let currUser = null;
let jwtToken = null;

export default function(){
    return currUser;
}

const handleCreate = async function() {
    let user = $("#userInput").val();
    let word = $("#passInput").val();
    let skill = $("#skillSelect").children("option:selected").val();
    try{
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/account/create',
            data: {
                name: user,
                pass: word,
                data :{
                    "skill": skill
                }
            }
        })

    } catch (error) {
        alert("Account already exists");
    }
    
}

const handleLogin = async function() {
    let user = $("#userInput").val();
    let word = $("#passInput").val();

    try{
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/account/login',
            data: {
                name: user,
                pass: word,
            }
        })
        console.log("here")
        currUser = response.data.name;
        jwtToken = response.data.jwt;
        localStorage.setItem("currUser", currUser)
        localStorage.setItem("jwtToken", jwtToken)
        console.log(currUser);
        console.log(jwtToken);
        location.replace("http://localhost:3001")
    } catch (error) {
        alert("Invalid Credentials");
    }
}

function toggle(event){
    if($(this).attr("id") == "toggleCreate"){
        $("#toggleCreate").removeClass("is-primary");
        $("#toggleLogin").addClass("is-primary");
        $("#skillLevel").css("display", "block");
        $("#login").css("display", "none");
        $("#create").css("display", "block");
    }else{
        $("#toggleLogin").removeClass("is-primary");
        $("#toggleCreate").addClass("is-primary");
        $("#skillLevel").css("display", "none")
        $("#create").css("display", "none");
        $("#login").css("display", "block");
        console.log("hey")

    }
}

function createClickHandler(event){
    toggle(event);
    console.log("toggled")
    handleCreate(event);

}


//$("#create").on("click", toggle);
$("#toggleCreate").on("click", toggle);
$("#toggleLogin").on("click", toggle)


$(document).ready(function () {
    $("#create").on("click", createClickHandler);
    $("#login").on("click", handleLogin)
});
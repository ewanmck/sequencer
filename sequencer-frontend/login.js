
let currUser = null;
let jwtToken = null;

export default function(){
    return currUser;
}

const handleCreate = async function() {
    let user = $("#userInput").val();
    let word = $("#passInput").val();
    try{
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/account/create',
            data: {
                name: user,
                pass: word,
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

$(document).ready(function () {
    $("#create").on("click", handleCreate);
    $("#login").on("click", handleLogin)
});
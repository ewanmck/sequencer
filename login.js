
const handleLogin = async function() {
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

$(document).ready(function () {
    $("#login").on("click", handleLogin);
});



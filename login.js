
const acctRoot =  new axios.create({baseURL: "localhost:3001/account"})



async function createAcct(usr, pwd) {
    return await acctRoot.post("/create/", {"name":usr, "pass":pwd})
}

async function login(usr, pwd) {
    return await acctRoot.post("/login/", {"name":usr, "pass":pwd})
        .then( function(response){
            console.log(response);
        }
    );
}



//Register buttons
$("#login").on("click", login($("#userInput").val(), $("#passInput").val()))
$("#create").on("click", createAcct($("#userInput").val(), $("#passInput").val()))





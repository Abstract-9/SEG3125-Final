$(document).onload = function() {



};


function signInClick(){
    let state = loadDB();
    if (state==null) state = initData();
    if(state.signedIn){
        window.location.href = "myAccount.html"
    } else {
        window.location.href = "signin.html"
    }
}

function loadDB(){
    return JSON.parse(localStorage.getItem("db"));
}

function initData(){
    return {signedIn: false, user: null, pass:null}
}

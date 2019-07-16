$(document).onload = function() {

    if($('meta[name=customPage]').length){

    }


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

function submitSauce(){
    let sauce = {};
    sauce.name = $("#name").val();
    sauce.desc = $("#comment").val();
    sauce.category = $('input[name=exampleRadios]:checked').val();
    sauce.tags = $('#tags');
    let db = loadDB();
    db.sauce = sauce;
    window.location.href='customRecipe.html'
}


function loadDB(){
    return JSON.parse(localStorage.getItem("db"));
}

function initData(){
    return {signedIn: false, user: null, pass:null}
}

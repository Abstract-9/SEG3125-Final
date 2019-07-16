$(document).ready(function() {

    if($('meta[name=customPage]').length){
        let db = loadDB();
        $('#name').text(db.sauce.name);
        $('#type').text(db.sauce.category);
        $('#desc').text(db.sauce.desc);
        $('#tags').text(db.sauce.tags);
    }else if($('meta[name=accountPage]').length){
        let db = loadDB();
        let acc = getAccounts();
        let user = db.user;
        let userIndex = acc.users.indexOf(user);
        if(user===null) window.location.href = "signin.html";
        let userField = $('#user');
        userField.text(user + "'s Account profile");
        $("#sel1").val(acc.level[userIndex]);
        if(db.sauce) appendSauce($('#sauce2'))
    }
});


function accountClick(){
    let state = loadDB();
    if(state.signedIn){
        window.location.href = "myAccount.html"
    } else {
        window.location.href = "signin.html"
    }
}

function signIn(){
    let acc = getAccounts();
    let db = loadDB();
    let user = $('#username');
    let pass = $('#password');
    if(acc.users.includes(user.val())){
        if(acc.passes[acc.users.indexOf(user.val())]===pass.val()){
            db.signedIn = true;
            db.user = user.val();
            storeDB(db);
            window.location.href = "myAccount.html"
        } else pass.addClass('is-invalid');
    }else user.addClass('is-invalid');
}

function makeAccount(){
    let acc = getAccounts();
    let db = loadDB();
    let user = $('#user');
    if(acc.users.includes(user.val())) user.addClass("is-invalid");
    else{
        let pass = $('#pass');
        acc.users.push(user.val());
        acc.passes.push(pass.val());
        acc.level.push($('input[name=customRadio]:checked').val());
        db.user = user.val();
        storeAccounts(acc);
        storeDB(db);
        window.location.href = "myAccount.html"
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
    storeDB(db);
    window.location.href='customRecipe.html'
}


function loadDB(){
    let data = JSON.parse(localStorage.getItem("db"));
    if(data === null) return initData();
    return data;
}

function storeDB(data){
    localStorage.setItem("db", JSON.stringify(data))
}

function initData(){
    return {signedIn: false, user: null}
}

function getAccounts(){
    let acc = JSON.parse(localStorage.getItem('accounts'));
    if (acc===null){
        acc = {};
        acc.users = [];
        acc.passes = [];
        acc.level = [];
    }
    return acc;
}

function storeAccounts(acc){
    localStorage.setItem('accounts', JSON.stringify(acc));
}

function appendSauce(selector){
    let db = loadDB();
    selector.after(`<tr>
                <td>
                    <button type="button" class="btn btn-outline-secondary m-2 p-2" ><a class ="text-secondary" href = "customRecipe.html">Go to Sauce</a></button>

                </td>

                <td><div class="row">

                    <p style="display:inline" class="pr-2 w-25">${db.sauce.name}</p>
                    <p class="star-black"></p>
                    <p class="star-black"></p>
                    <p class="star-black"></p>
                    <p class="star-white"></p>
                    <p class="star-white"></p>
                    <p class="remove"></p>

                </div></td>
            </tr>`)
}


$(document).ready(function() {

    let data =  loadDB();
    if(!data.signedIn){
        $('.logout').hide();
    }


    if($('meta[name=customPage]').length){
        let db = loadDB();
        let targetSauce = null;
        for(let index in db.sauces) {
            if(db.sauces[index]===null){
                delete db.sauces[index];
                continue;
            }
            if (db.sauces[index].name===db.nextSauce){
                targetSauce = db.sauces[index];
                break;
            }
        }
        if(targetSauce!==null) {
            $('#name').text(targetSauce.name);
            $('#type').text(targetSauce.category);
            $('#desc').text(targetSauce.desc);
            $('#tags').text(targetSauce.tags);
        }
    }else if($('meta[name=accountPage]').length){
        let db = loadDB();
        let acc = getAccounts();
        let user = db.user;
        let userIndex = acc.users.indexOf(user);
        if(user===null) window.location.href = "signin.html";
        let userField = $('#user');
        userField.text(user + "'s Account profile");
        $("#sel1").val(acc.level[userIndex]);
        for(let index in db.sauces){
            if(db.sauces[index]===null) continue;
            appendSauce(db.sauces[index].name)
        }
    }

    if($('p.remove').length){
        $('.remove').on('click', removePost)
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

function signOut(){
    let db = loadDB();

        db.signedIn = false;
        storeDB(db);
        window.location.href = "home.html"
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
    sauce.tags = $('#tags').val().replace('/\s/g', ', ');
    let db = loadDB();
    db.sauces.push(sauce);
    storeDB(db);
    loadsauce(db.sauces[db.sauces.length-1].name);
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
    return {signedIn: false, user: null, sauces: []}
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

function appendSauce(name){
    let db = loadDB();
    $('#sauce-parent').append(`<tr>
                <td>
                    <button type="button" class="btn btn-outline-secondary m-2 p-2" onclick="loadsauce(name)">Go to Sauce</button>

                </td>

                <td><div class="row">

                    <p style="display:inline" class="pr-2 w-25">${name}</p>
                    <p class="star-black"></p>
                    <p class="star-black"></p>
                    <p class="star-black"></p>
                    <p class="star-white"></p>
                    <p class="star-white"></p>
                    <p class="remove"></p>

                </div></td>
            </tr>`)
}

function removePost(){
    let name = $(this).parent().children()[0].innerText;
    let data = loadDB();
    let targetSauce = null;
    for(let i=0; i<data.sauces.length;i++){
        if(data.sauces[i]===null){
            delete data.sauces[i];
            continue;
        }
        if(data.sauces[i].name===name) targetSauce = i;
    }
    delete data.sauces[targetSauce];
    storeDB(data);
    window.location.reload();
}

function loadsauce(name){
    let db = loadDB();
    db.nextSauce = name;
    storeDB(db);
    window.location.href = 'customRecipe.html';
}

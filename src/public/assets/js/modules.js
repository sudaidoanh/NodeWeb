function checkUser() {
    var name = document.getElementById("txtUser").value;
    var nameRegex = /^[A-z_](\w|\.|_){6,20}$/;
    if(nameRegex.test(name) == false) {
        document.getElementById("checkedUser").innerHTML = "From 6-20 characters excluding special characters";
        return false;
    } 
    else {
        document.getElementById("checkedUser").innerHTML = ""; 
        return true;
    }
}

function checkFName() {
    var name = document.getElementById("txtFName").value;
    var nameRegex = /^[A-z_](\w|\.|_){1,30}$/;
    if(nameRegex.test(name) == false) {
        document.getElementById("checkedFName").innerHTML = "From 1-30 characters excluding special characters";
        return false;
    } 
    else {
        document.getElementById("checkedFName").innerHTML = ""; 
        return true;
    }
}

function checkLName() {
    var name = document.getElementById("txtLName").value;
    var nameRegex = /^[A-z_](\w|\.|_){1,20}$/;
    if(nameRegex.test(name) == false) {
        document.getElementById("checkedLName").innerHTML = "From 1-20 characters excluding special characters";
        return false;
    } 
    else {
        document.getElementById("checkedLName").innerHTML = ""; 
        return true;
    }
}

function checkEmail() {
    var name = document.getElementById("txtEmail").value;
    var nameRegex =  /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if(nameRegex.test(name) == false) {
        document.getElementById("checkedEmail").innerHTML = "xxx @ xxx . xxx";
        return false;
    } 
    else {
        document.getElementById("checkedEmail").innerHTML = ""; 
        return true;
    }
}

function checkPass() {
    var pass = document.getElementById("txtPass").value;
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if(regex.test(pass) == false) {
        document.getElementById("checkedPass").innerHTML = "Password must be eight characters including one uppercase letter, one lowercase letter and one alphanumeric";
        return false;
    } 
    else {
        document.getElementById("checkedPass").innerHTML = ""; 
        return true;
    }
}
function checkCPass() {
    var pass = document.getElementById("txtPass").value;
    var cPass = document.getElementById("txtCPass").value;
    if(pass != cPass) {
        document.getElementById("checkedCPass").innerHTML = "Not equal to password";
        return false;
    } 
    else {
        document.getElementById("checkedCPass").innerHTML = ""; 
        return true;
    }

}

function openButton(){
    if(checkUser() == true && checkFName() == true && checkLName() && checkEmail() == true && checkPass() == true && checkCPass() == true){
        document.getElementById("submit").disabled = false;
    } else document.getElementById("submit").disabled = true;
}

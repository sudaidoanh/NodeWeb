
kiem_tra_snt = (n) => {
    var flag = true;
    if (n < 2) {
        flag = false;
    }
    else if(n == 2) {
        flag = true;
    }
    else if(n % 2 == 0) {
        flag = false;
    }
    else {
        for (var i = 3; i < Math.sqrt(n); i+=2) {
            if (n % i == 0) {
                flag = false;
                break;
            }
        }
    }
    return flag;
}

print_kiemtra_snt = () => {
    var number = document.getElementById("number").value;
    number = parseInt(number);
    document.getElementById("result").innerHTML = kiem_tra_snt(number) ? number + " là số nguyên tố" : number + " không là số nguyên tố";
}

print_number = () => {
    var number = document.getElementById("number").value;
    number = parseInt(number);
    var html = '';
    for(var i = 1; i <= number; i++) {
        html += i + ' <br/>';
    }
    document.getElementById("result").innerHTML = html;
}

print_snt = () => {
    var number = document.getElementById("number").value;
    number = parseInt(number);

    var html = '';
    for(var i = 1; i <= number; i++) {
        if(kiem_tra_snt(i)) {
            html += i + ' <br/>';
        }
    }
    document.getElementById("result").innerHTML = html;

}

change_background = () => {
    var getTag_div = document.getElementsByTagName("div");
    if(getTag_div[0].style.background === "") {
        for(var i = 0; i < getTag_div.length; i++) {
            getTag_div[i].style.background = ((i + 1) % 2 == 0) ? "red":"blue";
            }
        }
    else {
        for(var i = 0; i < getTag_div.length; i++) {
            getTag_div[i].style.background = "";
        }
    }
}

console.log("Hello World!");
function importData() {
    var n1 = document.getElementById("n1").value;
    console.log("The user entered: "+n1);
    var n2 = document.getElementById("n2").value;
    console.log("The user entered: "+n2);
    return n1, n2;
}

function rev(s) {
    return s.split('').reverse().join('');
}

function tcmp(n) {

}

function dtbs(n) {
    let s='';
    if(n>=0) {
        while (n!=0) {
            let r = n%2;
            n = parseInt(n/2);
            s += String(r);
        }
        s += '0';
        s = rev(s);
    }
    return s;
}

function badd(n, m) {

}

function asr(n) {

}

function equalize(n,m) {

}

function mul(m, q) {

}

var n1, n2 = importData();
document.getElementById("p").innerHTML += dtbs(n1);

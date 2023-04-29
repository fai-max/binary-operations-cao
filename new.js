console.log("Hello World!");
function importData() {
    var n1 = document.getElementById("n1").value;
    console.log("The user entered: "+n1);
    var n2 = document.getElementById("n2").value;
    console.log("The user entered: "+n2);
    return {n1, n2};
}

function rev(s) {
    return s.split('').reverse().join('');
}

function tcmp(n) {
    let s = rev(n),
        f = 0,
        i = 0;   
    while (f==0) {
        if (s.charAt(i) == '1') {
            console.log("Found you! @"+i);
            f++;
        }
        i++;
    }

    while (i!=s.length) {
        if (s[i] == '0') {
            s =s.slice(0,i)+'1'+s.slice(i+1,s.length);
        }
        else if (s[i] == '1') {
            s =s.slice(0,i)+'0'+s.slice(i+1,s.length);
        }
        i++;
    }
    s = rev(s);
    console.log("comp: "+s);
    return s;
}

function dtbs(n) {
    var s='';
    if(n>=0) {
        while (n!=0) {
            let r = n%2;
            n = parseInt(n/2);
            s += String(r);
        }
        s = s+'0';
        s = rev(s);
    }

    else {
        s = tcmp(dtbs(Math.abs(n)))
    }
    return s;
}

function badd(n, m) {

}

function asr(n) {

}

function equalize(n,m) {
    while(n.length != m.length) {
        if (n.length < m.length) {
            n = n[0]+n;
        }

        else {
            m = m[0]+m;
        }
    }
    return {n, m};
}

function mul(m, q) {
    var n= importData();
    n1 = n.n1;
    n2 = n.n2;
    n1 = dtbs(n1)
    n2 = dtbs(n2)
    n = equalize(n1, n2);
    n1 = n.n;
    n2 = n.m;
    document.getElementById("p").innerHTML += n1+"<br>"+n2;
}

//tcmp('1010');


//dtbs('10');

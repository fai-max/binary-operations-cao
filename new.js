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
    n = rev(n);
    m = rev(m);
    let s = '', 
        c = 0;
    for(let i=0; i<n.length; i++) {
        if(n[i]=='0' && m[i]=='0' && c==0) {
            s += '0';
            c = 0;
        }
        else if(n[i]=='0' && m[i]=='1' && c==0) {
            s += '1';
            c = 0;
        }
        else if(n[i]=='1' && m[i]=='0' && c==0) {
            s += '1';
            c = 0;
        }
        else if(n[i]=='1' && m[i]=='1' && c==0) {
            s += '0';
            c = 1;
        }
        else if(n[i]=='0' && m[i]=='0' && c==1) {
            s += '1';
            c = 0;
        }
        else if(n[i]=='0' && m[i]=='1' && c==1) {
            s += '0';
            c = 1;
        }
        else if(n[i]=='1' && m[i]=='0' && c==1) {
            s += '0';
            c = 1;
        }
        else if(n[i]=='1' && m[i]=='1' && c==1) {
            s += '1';
            c = 1;
        }

    }
    return rev(s);
}

function asr(n) {
    n= rev(n);
    n = n.slice(1,n.length)+n[n.length-1];
    return rev(n);
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

function getOp(n, m) {
    console.log(n);
    n = n[n.length-1];
    n = parseInt(n);
    m = parseInt(m);
    if(m-n > 0) {
        var op = '+';
    }
    else if (m-n < 0) {
        var op = '-';
    }
    else {
        var op = 'nop';
    }
    console.log('op = '+op);
    return op;
}

function btds(n) {
    if(n[0]=='1') {
        n = tcmp(n);
        var op = '-';
    }

    else
        var op = '+';
    n = rev(n);
    var s=0;
    for(let i = 0; i<n.length; i++) {
        s += (2**i)*(parseInt(n[i]));
    }
    return op+s;
}

function action() {
    var n= importData();
    n1 = n.n1;
    n2 = n.n2;
    n1 = dtbs(n1)
    n2 = dtbs(n2)
    n = equalize(n1, n2);
    n1 = n.n;
    n2 = n.m;
    document.getElementById("p").innerHTML = 'INITIAL:<br>';
    let a = '';
    while (a.length != n1.length) {
        a += '0';
    }
    qm = '0';
    m= n1;
    q = n2
    document.getElementById("p").innerHTML += "M: "+m+"<br>"+'A: '+a+' '+'Q: '+q+' '+'Q-1: '+qm+"<br>";
    /*
    document.getElementById("col0").innerHTML += "M: "+n1+"<br>"
    document.getElementById("col0").innerHTML += 'A: '+a+"<br>"
    document.getElementById("col1").innerHTML += 'Q: '+n2+"<br>";
    */
    for(let i=0;i<n1.length; i++) {
        document.getElementById("p").innerHTML += '<br>CYCLE '+(i+1)+'<br>';
        if (getOp(q, qm) == '+') {
            a = badd(a,m);
            var op = 'A+M';
        }
        else if (getOp(q, qm) == '-') {
            a = badd(a,tcmp(m));
            var op = 'A-M';
        }
        else {
            var op = 'NOP';
        }
        console.log("a = "+a);
        document.getElementById("p").innerHTML += op+' '+'A: '+a+' '+'Q: '+q+' '+'Q-1: '+qm+"<br>";
        qm = q[q.length-1];
        q = asr(q);
        q = a[a.length-1]+q.slice(1,q.length);
        a = asr(a);
        document.getElementById("p").innerHTML += 'ASR '+'A: '+a+' '+'Q: '+q+' '+'Q-1: '+qm+"<br>";
    }

    document.getElementById("p").innerHTML += "<br><br>Product = "+a+q+'<br>'+' = '+btds(a+q);
}

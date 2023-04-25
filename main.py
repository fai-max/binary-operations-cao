#booth multiplier

#reverse
def rev(s):
    return s[::-1]
#2's-complement
def tcmp(n):
    s = str(n)
    f = 0
    i = -1
    while f==0:
        if s[i]=='1':
            f = 1
        i -= 1
    while i != -abs(len(s)+1):
        if s[i] == '1':
            s = s[:i]+'0'+s[i+1:]
        elif s[i] == '0':
            s = s[:i]+'1'+s[i+1:]
        i -= 1
    return s
#decimal-to-binary-signed
def dtbs(n):
    s = ''
    if n>=0:
        while n!=0:
            r = n%2
            n = int(n/2)
            s += str(r)
        s +='0'
        s = rev(s)
    else:
        s = dtbs(abs(n))
        f = 0
        i = -1
        while f==0:
            if s[i]=='1':
                f = 1
            i -= 1
        while i != -abs(len(s)+1):
            if s[i] == '1':
                s = s[:i]+'0'+s[i+1:]
            elif s[i] == '0':
                s = s[:i]+'1'+s[i+1:]
            i -= 1
    return s

#binary-adder
def badd(s1, s2):
    i = -1
    a = ''
    c=0
    while i != -len(s1)-1:
        if s1[i] == '0' and s2[i] == '0' and c == 0:
            a += '0'
            c = 0
        elif s1[i] == '0' and s2[i] == '1' and c == 0:
            a += '1'
            c = 0
        elif s1[i] == '1' and s2[i] == '0' and c == 0:
            a += '1'
            c = 0
        elif s1[i] == '0' and s2[i] == '0' and c == 1:
            a += '1'
            c = 0
        elif s1[i] == '0' and s2[i] == '1' and c == 1:
            a += '0'
            c = 1
        elif s1[i] == '1' and s2[i] == '0' and c == 1:
            a += '0'
            c = 1
        elif s1[i] == '1' and s2[i] == '1' and c==0:
            a += '0'
            c = 1
        elif s1[i] == '1' and s2[i] == '1' and c==1:
            a += '1'
            c = 1
        i -= 1    
    return rev(a)
#arithmetic-shifter-right
def asr(s):
    i = -1
    while i != -abs(len(s)):
        #print('s = '+s)
        if i == -1:
            s = s[:i]+s[i-1]
        else:
            s = s[:i]+s[i-1]+s[i+1:]
        i -= 1
    return s
#equalize
def equ(s1, s2):
    while len(s1) != len(s2):
        if len(s1) < len(s2):
            s1 = rev(s1)
            s1 = s1 + s1[-1]
            s1 = rev(s1)
        else:
            s2 = rev(s2)
            s2 = s2 + s2[-1]
            s2 = rev(s2)
    return s1, s2

#multiplication
def mul(m, q):
    a = ''
    for i in range(0, len(m)):
        a = a+'0'
    qm = 0
    mm = tcmp(int(m))
    print('')
    print("INITIAL:")
    print("           M: "+m)
    print("           "+"A: "+a+'        '+"Q: "+str(q)+'        '+"Q-1: "+str(qm))
    print('\n')
    for i in range(0, len(m)):
        print("Cycle-",i+1, sep='')
        if int(qm)-int(q[-1]) > 0:
            a = badd(a, m)
            op = 'A+M'
        elif int(qm)-int(q[-1]) < 0:
            a = badd(a, tcmp(m))
            op = 'A-M'
        else:
            op = 'NOP'
        print(op+'        '+"A: "+a+'        '+"Q: "+str(q)+'        '+"Q-1: "+str(qm))
        op = 'ASR'
        qm = q[-1]
        q = asr(q)
        q = a[-1]+q[1:]
        a = asr(a)
        print(op+'        '+"A: "+a+'        '+"Q: "+str(q)+'        '+"Q-1: "+str(qm))
        print('\n')
        
    prod = a+q
    num = 0
    j = 0
    print("PRODUCT = "+prod)
    if prod[0] == '1':
        prod = rev(tcmp(prod))
        sign = '-'
    else:
        prod = rev(prod)
        sign = '+'
        
    for i in prod:
        num += int(i)*(2**j)
        j += 1
    print('        = '+sign+str(num))

n1 = int(input("Enter multiplicand: "))
n2 = int(input("Enter multiplier: "))
s1 = dtbs(n1)
s2 = dtbs(n2)
s1, s2 = equ(s1, s2)
mul(s1, s2)

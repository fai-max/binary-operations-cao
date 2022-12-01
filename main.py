def getBin(n):
    ns=''
    an = abs(n)
    while an>=1:
        ns += str(an%2)
        an = int(an/2)
    ns = ''.join(reversed(ns)) 
    ns = '0'+ns
    if n<0:
        nns = ''
        for i in ns:
            if i=='0':
                nns += '1'
            elif i=='1':
                nns += '0'
    print(nns)
    return int(ns)


def doBooth(n1, n2):
    a = len(str(n1))
    b = len(str(n2))
    n = ''
    
    for i in range(0,abs(a-b)):
        n = n.join('0')
    print(n)
    if a>b:
        n2 = n+str(n2)
    else:
        n1 = n+str(n1)
        
    print(n1)
    print(n2)          


#n1 = int(input("Enter a number: "))
#n2 = int(input("Enter a number: "))

n1 = getBin(int(input("Enter 1st number: ")))
n2 = getBin(int(input("Enter 2nd number: ")))
print(n1)
print(n2)

doBooth(n1, n2)

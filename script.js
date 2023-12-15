function enc(){
    let ins=document.getElementById("ins").value;
    let res="";
    let n=parseInt(document.getElementById("n").value);
    let e=parseInt(document.getElementById("e").value);
    for(var i=0;i<ins.length;i++){
      let c=ex_mod(ins[i].charCodeAt(0)-'a'.charCodeAt(0),e,n);
      console.debug(c);
      let ch=String.fromCharCode(c+'a'.charCodeAt(0));
      res=res+ch;
    }
    document.getElementById("en").value=res;
  }
 
function dec(){
    let ind=document.getElementById("ind").value;
    let res="";
    let n=parseInt(document.getElementById("n").value);
    let d=parseInt(document.getElementById("d").value);
    for(var i=0;i<ind.length;i++){
        let c=ex_mod(ind[i].charCodeAt(0)-'a'.charCodeAt(0),d,n);
        console.debug(c);
        let ch=String.fromCharCode(c+'a'.charCodeAt(0));
        res=res+ch;
    }
      document.getElementById("de").value=res;
} 

function ex_mod(x,y,p){
    let res = 1;
    x = x % p; 
    if (x == 0) 
      return 0; 
    while (y > 0){    
        if (y & 1)  
            res = (res*x) % p;  
        y = y >> 1;
        x = (x*x) % p;  
    }  
    return res; 
}

function generate(){
  let p = document.getElementById("p").value;
  let q = document.getElementById("q").value;
  let n = p*q;
  document.getElementById("n").value = n;
  document.getElementById("phi").value = (p-1)*(q-1);
  let e = get_coprime();
  document.getElementById("e").value = e;
  let d = select_d();
  document.getElementById("d").value = d;
  document.getElementById("pub").value = "{"+e+","+n+"}";
  document.getElementById("pri").value = "{"+d+","+n+"}";
}

function gcd(a,b) {
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

function coprime(a,b) {
  return (gcd(a,b)===1);
}

function get_coprime() {
  let phi=document.getElementById("phi").value;
  for(var i=2;i<phi;i+=1){
    if(coprime(i,phi)==1){
      return i;
    }
  }
}

function select_d() {
  let e=document.getElementById("e").value;
  let phi=document.getElementById("phi").value;
  for(var d=1;d<=phi;d++){
    if((d*e)%phi==1)
      return d;
  }
  return -1;
}

const characters = ['#', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 
                    'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ',
                     'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

function encrypt() {
const p = parseInt(document.getElementById('p').value);
const q = parseInt(document.getElementById('q').value);

if (isTheNumberSimple(p) && isTheNumberSimple(q)) {
const s = document.getElementById('text').value.toUpperCase();
const n = p * q;
const m = (p - 1) * (q - 1);
const d = calculate_d(m);
const e_ = calculate_e(d, m);

const result = RSA_Encode(s, e_, n);

document.getElementById('d').value = d.toString();
document.getElementById('n').value = n.toString();

document.getElementById('output').innerText = result.join('\n');
} else {
alert('p или q - не простые числа!');
}
}

function decrypt() {
const d = parseInt(document.getElementById('d').value);
const n = parseInt(document.getElementById('n').value);

if (d && n) {
const input = document.getElementById('output').value.split('\n');

const result = RSA_Decode(input, d, n);

document.getElementById('decryptedText').innerText = result;
} else {
alert('Введите секретный ключ!');
}
}

function isTheNumberSimple(n) {
if (n < 2) return false;
if (n === 2) return true;

for (let i = 2; i < n; i++) {
if (n % i === 0) return false;
}

return true;
}

function rsaEncode(s, e, n) {
const result = [];

for (let i = 0; i < s.length; i++) {
const index = characters.indexOf(s[i]);
const bi = bigInt(index).pow(e);
const n_ = bigInt(n);
const biMod = bi.mod(n_);

result.push(biMod.toString());
}

return result;
}

function rsaDecode(input, d, n) {
let result = '';

input.forEach((item) => {
const bi = bigInt(parseFloat(item));
const biPow = bi.pow(d);
const n_ = bigInt(n);
const biMod = biPow.mod(n_);
const index = parseInt(biMod.toString());

result += characters[index].toString();
});

return result;
}

function calculate_d(m) {
let d = m - 1;

for (let i = 2; i <= m; i++) {
if (m % i === 0 && d % i === 0) {
d--;
i = 1;
}
}

return d;
}

function calculate_e(d, m) {
let e = 10;
let found = false;
while(!found) {
  if((e * d) % m === 1 ) {
    found = true;
  } else {
       e++;
    }
  }
  return e;
}

 
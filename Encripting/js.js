let text = document.getElementById('enterText');
let key = document.getElementById('key');
let start = document.getElementById('encript');
let div = document.getElementsByTagName('div');
let asd = document.getElementById('result');

let changeAlphabet = '';

let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
let noSymbols = '-=~\"\'#$%&*^:<>?/!{(|)}.1234567890\, '


start.addEventListener('click', () => {
    let el = document.getElementsByClassName('.result');

    if (typeof(el) != 'undefined' && el != null){
        textEncrpting();
} else{
    document.removeChild(crtp);
    textEncrpting();
}
})

let textEncrpting = function () {
    text = text.value;
    text = text.toLowerCase()
    key = Number(key.value);
    let result = '';
    if(typeof text === 'string' || typeof text + '' === 'string') {
        changeAlphabet = alphabet.slice(key);
        changeAlphabet += alphabet.slice(0, key);
        changeAlphabet += noSymbols;
        alphabet += noSymbols;
    
        for(let i = 0; i < text.length; i++) {
            let order = alphabet.indexOf(text[i]);
    
            result += changeAlphabet[order];
        }
        asd.value = result;
    } else {
        alert('Please, enter a text message!')
    }
}

// let text = 'abc';

// for(let i = 0; i < text.length; i++) {
//     let order = text.indexOf(text[i]);
//     alert(order);
// }









// document.getElementById('enterText').addEventListener('input', () => {
//     let text = this.value;
// });

// document.getElementById('num').addEventListener('input', () => {
//     let key = this.value;
// });


// const promis = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         if(true) {
//             resolve('yes');
//         } else {
//             reject('No!')
//         }
//     }, 2000)
// });

// promis.then(
//     data => console.log('Yes: ', data),
//     error => console.log('error:' , error)
// )

// let getArgs = (...args) => {
//     console.log(args);
// }

// getArgs(1, 'Shwine', true);

// let arr1 = [1,2,3];
// let arr2 = [4,5,6];

// arr2.push(...arr1);

// console.log(arr2);

// var user = {
//     name: 'John Smith',
//     getName: function() {
//         console.log(this.name);
//     }
// };
// console.log(window.name()); 
let form = document.querySelector('.formWithValidation');

let userName = document.querySelector('.userName');
let userEmail = document.querySelector('.userEmail');
let userPhone = document.querySelector('.userPhone');
let userCountry = document.querySelector('.userCountry');
let userBirthDay = document.querySelector('.userBirthDay');
let password = document.querySelector('.password');
let passwordConfirm = document.querySelector('.passwordConfirm');

let fields = document.querySelectorAll('.field');

// Paterns list: 
let textPattern = /^[а-яa-z]+$/i;
let patternForEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
let patterForPhoneNumber = /^((\+38)[\- ]?)?(\(\d{3}\)?[\- ]?)?[\d\- ]{10}$/;
let datePattern = /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}/;
let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

let errorGenerator = function (errorText) { // function to generate errors
    let error = document.createElement('div');
    error.className = 'error';
    error.innerHTML = errorText;
    return error;
}

let removeErrors = function () { //function to remove existing errors
    let errors = form.querySelectorAll('.error');

    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
}

let emptyFied = function () { //checking for empty fields
    for(let i = 0; i < fields.length; i++) {
        if(!fields[i].value) {
            let error = errorGenerator('Пустое поле!');
            form[i].parentElement.insertBefore(error, fields[i].nextSibling);
        }
    }
}

let checkPasswordMatch = function () { // password confirmation checking
    if(password.value !== passwordConfirm.value){
        var error = errorGenerator('Пароли не совпадают!');
        password.parentElement.insertBefore(error, passwordConfirm.nextSibling);
    }
}

let submitForm = function (event) { // check the validity of all fields and submit the form
    event.preventDefault();
    removeErrors();
    emptyFied();
    checkPasswordMatch();

    if(textPattern.test(userName.value) !== false &&
    patternForEmail.test(userEmail.value) !== false &&
    patterForPhoneNumber.test(userPhone.value) !== false &&
    textPattern.test(userCountry.value) !== false &&
    datePattern.test(userBirthDay.value) !== false &&
    passwordPattern.test(password.value) !== false &&
    passwordPattern.test(passwordConfirm.value) !== false &&
    password.value == passwordConfirm.value){
        form.submit();
    }
}

form.addEventListener('submit', submitForm);

//validation for all fields
userName.addEventListener('input', () => {
    removeErrors();
    if(textPattern.test(userName.value) == false){
        let error = errorGenerator('Поле должно содержать только буквы!');
        userName.parentElement.insertBefore(error, userName.nextSibling);
    }
});

userEmail.addEventListener('input', () => {
    removeErrors();
    if(patternForEmail.test(userEmail.value) == false){
        let error = errorGenerator('Почта должна быть вида: example@gmail.com');
        userEmail.parentElement.insertBefore(error, userEmail.nextSibling);
    }
});
userPhone.addEventListener('input', () => {
    removeErrors();
    if(patterForPhoneNumber.test(userPhone.value) == false){
        let error = errorGenerator('Номер телефона вида: +380 00 00 000 00');
        userPhone.parentElement.insertBefore(error, userPhone.nextSibling);
    }
});
userCountry.addEventListener('input', () => {
    removeErrors();
    if(textPattern.test(userCountry.value) == false){
        let error = errorGenerator('Поле должно содержать только буквы!');
        userCountry.parentElement.insertBefore(error, userCountry.nextSibling);
    }
});
userBirthDay.addEventListener('input', () => {
    removeErrors();
    if(datePattern.test(userBirthDay.value) == false){
        let error = errorGenerator('Введите данные в формате: дд.мм.гггг');
        userBirthDay.parentElement.insertBefore(error, userBirthDay.nextSibling);
    }
});
password.addEventListener('input', () => {
    removeErrors();
    if(passwordPattern.test(password.value) == false){
        let error = errorGenerator('Пароль должен содержать цифру, одну большую и одну маленькую буквы');
        password.parentElement.insertBefore(error, password.nextSibling);
    }
});
passwordConfirm.addEventListener('input', () => {
    removeErrors();
    if(passwordPattern.test(passwordConfirm.value) == false){
        let error = errorGenerator('Пароль должен содержать цифру, одну большую и одну маленькую буквы');
        passwordConfirm.parentElement.insertBefore(error, passwordConfirm.nextSibling);
    }
});
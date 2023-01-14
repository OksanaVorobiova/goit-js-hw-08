import throttle from 'lodash.throttle'


const refs = {
    formEl: document.querySelector('.feedback-form'),
    inputEl: document.querySelector('input[name="email"]'),
    textarea: document.querySelector('textarea'),
}

const { formEl, inputEl, textarea, } = refs;
const STORAGE_KEY = "feedback-form-state";
const data = {};

formEl.addEventListener('input', throttle(onFormInput, 500));
window.addEventListener('DOMContentLoaded', onRefresh);
formEl.addEventListener('submit', onFormSubmit);


function onFormInput(e) {
    data[e.target.name] = e.target.value;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
}


function onRefresh() {
   const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(savedData !== {}) {
        inputEl.value = savedData.email;
        textarea.value = savedData.message;
    } 
}

function onFormSubmit(ev) {
    ev.preventDefault();
    window.removeEventListener('DOMContentLoaded', onRefresh);

    const {
        elements: { email, message }
    } = ev.currentTarget;
    
    console.log({email: email.value, message: message.value});
    localStorage.removeItem(STORAGE_KEY);
    ev.currentTarget.reset();

}


 
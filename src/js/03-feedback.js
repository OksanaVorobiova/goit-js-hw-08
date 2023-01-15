import throttle from 'lodash.throttle'



const refs = {
    formEl: document.querySelector('.feedback-form'),
    inputEl: document.querySelector('input[name="email"]'),
    textarea: document.querySelector('textarea'),
}

const { formEl, inputEl, textarea, } = refs;
const STORAGE_KEY = "feedback-form-state";

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

let feedbackData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

returnData();

function onFormInput(e) {
    feedbackData[e.target.name] = e.target.value;
    console.log(feedbackData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackData));

}


function returnData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);
       
    if (parsedData) {
        inputEl.value = feedbackData.email || '';
        textarea.value = feedbackData.message || '';
    }

}

function onFormSubmit(ev) {
    ev.preventDefault();
    console.log(feedbackData);
    ev.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    feedbackData = {};
}


 
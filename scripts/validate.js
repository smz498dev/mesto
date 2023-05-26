function showError (formElement, inputElement, errorMessage)  {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input-item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};
function hideError (formElement, inputElement)  {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input-item_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
 }else{
    hideError(formElement, inputElement);
 };
};

formEdit.addEventListener('submit', function (evt) {
evt.preventDefault();
});



inputName.addEventListener('input', function () {
  checkInputValidity(formEdit, inputName);
});  

function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-item'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    })
  });
} 


function enableValidation () {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  });
}

enableValidation();

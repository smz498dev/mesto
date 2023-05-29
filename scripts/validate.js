const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_state_inactive',
  inputErrorClass: 'popup__input-item_type_error',
  errorClass: 'popup__input-error_active'
};

//Функция показывает ошибку // работает
function showError (formElement, inputElement, errorMessage, config)  {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${config.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${config.errorClass}`);
};
//Функция скрывает ошибку // работает
function hideError (formElement, inputElement, config)  {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${config.inputErrorClass}`);
  errorElement.classList.remove(`${config.errorClass}`);
  errorElement.textContent = '';
  };

//Функция проверяет валидность инпута
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  }else{
    hideError(formElement, inputElement, validationConfig);
 };
};

//Функция вешает слушатели событий 
function setEventListeners (formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(`${config.inputSelector}`));
  const buttonElement = formElement.querySelector(`${config.submitButtonSelector}`);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, validationConfig);
     });
  });
}; 

//Функция, которая включает валидацию форм
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(`${config.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

//Функция, проверяющая есть ли в списке невалидные инпуты
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return inputElement.validity.valid;
  });
};

//Функция, которая меняет состояние кнопки сабмит
function toggleButtonState (inputList, buttonElement, config) {
  if (!hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${config.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
  }else{
    buttonElement.classList.remove(`${config.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation(validationConfig);
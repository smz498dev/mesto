const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_state_inactive',
  inputErrorClass: 'popup__input-item_type_error',
  errorClass: 'popup__input-error_active'
};

//Функция показывает ошибку // работает
const showError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${config.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${config.errorClass}`);
};
//Функция скрывает ошибку // работает
const hideError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${config.inputErrorClass}`);
  errorElement.classList.remove(`${config.errorClass}`);
  errorElement.textContent = '';
  };

 
//Функция проверяет валидность инпута
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  }else{
    hideError(formElement, inputElement, validationConfig);
 };
};

//Функция, проверяющая есть ли в списке невалидные инпуты
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableBtn = (buttonElement, config) => {
  buttonElement.classList.add(`${config.inactiveButtonClass}`);
  buttonElement.setAttribute('disabled', true);
};

//Функция, которая меняет состояние кнопки сабмит
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableBtn(buttonElement, config);
  }else{
    buttonElement.classList.remove(`${config.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  };
};



//Функция вешает слушатели событий 
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(`${config.inputSelector}`));
  const buttonElement = formElement.querySelector(`${config.submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, validationConfig);
     });
  });
}; 

//Функция, которая включает валидацию форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(`${config.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig);
const formError = formEdit.querySelector(`.${inputName.id}-error`);


function showError (input, errorMessage)  {
  input.classList.add('popup__input-item_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
};
function hideError (input)  {
  input.classList.remove('popup__input-item_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
};

const checkInputValidity = () => {
  if (!inputName.validity.valid) {
    showError(inputName, inputName.validationMessage);
 }else{
    hideError(inputName);
 };
};

formEdit.addEventListener('submit', function (evt) {
evt.preventDefault();
});



inputName.addEventListener('input', function () {
  checkInputValidity();
});  
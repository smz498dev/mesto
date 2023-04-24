// Открытие попапа по клику
function popupOpen() {
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
}
let btnEdit = document.querySelector('.profile__info-edit');
btnEdit.addEventListener('click', popupOpen);

// Закрытие попапа по клику на крестик
function popupClose() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

let btnClose = document.querySelector('.popup__close-icon');
btnClose.addEventListener('click', popupClose);

//Действие при нажатии на кнопку сохранить

function saveDataForm() {
  let profileTitle = document.querySelector('.profile__title');
  let profileSubtitle = document.querySelector('.profile__subtitle');
  let inputItem = document.querySelectorAll('.popup__input-item');

  let nameInput = inputItem[0].value;
  let jobInput = inputItem[1].value;

  profileTitle.textContent = `${nameInput}`;
  profileSubtitle.textContent = `${jobInput}`;

  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

let btnSave = document.querySelector('.popup__save-btn');
btnSave.addEventListener('click', (event) => {
  event.preventDefault();
});
btnSave.addEventListener('click', saveDataForm);




 




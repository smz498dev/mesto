let popup = document.querySelector('.popup');
let btnEdit = document.querySelector('.profile__info-edit');
let btnClose = document.querySelector('.popup__close-icon');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let inputName = document.querySelector('#input-name');
let inputJob = document.querySelector('#input-job');
let formEdit = document.querySelector('.popup__form');

// Открытие попапа по клику
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
}
// Закрытие попапа 
function popupClose() {
  popup.classList.remove('popup_opened');
}
//Действие при нажатии на кнопку сохранить
function saveDataForm() {
  event.preventDefault();

  let nameInput = inputName.value;
  let jobInput = inputJob.value;

  profileTitle.textContent = `${nameInput}`;
  profileSubtitle.textContent = `${jobInput}`;

  popupClose();
}

//listeners 
btnEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', popupClose);
formEdit.addEventListener('submit', saveDataForm);




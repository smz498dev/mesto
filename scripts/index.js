const popupAdd = document.querySelector('.popup_add-mode');
const popupEdit = document.querySelector('.popup_edit-mode');
const popupImg = document.querySelector('.popup_img-mode');
const fullImg = document.querySelector('.popup__image');
const btnEdit = document.querySelector('.profile__info-edit');
const btnCloseEdit = document.querySelector('.popup__close-icon_edit');
const btnCloseAdd = document.querySelector('.popup__close-icon_add');
const btnCloseImg = document.querySelector('.popup__close-icon_img');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const btnAdd = document.querySelector('.profile__btn-add');
const titleCard = document.querySelector('.element__title');
const popoupImageCaption = document.querySelector('.popup__caption');
//формы и инпуты
const inputName = document.querySelector('#input-name');
const inputJob = document.querySelector('#input-job');
const inputNamePlace = document.querySelector('#input-name-place');
const inputUrlPlace = document.querySelector('#input-url');
const formEdit = document.querySelector('#popupFormEdit');
const formAdd = document.querySelector('#popupFormAdd');

const elementTemplate = document.querySelector('#elementTemplate').content;

// Открытие попапа по клику
function openPopup(mode) {
  mode.classList.remove('popup_closed');
  mode.classList.add('popup_opened');
}
//Закрытие попапа
function closePopup(mode) {
  mode.classList.remove('popup_opened');
  mode.classList.add('popup_closed');
}

//Действие при нажатии на кнопку сохранить форму редактирования профиля
function saveDataFormEdit(evt) {
  evt.preventDefault();

  const nameInput = inputName.value;
  const jobInput = inputJob.value;

  profileTitle.textContent = `${nameInput}`;
  profileSubtitle.textContent = `${jobInput}`;

  closePopup(popupEdit);
}

//Действие при нажатии на кнопку создать (создание и добавление новой карточки)
function createNewCard(evt) {
  evt.preventDefault();

  const namePlace = inputNamePlace.value;
  const urlPlace = inputUrlPlace.value;

  const newCard = {
    name: `${namePlace}`,
    link: `${urlPlace}`,
  };

  initialCards.push(newCard);

  const newElement = elementTemplate.querySelector('.element').cloneNode(true);

  newElement.querySelector('.element__img').src = `${
    initialCards[initialCards.length - 1].link
  }`;
  newElement.querySelector('.element__title').textContent = `${
    initialCards[initialCards.length - 1].name
  }`;

  elements.prepend(newElement);

  addListenerToImages();
  addListenersLikeAndDel(newElement);

  inputNamePlace.value = '';
  inputUrlPlace.value = '';

  closePopup(popupAdd);
}

//listeners открытие и закрытие попапов, сабмит форм.
btnEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
});
btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});
btnCloseEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

btnCloseAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});
btnCloseImg.addEventListener('click', () => {
  closePopup(popupImg);
});
formEdit.addEventListener('submit', saveDataFormEdit);
formAdd.addEventListener('submit', createNewCard);

function addListenersLikeAndDel(item) {
  item.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  item.querySelector('.element__remove').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
}

//Добавление карточек из "коробки" при загрузке страницы:
function loadCardsFromBox() {
  initialCards.forEach((item) => {
    const newElement = elementTemplate
      .querySelector('.element')
      .cloneNode(true);
    newElement.querySelector('.element__img').src = `${item.link}`;
    newElement.querySelector('.element__title').textContent = `${item.name}`;
    elements.prepend(newElement);
    addListenerToImages();
    addListenersLikeAndDel(newElement);
  });
}

loadCardsFromBox();

//Функция вешает слушатели по клику на все картинки карточек
function addListenerToImages() {
  let imgElements = document.querySelectorAll('.element__img');
  imgElements.forEach((item) => {
    item.addEventListener('click', (evt) => {
      openPopup(popupImg);
      let imgElement = evt.target;
      fullImg.src = imgElement.src;

      let capText = imgElement
        .closest('.element')
        .querySelector('.element__title').textContent;

      fullImg.alt = capText;

      popoupImageCaption.textContent = capText;
    });
  });
}

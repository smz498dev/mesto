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
const popupImageCaption = document.querySelector('.popup__caption');

const inputName = document.querySelector('#input-name');
const inputJob = document.querySelector('#input-job');
const inputNamePlace = document.querySelector('#input-name-place');
const inputUrlPlace = document.querySelector('#input-url');
const formEdit = document.forms['edit_profile'];
const formAdd = document.forms['add_card'];

const elementTemplate = document.querySelector('#elementTemplate').content;

//Функции:

// Открытие попапа
function openPopup(mode) {
  mode.classList.add('popup_opened');
}
//Закрытие попапа
function closePopup(mode) {
  mode.classList.remove('popup_opened');
}
//Добавление кнопки лайка
function addBtnLike (item) {
  item.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
} 
//Добавление кнопки удалить 
function addBtnRemove(item) {
  item.querySelector('.element__remove').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
} 

//Сохранить (редактирование профиля)
function saveDataFormEdit(evt) {
  evt.preventDefault();

  const nameInput = inputName.value;
  const jobInput = inputJob.value;

  profileTitle.textContent = `${nameInput}`;
  profileSubtitle.textContent = `${jobInput}`;

  closePopup(popupEdit);
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
formAdd.addEventListener('submit', addNewCard);


//создание новой карточки
function createCard(textTitle, srcImage) {
 
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = newElement.querySelector('.element__img');
  const elementTitle = newElement.querySelector('.element__title');
  
  elementTitle.textContent = textTitle;
  elementImage.src = srcImage;
  elementImage.alt = textTitle;
  
  
  elementImage.addEventListener('click', (evt => {
    openPopup(popupImg);
    const imgElement = evt.target;
    fullImg.src = imgElement.src;
    fullImg.alt = elementTitle.textContent;
    popupImageCaption.textContent = textTitle;
  }))

  addBtnLike(newElement);
  addBtnRemove(newElement);

  return elements.prepend(newElement);
}


function addOneCard(element) {
  return elements.prepend(element);
}
//Добавление 1 карточки через форму)
function addNewCard(evt) {
  evt.preventDefault();

  const namePlace = inputNamePlace.value;
  const srcImage = inputUrlPlace.value;

  createCard(namePlace, srcImage);
  closePopup(popupAdd);

  inputNamePlace.value = '';
  inputUrlPlace.value = '';
}

//Добавление карточек из "коробки" при загрузке страницы:
function loadCardsFromBox() {
  initialCards.forEach((item) => {
    const nameOfCard = item.name;
    const linkToCard = item.link;
    createCard(nameOfCard, linkToCard);
  });
}

loadCardsFromBox();



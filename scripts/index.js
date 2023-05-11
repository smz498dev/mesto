const popupAdd = document.querySelector('#popupAdd');
const popupEdit = document.querySelector('#popupEdit');
const popupImg = document.querySelector('#popupImg');
const fullImg = document.querySelector('.popup__image');
const btnEdit = document.querySelector('.profile__info-edit');
const btnCloseEdit = document.querySelector('#btnCloseEdit');
const btnCloseAdd = document.querySelector('#btnCloseAdd');
const btnCloseImg = document.querySelector('#btnCloseImg');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('#input-name');
const inputJob = document.querySelector('#input-job');
const inputNamePlace = document.querySelector('#input-name-place');
const inputUrlPlace = document.querySelector('#input-url');
const formEdit = document.querySelector('#popupFormEdit');
const formAdd = document.querySelector('#popupFormAdd');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#elementTemplate').content;
const btnAdd = document.querySelector('.profile__btn-add');


// Открытие попапа по клику

function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function openPopupImg(urlImg, nameImg) {
  popupImg.classList.add('popup_opened');
    fullImg.src = urlImg;
    fullImg.alt = nameImg;
  }

openPopupImg()

// Закрытие попапа 
function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}
function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}

function closePopupImg() {
  popupImg.classList.remove('popup_opened');
}


//Действие при нажатии на кнопку сохранить
function saveDataFormEdit(evt) {
  evt.preventDefault();

  const nameInput = inputName.value;
  const jobInput = inputJob.value;

  profileTitle.textContent = `${nameInput}`;
  profileSubtitle.textContent = `${jobInput}`;
  closePopupEdit();
}


//Действие при нажатии на кнопку создать (создание и добавление нового места)
function createNewPlace(evt) {
  evt.preventDefault();

  const namePlace = inputNamePlace.value;
  const urlPlace = inputUrlPlace.value;
  
  const newCard = {
    name:`${namePlace}`, 
    link:`${urlPlace}`
  };

  initialCards.push(newCard);
  
  let newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__img').src = `${initialCards[initialCards.length - 1].link}`;
  newElement.querySelector('.element__title').textContent = `${initialCards[initialCards.length - 1].name}`;
  elements.prepend(newElement);
  newElement.querySelector('.element__like').addEventListener('click', (evt)=> {
    evt.target.classList.toggle('element__like_active');
  });
  newElement.querySelector('.element__remove').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  inputNamePlace.value = '';
  inputUrlPlace.value = '';
  
  closePopupAdd();
}

//listeners 
btnEdit.addEventListener('click', openPopupEdit);
btnAdd.addEventListener('click', openPopupAdd);

btnCloseEdit.addEventListener('click', closePopupEdit);
btnCloseAdd.addEventListener('click', closePopupAdd);
btnCloseImg.addEventListener('click', closePopupImg);

formEdit.addEventListener('submit', saveDataFormEdit);
formAdd.addEventListener('submit', createNewPlace);

// const allCard = document.querySelectorAll('.element');
// const allCardArray = Array.from(allCard);

// console.log(allCardArray);

//Добавление карточек из "коробки" при загрузке страницы:
function addNewCard () {
initialCards.forEach((item) => {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__img').src = `${item.link}`;
  newElement.querySelector('.element__title').textContent = `${item.name}`;
  elements.prepend(newElement);
  newElement.querySelector('.element__like').addEventListener('click', (evt)=> {
    evt.target.classList.toggle('element__like_active');
  });
  newElement.querySelector('.element__remove').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
});
};

addNewCard();











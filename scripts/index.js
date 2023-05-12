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

//---------------------------------------------
// Открытие попапа по клику
//Попап редактирования профиля
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
}
//Попап добавления новой карточки
function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}
//Попап при клике на картинку.
function openPopupImg() {
  popupImg.classList.add('popup_opened');
  }
//-----------------------------------------------

//Закрытие попапа 
//ред. профиль
function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}
//добавление карточки
function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}
//картинка fullsize
function closePopupImg() {
  popupImg.classList.remove('popup_opened');
}
//-----------------------------------------------

//Действие при нажатии на кнопку сохранить
function saveDataFormEdit(evt) {
  evt.preventDefault();

  const nameInput = inputName.value;
  const jobInput = inputJob.value;

  profileTitle.textContent = `${nameInput}`;
  profileSubtitle.textContent = `${jobInput}`;
  closePopupEdit();
}

//Действие при нажатии на кнопку создать (создание и добавление новой карточки)
function createNewCard(evt) {
  evt.preventDefault();

  const namePlace = inputNamePlace.value;
  const urlPlace = inputUrlPlace.value;
  
  const newCard = {
    name:`${namePlace}`, 
    link:`${urlPlace}`
  };
  initialCards.push(newCard);
  
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  

  newElement.querySelector('.element__img').src = `${initialCards[initialCards.length - 1].link}`;
  newElement.querySelector('.element__title').textContent = `${initialCards[initialCards.length - 1].name}`;

  elements.prepend(newElement);

  addListenerToImages();

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

//listeners открытие и закрытие попапов, сабмит форм.
btnEdit.addEventListener('click', openPopupEdit);
btnAdd.addEventListener('click', openPopupAdd);
btnCloseEdit.addEventListener('click', closePopupEdit);
btnCloseAdd.addEventListener('click', closePopupAdd);
btnCloseImg.addEventListener('click', closePopupImg);
formEdit.addEventListener('submit', saveDataFormEdit);
formAdd.addEventListener('submit', createNewCard);



//Добавление карточек из "коробки" при загрузке страницы:
function loadCardsFromBox () {
initialCards.forEach((item) => {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__img').src = `${item.link}`;
  newElement.querySelector('.element__title').textContent = `${item.name}`;
  elements.prepend(newElement);
  addListenerToImages();
  newElement.querySelector('.element__like').addEventListener('click', (evt)=> {
    evt.target.classList.toggle('element__like_active');
  });
  newElement.querySelector('.element__remove').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
});
};
loadCardsFromBox();

//Функция вешает слушатели по клику на все картинки карточек
function addListenerToImages(){
  let imgElements = document.querySelectorAll('.element__img');
  imgElements.forEach((item) => {
    item.addEventListener('click', (evt) =>{
      openPopupImg();
      let imgElement =  evt.target;
      fullImg.src = imgElement.src;
      
     let capText = imgElement.closest('.element').querySelector('.element__title').textContent;
      
     fullImg.alt = capText;

     popoupImageCaption.textContent = capText;
      
      
      console.log(popoupImageCaption);
  });
 });
};








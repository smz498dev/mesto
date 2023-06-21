import {Card} from '../scripts/classes/Card.js';


const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_add-mode');
const popupEdit = document.querySelector('.popup_edit-mode');
const popupImg = document.querySelector('.popup_img-mode');
const fullImg = document.querySelector('.popup__image');
const btnEdit = document.querySelector('.profile__info-edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const btnAdd = document.querySelector('.profile__btn-add');

const popupImageCaption = document.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close-icon');

const formEdit = document.forms['edit_profile'];
const formAdd = document.forms['add_card'];
const inputName = formEdit.elements['person-name'];
const inputJob = formEdit.elements['person-job'];
const inputNamePlace = formAdd.elements['name-place'];
const inputUrlPlace = formAdd.elements['url-place'];


export {popup, popupImg, fullImg, popupImageCaption };


//Загрузка карточек "из коробки"
initialCards.forEach((item) => {
  const card = new Card (item, '.element-template');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
})



//Функции:

//Закрытие Попапа на ESC
function closeEsc (evt) {
  const key = evt.key;
    if (key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
        };
};

// Открытие попапа
export function openPopup(mode) {
  mode.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
};

//Закрытие попапа
function closePopup(mode) {
  mode.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
  };

//Сохранить (редактирование профиля)
function saveDataFormEdit(evt) {
  evt.preventDefault();

  const nameInput = inputName.value;
  const jobInput = inputJob.value;
  
  profileTitle.textContent = `${nameInput}`;
  profileSubtitle.textContent = `${jobInput}`;

  closePopup(popupEdit);
};

//listeners открытие и закрытие попапов, сабмит форм.
btnEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
  
  clearErrors(formEdit, validationConfig);
  
});

btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);

  clearErrors(formAdd, validationConfig);
});

//Закрытие popup кликом на overlay
function closePopupOverlay (mode) {
  mode.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(mode);
    };
  });
};

//Закрытие попапов на X
closeButtons.forEach((btn) => {
  const popupThis = btn.closest('.popup');
  btn.addEventListener('click', () => (closePopup(popupThis)));
  closePopupOverlay(popupThis);
  });
  
formEdit.addEventListener('submit', saveDataFormEdit);
formAdd.addEventListener('submit', addNewCard);



// Добавление 1 карточки через форму:

function addCard(item) {
  elements.prepend(item);
};

function addNewCard(evt) {
  
  evt.preventDefault();
  
  const newOneCard = {
      name: `${inputNamePlace.value}`,
      link: `${inputUrlPlace.value}`
    };

  const btnCreate = formAdd.querySelector('.popup__save-btn');
  const newCard = new Card (newOneCard, '.element-template').generateCard();

  addCard(newCard);
  
  closePopup(popupAdd);

  disableBtn(btnCreate, validationConfig);

  evt.target.reset();
};


//Загрузка карточек из коробки





// СТАРАЯ РЕАЛИЗАЦИЯ
// const titleCard = document.querySelector('.element__title');
// const elementTemplate = document.querySelector('#elementTemplate').content;


//Добавление кнопки лайка
// function addBtnLike (item) {
//   item.querySelector('.element__like').addEventListener('click', (evt) => {
//     evt.target.classList.toggle('element__like_active');
//   });
// }; 
// //Добавление кнопки удалить 
// function addBtnRemove(item) {
//   item.querySelector('.element__remove').addEventListener('click', (evt) => {
//     evt.target.closest('.element').remove();
//   });
// }; 


//создание новой карточки

// function createCard(textTitle, srcImage) {
 
//   const newElement = elementTemplate.querySelector('.element').cloneNode(true);
//   const elementImage = newElement.querySelector('.element__img');
//   const elementTitle = newElement.querySelector('.element__title');
  
//   elementTitle.textContent = textTitle;
//   elementImage.src = srcImage;
//   elementImage.alt = textTitle;
  
//   elementImage.addEventListener('click', (evt) => {
//     openPopup(popupImg);
//     const imgElement = evt.target;
//     fullImg.src = imgElement.src;
//     fullImg.alt = elementTitle.textContent;
//     popupImageCaption.textContent = textTitle;
//   });
 
//   addBtnLike(newElement);
//   addBtnRemove(newElement);
  
//   return newElement;
// };

//Добавление карточек из "коробки" при загрузке страницы:
// function loadCardsFromBox() {
//   initialCards.forEach((item) => {

//     const nameOfCard = item.name;
//     const linkToCard = item.link;

//     addCard(createCard(nameOfCard, linkToCard));
    
//   });
// }
 
// loadCardsFromBox();


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
const titleCard = document.querySelector('.element__title');
const popupImageCaption = document.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close-icon');
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

//Закрытие попапов
closeButtons.forEach((btn) => {
  const popupThis = btn.closest('.popup');
  btn.addEventListener('click', () => (closePopup(popupThis)));
  closePopupEsc(popupThis);
  closePopupOverlay (popupThis)

  });
  //Закрытие popup клавишей ESC
  function closePopupEsc (mode) {
    document.addEventListener('keydown', (evt) => {
    const key = evt.key;
    if (key === 'Escape') {
      closePopup(mode);
    }
    })
  };
  //Закрытие popup кликом на overlay
  function closePopupOverlay (mode) {
    mode.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        closePopup(mode);
      }
    })
  };


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
  
  elementImage.addEventListener('click', (evt) => {
    openPopup(popupImg);
    const imgElement = evt.target;
    fullImg.src = imgElement.src;
    fullImg.alt = elementTitle.textContent;
    popupImageCaption.textContent = textTitle;
  });

  addBtnLike(newElement);
  addBtnRemove(newElement);
  
  return newElement;
}

function addCard(item) {
  elements.prepend(item);
}


//Добавление 1 карточки через форму)
function addNewCard(evt) {
  evt.preventDefault();

  const namePlace = inputNamePlace.value;
  const srcImage = inputUrlPlace.value;

  addCard(createCard(namePlace, srcImage));
  
  closePopup(popupAdd);

  evt.target.reset();
}

//Добавление карточек из "коробки" при загрузке страницы:
function loadCardsFromBox() {
  initialCards.forEach((item) => {

    const nameOfCard = item.name;
    const linkToCard = item.link;

    addCard(createCard(nameOfCard, linkToCard));
    
  });
}

loadCardsFromBox();




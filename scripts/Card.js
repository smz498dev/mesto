import {popupImg, fullImg, popupImageCaption, openPopup } from '../scripts/index.js';

export class Card {

  constructor(data, template){  
    this._template = template;
    this._name = data.name;
    this._link = data.link;
  }
    
  _getTemplate() {
    const cardElement = document.querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);
      
    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    
    this._setEventListeners();
    
    const cardImg = this._element.querySelector('.element__img');
      cardImg.src = this._link;
      cardImg.alt = this._name;

    const cardName = this._element.querySelector('.element__title');
      cardName.textContent = this._name;

      return this._element;
   }
  
   _handleCardLike(){
      this._element.querySelector('.element__like').classList.toggle('element__like_active');
   }
   
   _deleteCard(){
    
    this._element.remove();
   } 
   
   _setEventListeners(){
    const btnLike = this._element.querySelector('.element__like');
      btnLike.addEventListener('click', () => {
      this._handleCardLike();
    })
    const btnRemove = this._element.querySelector('.element__remove');
      btnRemove.addEventListener('click', () => {
      this._deleteCard();
    })

    const imgElement = this._element.querySelector('.element__img');
      imgElement.addEventListener('click', function () {

    openPopup(popupImg);
    
      fullImg.src = imgElement.src;
      fullImg.alt = imgElement.alt;
      popupImageCaption.textContent = imgElement.alt;
        
    })
   }
}





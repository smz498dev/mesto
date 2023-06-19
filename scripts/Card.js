
class Card {

  constructor(data, template){
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

   //с помощью данного метода получам разметку карточки 
  _getTemplate() {
    const cardElement = document.querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNone(true);

    return cardElement;
  }

}

_addBtnLike(){
  

}
_cardDelete(){
  cardElement.remove();  
} 

_setEventListeners(){

}


generateCard() {

  this._element = this._getTemplate(); //получаем разметку карточки
  this._setEventListeners(); //устанавливаем слушатели событий
}










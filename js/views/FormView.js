import View from './View.js';

const tag = '[FormView]';

const FormView = Object.create(View);

FormView.setup = function (elem) {  
  this.init(elem);
  this.inputElem = elem.querySelector('[type=text]');
  this.resetElem = elem.querySelector('[type=reset]');
  this.showResetBtn(false);
  this.bindEvents();
  return this;
}

FormView.showResetBtn = function (show = true) {
  this.resetElem.style.display = show ? 'block' : 'none';
}

FormView.bindEvents = function () {
  this.inputElem.addEventListener('keyup', e => this.onKeyUp());
}

FormView.onKeyUp = function () {
  this.showResetBtn(this.inputElem.value.length);
}

export default FormView;
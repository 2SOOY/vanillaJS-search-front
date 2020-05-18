import View from './View.js';

const tag = '[FormView]';

const FormView = Object.create(View);

FormView.setup = function (elem) {  
  this.init(elem);
  this.inputElem = elem.querySelector('[type=text]');
  this.resetElem = elem.querySelector('[type=reset]');
  this.showResetBtn(false);
}

FormView.showResetBtn = function (show = true) {
  this.resetElem.style.display = show ? 'block' : 'none';
}

export default FormView;
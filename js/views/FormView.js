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
  this.on('submit', e => e.preventDefault());
  this.inputElem.addEventListener('keyup', e => this.onKeyUp(e));
  this.resetElem.addEventListener('click', e => this.onClickReset());
}

FormView.onKeyUp = function (e) {
  const enter = 13;
  this.showResetBtn(this.inputElem.value.length);
  if (!this.inputElem.value.length) this.emit('@reset');
  if (e.keyCode !== enter) return
  this.emit('@submit', { input: this.inputElem.value });
  // this.inputElem.value = '';
  // this.showResetBtn(false);
}

FormView.onClickReset = function () {
  this.emit('@reset');
  this.showResetBtn(false);
}


export default FormView;
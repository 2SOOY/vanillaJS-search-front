import FormView from '../views/FormView.js';

const tag = '[MainController]';

export default {
  init() {
    console.log(tag, 'init');
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input)) // this를 반환하기 때문에 channing 가능 
      .on('@reset', e => this.onResetForm())
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit', input);
  },

  onResetForm() {
    console.log(tag, 'onResetForm');
  }
}
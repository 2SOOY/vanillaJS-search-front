import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import SearchModel from '../models/SearchModel.js';

const tag = '[MainController]';

export default {
  init() {
    console.log(tag, 'init');
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input)) // this를 반환하기 때문에 channing 가능 
      .on('@reset', e => this.onResetForm())

    ResultView.setup(document.querySelector('#search-result'));
    TabView.setup(document.querySelector('#tabs'));
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit', input);
    this.search(input);
  },
  
  search(query) {
    console.log(tag, 'search', query);
    // search api
    SearchModel.list(query).then(data => {
      this.onSearchResult(data);    
    });
  }, 

  onSearchResult(data) {
    ResultView.render(data);
  },

  onResetForm() {
    console.log(tag, 'onResetForm');
    ResultView.clearResult();
  }
}
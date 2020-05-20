import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/KeywordView.js';
import SearchModel from '../models/SearchModel.js';
import KeywordModel from '../models/KeywordModel.js';

const tag = '[MainController]';

export default {
  init() {
    console.log(tag, 'init');
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input)) // this를 반환하기 때문에 channing 가능 
      .on('@reset', e => this.onResetForm())

    ResultView.setup(document.querySelector('#search-result'));
    TabView.setup(document.querySelector('#tabs'))
      .on('@change', e => this.onChangeTab(e.detail.tabName));
    
    KeywordView.setup(document.querySelector('#search-keyword'));
    
    this.seletedTab = '추천 검색어';
    this.renderView();
  },

  renderView() {
    console.log(tag, 'renderView');
    ResultView.hide();
    TabView.setActiveTab(this.seletedTab);
    if (this.seletedTab === '추천 검색어') {
      this.fetchSearchKeyword(); 
    } else {

    }
  },

  fetchSearchKeyword() {
    KeywordModel.list().then(data => {
      KeywordView.render(data);
    });
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
  },

  onChangeTab(tabName) {
    this.seletedTab = tabName;
  }
}
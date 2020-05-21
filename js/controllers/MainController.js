import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/KeywordView.js';
import HistoryView from '../views/HistoryView.js';

import SearchModel from '../models/SearchModel.js';
import KeywordModel from '../models/KeywordModel.js';
import HistoryModel from '../models/HistoryModel.js';

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
    
    KeywordView.setup(document.querySelector('#search-keyword'))
      .on('@click', e => this.onClickKeyword(e.detail.keyword));

    HistoryView.setup(document.querySelector('#search-history'))
      .on('@click', e => this.onClickKeyword(e.detail.keyword))
      .on('@remove', e => this.onRemoveHistory(e.detail.keyword))
    
    this.seletedTab = '최근 검색어';
    this.renderView();
  },

  renderView() {
    console.log(tag, 'renderView');
    TabView.setActiveTab(this.seletedTab);
    if (this.seletedTab === '추천 검색어') {
      this.fetchSearchKeyword();
      HistoryView.hide();
    } else {
      this.fetchSearchHistory();
      KeywordView.hide();
    }
    ResultView.hide();
  },

  fetchSearchHistory() {
    HistoryModel.list().then(data => {
      HistoryView.render(data);
    })
  },

  onRemoveHistory(keyword) {
    console.log(tag, 'onRemoveHistory', keyword);
    HistoryModel.remove(keyword);
    this.renderView();
  },

  fetchSearchKeyword() {
    KeywordModel.list().then(data => {
      KeywordView.render(data);
    });
  },

  onClickKeyword(keyword) {
    this.search(keyword);
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit', input);
    this.search(input);
  },
  
  search(query) {
    console.log(tag, 'search', query);
    FormView.setKeyword(query);
    // search api
    SearchModel.list(query).then(data => {
      this.onSearchResult(data);    
    });
  }, 

  onSearchResult(data) {
    TabView.hide();
    KeywordView.hide();
    HistoryView.hide();
    ResultView.render(data);
  },

  onResetForm() {
    console.log(tag, 'onResetForm');
    this.renderView();
    ResultView.clearResult();
  },

  onChangeTab(tabName) {
    this.seletedTab = tabName;
    this.renderView();
  }
}
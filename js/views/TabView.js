import View from './View.js';

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.tabNames = {
  recommand: '추천 검색어',
  recent: '최근 검색어',
}

TabView.setup = function (elem) {
  this.init(elem);
  this.bindEvent();
  return this;
}

TabView.setActiveTab = function (tabName) {
  console.log(tag, 'setActiveTab', tabName);
  Array.from(this.elem.querySelectorAll('li')).forEach(li => {
    li.className = li.innerHTML === tabName ? 'active' : ''
  });
}

TabView.bindEvent= function () {
  this.elem.addEventListener('click', e => this.onClick(e.target.innerHTML));
}

TabView.onClick = function (tabName) {  
  this.setActiveTab(tabName);
  this.emit('@change', { tabName });
}

export default TabView;
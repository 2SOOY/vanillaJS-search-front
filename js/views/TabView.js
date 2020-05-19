import View from './View.js';

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.setup = function (elem) {
  this.init(elem);
  this.selected = this.elem.querySelectorAll('li')[0];
  this.setActiveTab(this.selected.innerHTML);
  this.bindEvents();
}

TabView.setActiveTab = function (tabName) {
  console.log(tag, 'setActiveTab', tabName);
  Array.from(this.elem.querySelectorAll('li')).forEach(li => {
    li.className = li.innerHTML === tabName ? 'active' : ''
  });
}

TabView.bindEvents= function () {
  this.elem.addEventListener('click', e => this.onClickTab(e));
}

TabView.onClickTab = function (e) {
  this.selected = e.target.innerHTML;
  this.setActiveTab(this.selected);
}

export default TabView;
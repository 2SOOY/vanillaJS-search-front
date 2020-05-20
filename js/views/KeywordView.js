import View from './View.js';

const tag = '[KeywordView]';

const KeywordView = Object.create(View);

KeywordView.setup = function(elem) {
  this.init(elem);
  return this;
}

KeywordView.render = function(data = []) {
  console.log(tag, 'render');
  this.elem.innerHTML = data.length ? this.getKeywordHtml(data) : '추천 검색어가 없습니다.';
  this.bindEvent(); // click이벤트는 키워드에 대한 DOM이 만들어진 이후에 binding 해야함.
  this.show();
}

KeywordView.getKeywordHtml = function (data) {
  return data.reduce((html, item, index) => {
    html += `<li data-keyword="${item.keyword}">
      <span class="number">${index + 1}</span>${item.keyword}</li>`
    return html
  }, '<ul class="list">') + '</ul>'
}

KeywordView.bindEvent= function () {
  Array.from(this.elem.querySelectorAll('li')).forEach(li => {
    li.addEventListener('click', e => this.onClick(e.currentTarget.dataset.keyword));
  })
}

KeywordView.onClick = function (keyword) {
  this.emit('@click', { keyword });
}

export default KeywordView;

import View from './View.js';

const tag = '[ResultView]';

const ResultView = Object.create(View);

ResultView.messages = {
  NO_RESULT: '검색 결과가 없습니다.',
}

ResultView.setup = function (elem) {
  this.init(elem);
  return this;
}

ResultView.render = function(data = []) {
  console.log(tag, 'render', data);
  this.elem.innerHTML = data.length ? this.getSearchResultsHtml(data) : this.messages.NO_RESULT;
  this.show();
}

ResultView.getSearchResultsHtml = function (result) {
  return result.reduce((html, item) => {
    html += this.getSearchItemHtml(item);
    return html;
  }, '<ul>') + '</ul>'
}

ResultView.getSearchItemHtml = function (item) {
  return `<li>
    <img src="${item.image}"/>
    <p>${item.name}</p>
  </li>`
}

ResultView.clearResult = function () {
  this.hide();
}

export default ResultView;
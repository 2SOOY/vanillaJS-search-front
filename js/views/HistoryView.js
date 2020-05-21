import KeywordView from './KeywordView.js';

const tag = '[HistoryView]';

const HistoryView = Object.create(KeywordView);

HistoryView.getKeywordsHtml = function (data = []){
  console.log(tag, 'getKeywordHtml', data);
  
  return data.reduce((html, item) => {
    html += `<li data-keyword="${item.keyword}">
      ${item.keyword}<span class="date">${item.date}</span>
      <button class="btn-remove"/>
    </li>`;
    return html;
  }, '<ul class="list">') + '</ul>';
}

HistoryView.bindEvent= function () {
  Array.from(this.elem.querySelectorAll('li')).forEach(li => {
    li.addEventListener('click', e => this.onClick(e));
  })
}

HistoryView.onClick = function (e) {
  const { keyword } = e.currentTarget.dataset
  if (e.target.className === "btn-remove"){
    this.emit('@remove', { keyword });
  } else {
    this.emit('@click', { keyword });
  }
}

export default HistoryView;
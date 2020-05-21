import KeywordView from './KeywordView.js';

const tag = '[HistoryView]';

const HistoryView = Object.create(KeywordView);

HistoryView.getKeywordsHtml = function (data = []){
  console.log(tag, 'getKeywordHtml', data);
  
  return data.reduce((html, item) => {
    html += `<li data-keyword="${item.keyword}">
      ${item.keyword}<span class="date">${item.date}</span>
      
    </li>`;
    return html;
  }, '<ul class="list">') + '</ul>';
}

export default HistoryView;
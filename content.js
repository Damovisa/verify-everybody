const checkmarkHtml = ' <i class="js-show-tip sprite sprite-verified-mini" title="" data-original-title="Not really verified account"></i>';

Array
  .from(document.querySelectorAll('a.account-inline b, span.account-inline b'))
  .filter(e => e.nextElementSibling.nodeName !== 'I')
  .forEach(e => e.insertAdjacentHTML('afterend',checkmarkHtml));

// watch for matching tweets that are added to DOM later
const observer = new MutationObserver(mutations => {
  mutations
    .filter(m => shouldCheckContent(m.target, m.type))
    .forEach(m => {
      m.addedNodes.forEach(n => {
        var e = n.querySelector('a.account-inline b, span.account-inline b');
        if ( e && e.nextElementSibling && e.nextElementSibling.nodeName !== 'I') {
          e.insertAdjacentHTML('afterend',checkmarkHtml);
        }
      });
    });
});

function shouldCheckContent(target, mutationType) {
  return mutationType === 'childList'
    && target && target.nodeName === 'DIV' && target.classList.contains('chirp-container')
}

const config = {
  attributes: false,
  characterData: true,
  childList: true,
  subtree: true
};
observer.observe(document.body, config);
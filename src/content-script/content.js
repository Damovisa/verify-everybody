const checkmarkHtml = '<span class="Icon Icon--verified"><span class="u-hiddenVisually">Verified account</span></span>';

Array
  .from(document.querySelectorAll('span.UserBadges'))
  .filter(e => e.children.length == 0)
  .forEach(e => e.insertAdjacentHTML('afterbegin',checkmarkHtml));

// watch for matching tweets that are added to DOM later
const observer = new MutationObserver(mutations => {
  mutations
    .forEach(m => {
      m.addedNodes.forEach(n => {
        console.info(n.nodeName);

        var e = n.querySelectorAll('span.UserBadges');
        if (e) {
          e.forEach(element => {
            if (element && element.children.length == 0) {
              element.insertAdjacentHTML('afterbegin', checkmarkHtml);
            }
          });
        }
      });
    });
});

function shouldCheckContent(target, mutationType) {
  return mutationType === 'childList'
    && target && target.nodeName === 'SPAN' && target.classList.contains('UserBadges')
}

const config = {
  attributes: false,
  characterData: true,
  childList: true,
  subtree: true
};

var stream = document.getElementById('stream-items-id');

observer.observe(stream, config);
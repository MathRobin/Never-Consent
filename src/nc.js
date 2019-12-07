// quantcast
function kickQuantcast(mutations) {
  const qcReady = mutations.some(mutation => {
    return mutation.target.firstChild &&
      mutation.target.firstChild.classList &&
      mutation.target.firstChild.classList.contains('qc-cmp-ui-container')
  });

  if (qcReady) {
    window.__cmpui('setAndSaveAllConsent', false);
  }
}

const observer = new MutationObserver(kickQuantcast);
observer.observe(document.body, {childList: true});

var kickCmpmngr = 0;

(function() {
  var kick = setInterval(function () {
    // Didomi
    if (!!window.Didomi) {
      window.Didomi.setUserDisagreeToAll();
      clearInterval(kick);
    }

    // consentmanager
    if (!!window.cmpmngr) {
      kickCmpmngr++;
      window.cmpmngr.setConsentViaBtn(0);

      // Because they are like a man, they have to heard too much times "nope" to understand "nope"
      if (5 === kickCmpmngr) {
        clearInterval(kick);
      }
    }

    // cookieconsent
    document.cookie = (document.cookie && document.cookie.length ? ';' : '') + 'cookieconsent_status=deny';
    if (!!window.cookieconsent) {
      // window.cmpmngr.setConsentViaBtn(0);

      // Because they are like a drunk boy, they have to heard a lot of time "nope" to understand "nope"
      if (document.cookie.indexOf('cookieconsent_status=deny')) {
        clearInterval(kick);
      }
    }

    // OneTrust

  }, 100);
})();


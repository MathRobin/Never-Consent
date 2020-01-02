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

(function () {
  var kick = setInterval(function () {
    // Didomi
    if (!!window.Didomi) {
      window.Didomi.setUserDisagreeToAll();
      clearInterval(kick);
    }

    // consentmanager
    if (!!window.cmpmngr) {
      kickCmpmngr += 1;
      window.cmpmngr.setConsentViaBtn(0);

      // Because they are like a man, they have to heard too much times "nope" to understand "nope"
      if (5 === kickCmpmngr) {
        clearInterval(kick);
      }
    }

    // cookieconsent
    document.cookie = (document.cookie && document.cookie.length ? ';' : '') + 'cookieconsent_status=deny';
    if (!!window.cookieconsent) {
      if (document.cookie.indexOf('cookieconsent_status=deny')) {
        clearInterval(kick);
      }
    }
  }, 100);

  // perf pitfall - resign after 90 seconds if nothing managed or detected
  setTimeout(function () {
    clearInterval(kick);
  }, 90000);
})();


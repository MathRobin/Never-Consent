// quantcast
function kickQuantcast(mutations) {
  var qcReady = mutations.some(mutation => {
    return mutation.target.firstChild &&
      mutation.target.firstChild.classList &&
      mutation.target.firstChild.classList.contains('qc-cmp-ui-container')
  });

  if (qcReady) {
    window.__cmpui('setAndSaveAllConsent', false);
  }
}

var observer = new MutationObserver(kickQuantcast);
observer.observe(document.body, {childList: true});

function registerCookie(newCookie) {
  if (!document.cookie.indexOf(newCookie)) {
    document.cookie = newCookie;
  }
}

registerCookie('cookieconsent_status=deny');
registerCookie('notice_preferences=0:');
registerCookie('notice_gdpr_prefs=0:');

(function () {
  var kickCmpmngr = 0;
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

    // cookielawinfo
    if (!!window.CLI && !!window.CLI.reject_close) {
      CLI.reject_close();
    }
  }, 100);

  // perf pitfall - resign after 90 seconds if nothing managed or detected
  setTimeout(function () {
    clearInterval(kick);
  }, 90000);
})();


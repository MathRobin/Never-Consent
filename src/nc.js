function neverConsent (mutations) {
  // quantcast
  const qcReady = mutations.some(mutation => {
    return mutation.target.firstChild &&
      mutation.target.firstChild.classList &&
      mutation.target.firstChild.classList.contains("qc-cmp-ui-container")
  });
  if (qcReady) {
    window.__cmpui("setAndSaveAllConsent", false);
  }

  // Didomi
  if (!!window.Didomi) {
    window.Didomi.setUserDisagreeToAll();
  }

  // consentmanager
  if (!!window.cmpmngr) {
    window.cmpmngr.setConsentViaBtn(0);
  }

  // https://cookieconsent.osano.com/documentation/javascript-api/
}

const observer = new MutationObserver(neverConsent);
observer.observe(document.body, {childList: true});

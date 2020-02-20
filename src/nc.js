(function () {
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

  function registerCookie(newCookie) {
    if (!document.cookie.indexOf(newCookie)) {
      document.cookie = newCookie;
    }
  }

  function elClick(selector, callback) {
    if (document.querySelector(selector)) {
      document.querySelector(selector).click();

      if (callback) {
        callback();
      }
    }
  }

  function fireEvent(selector, event) {
    if (document.querySelector(selector)) {
      const evObj = document.createEvent('Events');
      evObj.initEvent(event, true, false);
      document.querySelector(selector).dispatchEvent(evObj);
    }
  }

  registerCookie('cookieconsent_status=deny');
  registerCookie('notice_preferences=0:');
  registerCookie('notice_gdpr_prefs=0:');

  // quantcast
  (new MutationObserver(kickQuantcast)).observe(document.body, {childList: true});

  const domains = {
    'www.greenweez.com': '.cookies_banner',
    'twitter.com': '#banners'
  };

  let kickCmpmngr = 0;

  const kick = setInterval(function () {
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
      clearInterval(kick);
    }

    // crownpeak
    if (!!window.evidon) {
      elClick('.evidon-consent-button-text');
      window.evidon.preferencesDialog.doWithdrawConsent();
      document.querySelector('#_evh-button').remove();
      clearInterval(kick);
    }

    // sirdata
    if (!!window.Sddan && window.Sddan.cmpLoaded) {
      elClick('.sd-cmp-1Q99t', () => {
        elClick('.sd-cmp-2DJbe', () => {
          elClick('.sd-cmp-2F7Cs', () => clearInterval(kick));
        });
      });

    }

    // platform behind seloger.com, french flat search engine, still don't know wich one it is
    if (!!window.theShield) {
      fireEvent('#banner-cookie_customize', 'mousedown');

      const switchBoxes = document.querySelectorAll('.slshield-switch input');

      if (switchBoxes.length) {
        switchBoxes
          .forEach(checkbox => {
            if (checkbox.checked) {
              checkbox.click();
            }
          });

        elClick('.slshield-info__cta.slshield-info__cta-accept', () => clearInterval(kick));
      }
    }
  }, 100);

  const currentDomain = domains[location.hostname];
  if (currentDomain) {
    document.querySelector(currentDomain).remove();
    clearInterval(kick);
  }

  // resign after 90 seconds if nothing managed or detected
  setTimeout(() => clearInterval(kick), 90000);
})();


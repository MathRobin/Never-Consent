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

  function didMoronUnderstood () {
    kickMoron += 1;
    return 30 <= kickMoron;
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

  let kickMoron = 0;

  const kick = setInterval(function () {
    try {
      // Didomi
      if (!!window.Didomi && !!window.Didomi.setUserDisagreeToAll) {
        window.Didomi.setUserDisagreeToAll();

        // Because they are like a man, they have to heard too much times "nope" to understand "nope"
        if (didMoronUnderstood()) {
          clearInterval(kick);
        }
      }

      // consentmanager
      if (!!window.cmpmngr) {
        window.cmpmngr.setConsentViaBtn(0);

        // Because they are like a man, they have to heard too much times "nope" to understand "nope"
        if (didMoronUnderstood()) {
          clearInterval(kick);
        }
      }

      // cookielawinfo
      if (!!window.CLI && !!window.CLI.reject_close) {
        CLI.reject_close();
        clearInterval(kick);
      }

      // tarteaucitron
      if (!!window.tarteaucitron) {
        tarteaucitron.userInterface.respondAll(false);
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
        elClick('.sd-cmp-scPzo', () => {
          elClick('.sd-cmp-25WIV', () => {
            elClick('.sd-cmp-2HNNR', () => clearInterval(kick));
          });
        });
      }

      // appconsent
      if (!!window.appConsent && window.appConsent.denyAll) {
        appConsent.denyAll();
      }

      // onetrust
      if (!!window.OneTrust && window.OneTrust.RejectAll) {
        window.OneTrust.RejectAll();
        clearInterval(kick);
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
    } catch (except) {
      console.error('[extension:Never-Consent] encountered a problem, please open an issue here https://github.com/MathRobin/Never-Consent/issues');
      console.error('[extension:Never-Consent]', except);
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

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

  function waitForElement(selector, callback) {
    if (!eleWaiter) {
      eleWaiter = window.setInterval(() => {
        if (document.querySelector(selector)) {
          window.clearInterval(eleWaiter);
          eleWaiter = false;

          callback();
        }
      }, 10);
    }
  }

  function elClick(selector, callback, targetParent = false) {
    waitForElement(selector, () => {
      // target parent element
      if (targetParent) {
        document.querySelector(selector).parentNode.click();
      } else {
        document.querySelector(selector).click();
      }

      if (callback) {
        callback();
      }
    });
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
  let eleWaiter = false;

  const kick = setInterval(function () {
    try {
      // Didomi
      if (!!window.Didomi && !!window.Didomi.setUserDisagreeToAll) {
        window.Didomi.setUserDisagreeToAll();

        // It has to be told multiple times "no" to understand "no"
        if (didMoronUnderstood()) {
          clearInterval(kick);
        }
      }

      // consentmanager
      if (!!window.cmpmngr) {
        window.cmpmngr.setConsentViaBtn(0);

        // It has to be told multiple times "no" to understand "no"
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

      // createit
      if (!!window.ct_ultimate_gdpr_cookie) {
        elClick('#ct-ultimate-gdpr-cookie-change-settings', () => {
          elClick('.ct-ultimate-gdpr-cookie-modal-slider [for="cookie0"]', () => {
            elClick('.ct-ultimate-gdpr-cookie-modal-btn.save a');
          });
        })
        clearInterval(kick);
      }

      // crownpeak
      if (!!window.evidon && !!window.evidon.preferencesDialog) {
        elClick('.evidon-consent-button-text');
        window.evidon.preferencesDialog.doWithdrawConsent();
        document.querySelector('#_evh-button').remove();
        clearInterval(kick);
      }
      if (!!window.evidon && !!window.evidon.banner) {
        // elClick('.evidon-banner-optionbutton', () => {
          // setTimeout(() => {
          //   elClick('.opt-out-all-button', () => {
          //     clearInterval(kick);
          //   });
          // }, 2000);
        // });
      }

      // sirdata
	  // 20201001 - Updated to target parents button (given class are those of span childs)
      if (!!window.Sddan && window.Sddan.cmpLoaded) {
        elClick('.sd-cmp-2Pci8.sd-cmp-1BHAu.sd-cmp-1jg0y', () => {
          elClick('.sd-cmp-2Pci8.sd-cmp-1xpje.sd-cmp-1jg0y', () => {
            elClick('.sd-cmp-2Pci8.sd-cmp-1BHAu.sd-cmp-1U8T_', () => clearInterval(kick), true);
          }, true);
        }, true);
      }

      // appconsent
      if (!!window.appConsent && window.appConsent.denyAll) {
        appConsent.denyAll();
      }

      // onetrust
      if (!!window.OneTrust && window.OneTrust.RejectAll) {
        window.OneTrust.RejectAll();
        if (didMoronUnderstood()) {
          clearInterval(kick);
        }
      }

      // klaro
      if (!!window.klaro) {
        if (document.querySelector('.cn-decline')) {
          elClick('.cn-decline');
          clearInterval(kick);
        } else {
          elClick('.cm-learn-more', () => {
            elClick('[for="app-item-disableAll"] .switch .slider', () => {
              elClick('.cn-decline');
              clearInterval(kick);
            });
          });
        }
      }

      // orejime
      if (!!window.orejime) {
        elClick('.orejime-Button--info', () => {
          Object.keys(orejime.internals.manager.consents).forEach(ele => orejime.internals.manager.consents[ele] = false);
          elClick('.orejime-Modal-saveButton', () => {
            clearInterval(kick);
          })
        });
      }

      // axel springer oil
      if (!!window.AS_OIL) {
        AS_OIL.triggerOptOut();
        AS_OIL.showPreferenceCenter();
        elClick('.as-oil__btn-optin.as-js-optin[data-context="YES"]');
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

  // resign after 20 seconds if nothing managed or detected
  setTimeout(() => {
    clearInterval(kick);
    clearInterval(eleWaiter);
  }, 20000);
})();

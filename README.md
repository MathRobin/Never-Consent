# Never-Consent
Never consent to any GDPR consent management platform. All permissions are immediatly refused.

**/!\ IMPORTANT:** This extension completes uBlock, AdBlock & co, they don't serve the same objectives. We promote usage of adblockers in completion. Never-Consent will (try to) reject consent as possible, it will not block ads, it will not be able block all cookies if sites doesn't care whether you / never-consent said nope.

#### Filterlist
I recommend to add this list to uBlock in addition: https://secure.fanboy.co.nz/ (Add Anti-Cookie Messages link)

Automatically refuse consent to sites which uses those platforms :
- [Quantcast](https://www.quantcast.com/)
- [Didomi](https://www.didomi.io)
- [ConsentManager](https://www.consentmanager.net/)
- [Osano cookieconsent](https://cookieconsent.osano.com/)
- [Cookie Law Info](https://www.cookielawinfo.com/)
- [Crownpeak](https://www.crownpeak.com/)
- [SirData](https://cmp.sirdata.com/)
- [TarteAuCitron](https://opt-out.ferank.eu/)
- [AppConsent](https://www.appconsent.io)
- [OneTrust](https://www.onetrust.com/)
- [CreateIt](https://www.createit.com/)
- [Kiprotect Klaro](https://klaro.kiprotect.com/)
- [Orejime](https://github.com/empreinte-digitale/orejime)
- [Axel Springer OIL Hub](http://oil.axelspringer.com/)
- [Cybot CookieBot](https://www.cookiebot.com/)

No more "Do you accept ?" !

## Install it

- For [Chrome and chromium-based](https://chrome.google.com/webstore/detail/never-consent/pgahndjfiejekcbidhejmpplgdhejdpb)
- For [Firefox](https://addons.mozilla.org/firefox/addon/never-consent/)
- For [Edge](https://chrome.google.com/webstore/detail/never-consent/pgahndjfiejekcbidhejmpplgdhejdpb)

Not available
- For [Firefox Android](https://addons.mozilla.org/android/addon/never-consent/) (see [#48](https://github.com/MathRobin/Never-Consent/issues/48))
- For Safari: help needed

## Contribute

Don't hesitate to clone and PR this repo, or to open an issue with some details on which platform is not supported.

### Dependencies
To push a new release, script use [jq](https://stedolan.github.io/jq/download/) a lightweight and flexible command-line JSON processor.

## Test
Here are a list of sites for each platform where you can try your PRs if you want. Don't hesitate to enrich this section:

- AppConsent
  - https://www.appconsent.io
  - https://www.lyonmag.com/
  - https://www.lefigaro.fr/
- Axel Springer OIL Hub
  - http://oil.axelspringer.com/
- Chandago
  - https://www.chandago.com/
  - https://www.commentcamarche.net/
- ConsentManager
  - https://www.consentmanager.net/
- CookieBot
  - https://www.cookiebot.com/
  - https://training.zenika.com/
- Cookie Law Info
  - https://www.cookielawinfo.com/
- CreateIt
  - https://www.createit.com/
- Crownpeak
  - https://www.crownpeak.com/ (banner mode)
  - https://downdetector.fr/ (barrier mode)
- Didomi
  - https://www.didomi.io
  - https://www.fip.fr
- Kiprotect Klaro
  - https://klaro.kiprotect.com/
- Iubenda
  - https://www.iubenda.com/
- OneTrust
  - https://www.onetrust.com/
  - https://www.lepoint.fr/
  - https://www.vanityfair.fr/
- Orejime
  - https://github.com/empreinte-digitale/orejime
- Osano cookieconsent
  - https://cookieconsent.osano.com/
- Quantcast
  - https://www.quantcast.com/
- SirData
  - https://cmp.sirdata.com/
  - https://www.futura-sciences.com/
- TarteAuCitron
  - https://opt-out.ferank.eu/

## Thanks to

Based on the good ***[GDPNope](https://chrome.google.com/webstore/detail/gdpnope/kaobbaeanleebomkmkleekoeefldjcpi?hl=es)***.

Lot of sites have made their own system, it's complicated to manage them all. But by auto-refusing most of the majors CSP providers we try to do the most we can. 

I'm working on a solution for sites wich are not using a platform, if you have any ideas, please, submit it. 

Many thanks to:
- SVG Silh which provides the great [logo](https://svgsilh.com/image/1299163.html) of this extension (CC0)
- [Aurélien Hervé](https://aurelien-herve.com/) who inspired me this extension with his extension [GDPNope](https://chrome.google.com/webstore/detail/gdpnope/kaobbaeanleebomkmkleekoeefldjcpi?hl=es)

Many thanks too to these great humans for their PRs and bug reports in alphabetical order. This extension couldn't be this useful without them.
- [brian6932](https://github.com/brian6932)
- [jduval87](https://github.com/jduval87)
- [jonathan-rosa](https://github.com/jonathan-rosa)
- [Shadok](https://github.com/Shadok)
- [tartpvule](https://github.com/tartpvule)
- [TontonSancho](https://github.com/TontonSancho)

# 1.15.3

## Bug fixes

- Fixed infinite loop on some ConsentManager implementations, detected on https://www.pharmazeutische-zeitung.de, issue #78

# 1.15.2

## Bug fixes

- Fixed scrollbar bug for some Orjime implmentations, detected on https://www.service-public.fr/, issue #81

# 1.15.1

## Bug fixes

- Fixed infinite loop for OneTrust, detected on https://learn.unity.com/, issue #70

# 1.15.0

## Features

- Support added for Iubenda

# 1.14.0

## Features

  - Support added for Chandago, SibboCMP

# 1.13.0

## Features

  - Fix redirect loop on fip.fr due to Didomi behaviour. Many thanks to jduval87 for this great contribution !

# 1.12.0

## Features

  - Quick win, kill banner from cabinet-bedin website

# 1.11.0

## Features

  - Better build tool, automatically generates zip, updates manifest.json and package.json and publish tag

# 1.10.0

## Features

  - Support added for Cybot CookieBot
  - Partial support added for Evidon (barrier mode, only open the good modal to show "reject all" button)

# 1.9.2

## Bug fixes

  - Fixed AppConsent, SFBX have changed their APIs

# 1.9.1

## Bug fixes

  - Fixed SirData, which have updated their buttons css classnames

# 1.9.0

## Features

  - Support added for Axel Spring OIL, Klaro and Orejime

# 1.8.1

 
## Bug fixes

  - Fixed onetrust, which needed to repeat that we don't want them (issues #31)
  
# 1.8.0

## Features

  - Support added for CreateIt (issue #29)
  
## Bug fixes

  - Fixed crownpeak, infinite error loop in console when using banner instead of popup (issues #30 and #32)
  
# 1.7.0

## Features

  - Support added for OneTrust (issue #5)
  - Added build script to generate archive
  
# 1.6.0

## Features

  - Support added for AppConsent (issue #28)
  
## Bug fixes

  - Fixed Didomi, needed to repeat that we don't want them (issue #26)
  
# 1.5.2

## Bug fixes

  - SirData new version supported (issue #27)

# 1.5.1

## Bug fixes

  - TarteAuCitron broke Google Docs (issue #25)
  - Fixed Evidon (dialog mode)

# 1.5.0

## Features

  - Added support for TarteAuCitron
  
# 1.4.3

## Bug fixes

  - Not all the injected script was isolated from the current page

# 1.4.2

## Features

  - Ported to run on Firefox too

# 1.4.1

## Bug fixes

  - Incomplete support of SirData fixed
  - Incomplete support of platform behind SeLoger.com (theShield ?) fixed

# 1.4.0

## Features

  - Added support for SirData
  
# 1.3.0

## Features

  - Added support for platform behind SeLoger.com (still searching name of the platform)
  - Testing solution for custom development

# 1.2.0

## Features

  - Added support for Crownpeak

## Bug fixes

  - Fix perf pitfall in Cookie Law Info feature

# 1.1.0

## Features

  - Added support for Cookie Law Info

# 1.0.1

## Bug fixes

  - Fix perf pitfall - after 90 seconds, we cancel search for a platform.
  
# 1.0.0

## Features

  - Added support for Didomi
  - Added support for ConsentManager
  - Added support for CookieConsent
  - Added support for Quantcast
  - First commit

# Meta Pixel via Google Tag Manager

The Meta Pixel (ID `1472748671574051`) is deployed through the existing GTM
container `GTM-5GNZ8V3S`. No website code loads it directly. Do not also add
the pixel snippet to `src/routes/__root.tsx`, because that would load it twice.

## Files

- `meta-pixel-tag.html`: the Custom HTML tag body. It is the official Meta
  snippet with a once-per-page guard added. The `<noscript>` image is dropped
  because GTM Custom HTML only runs when JavaScript is on.
- `meta-pixel-gtm-import.json`: a GTM import file containing just that tag.

## Install (GTM UI)

1. Go to GTM → Admin → **Import Container**.
2. Select `meta-pixel-gtm-import.json`, choose the current workspace, and pick
   **Merge → Rename conflicting tags, triggers, and variables**. Existing tags
   (GA4 Google tag, Leadfeeder) stay unchanged.
3. Check the new tag **Meta Pixel - Base Code (PageView)**:
   - Type: Custom HTML
   - Trigger: **All Pages**
   - Advanced Settings → Tag firing options: **Once per page**
   - Consent Settings: **Require additional consent**: `ad_storage`, `ad_user_data`
4. Test in **Preview**, then **Submit/Publish**.

To set it up by hand instead, create a Custom HTML tag with the contents of
`meta-pixel-tag.html` and the settings listed above.

## Single-page app page views

The site is a client-side routed SPA. `fbevents.js` listens for History API
changes on its own and sends a `PageView` for each route change. Do **not**
add a GTM History Change trigger to this tag, because that double-counts
page views.

## Consent

The site sets Consent Mode v2 defaults to `denied` (`src/routes/__root.tsx`).
The Meta Pixel ignores Google Consent Mode, so the GTM consent check above is
the only thing that gates it.

Currently nothing on the site, and no tag in GTM, ever sends
`gtag('consent','update', …)`. **The pixel will therefore not fire for any
visitor until a consent banner/CMP grants `ad_storage` and `ad_user_data`.**
When a CMP is added:

- Make sure it sends a Consent Mode `update`.
- Add the CMP's "consent updated" custom event as a **second trigger** on
  this tag. Without it, visitors who accept mid-session are not tracked until
  their next full page load. The once-per-page setting and the in-script
  guard prevent a duplicate `PageView`.

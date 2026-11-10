# OBA AgroTech FarmLink — USPF Agriculture Challenge Prototype

FarmLink is an additive, mobile-first prototype built alongside the existing OBA AgroTech poultry tools.

## Prototype URL
After the branch is merged and GitHub Pages deploys:
https://genzchamp.github.io/oba-agrotech/farm-link.html

## Demonstrable features
- Post-harvest loss value estimator using farmer-entered quantity, estimated loss percentage and expected selling price.
- Produce handling and storage preparation checklist, with print support.
- Local community directory for buyer, storage/aggregation, agricultural input and transport contacts.
- Search and category filters for locally saved listings.
- WhatsApp contact link when a valid phone number is supplied.
- Export of user-managed listings to JSON.
- Responsive, low-bandwidth layout with no external API dependency for the core tools.

## Important prototype boundaries
- Listings are saved in browser localStorage on the current device only. They are not synced, publicly discoverable or shared with other users.
- Listings are user-submitted and explicitly marked NOT VERIFIED. The prototype does not certify suppliers, buyers, storage facilities, prices or products.
- The loss estimator uses only user-entered assumptions. It is not a forecast or a promise of loss reduction.
- Weather feeds, extension-agent data, verified supplier onboarding, payment rails, logistics booking and a shared server-side marketplace are future integrations, not current functionality.
- Do not describe unbuilt integrations as live in the competition application or demo.

## Existing product preservation
The new page is additive. Existing poultry disease guidance, profit calculator, Farm OS and Farm Intelligence pages are not replaced.

## Suggested validation before competition submission
1. Test on Android Chrome at narrow and desktop widths.
2. Add and filter each listing type; reload to confirm local persistence.
3. Test invalid and valid estimator inputs.
4. Export a listing backup and open the JSON file.
5. Confirm that a listing is never presented as verified.
6. Interview smallholder crop farmers and record consent-based evidence of the problem and usability feedback.

## Intended next steps
Validate needs with farmers and extension professionals in Plateau State, then seek credible partners for verified local information, storage and market access. Any live directory or climate advisory should use reliable sources and clearly show update dates.

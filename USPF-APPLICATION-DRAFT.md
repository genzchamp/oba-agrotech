# USPF Changemaker Challenge — OBA AgroTech FarmLink application working draft

**Challenge sector:** Agriculture  
**Proposed primary state of operation:** Plateau State, Nigeria (confirm that this accurately reflects where the team will operate and pilot).  
**Project:** OBA AgroTech FarmLink  
**Stage:** Existing OBA AgroTech platform plus a newly added prototype; farmer validation and shared-service integrations remain to be completed.

## Short pitch
OBA AgroTech FarmLink is a mobile-first agricultural access toolkit designed to help smallholder farmers make better post-harvest decisions and organise connections to buyers, storage providers, agricultural input suppliers and transport services. The first prototype combines a farmer-entered post-harvest loss estimator, a produce-handling checklist and a local directory where farmers can record and manage service contacts. The design prioritises low data use, basic smartphones and practical workflows. The next stage is to validate the tools with farmers and extension professionals in Plateau State, then build trusted local partnerships before introducing shared or verified listings.

## Problem being addressed
Smallholder farmers can lose value when produce is poorly handled, storage is unsuitable or delayed, transport is difficult to coordinate, and reliable buyers or genuine inputs are hard to identify. Information and services may exist but remain difficult to discover, assess and access. FarmLink focuses on the information and last-mile coordination gap rather than claiming to own storage facilities, provide credit or guarantee buyers.

## Proposed solution and current functionality
1. **Post-harvest loss estimator:** farmers enter crop quantity, their own estimated loss percentage and expected sale price. The tool calculates an indicative value at risk. It does not predict actual losses or promise savings.
2. **Produce handling checklist:** a printable set of prompts covering sorting, clean containers, shade, moisture, ventilation, transport and record keeping. Crop-specific advice must be validated with qualified local experts.
3. **Community service directory prototype:** farmers can save buyer, storage/aggregation, input and transport contacts on their own device, search/filter entries, add follow-up notes, contact a number through WhatsApp where available and export a JSON backup.
4. **Input, storage and buyer verification prompts:** practical questions help users check supplier traceability, product labels, facility suitability, buyer terms, weighing and payment arrangements.

## Accessibility and affordability
- Responsive phone-first interface.
- Core prototype tools do not require paid APIs or account creation.
- Low-data text-first design.
- Local browser storage allows a user to keep their own directory on the same device.
- Future SMS/USSD, local-language support and shared records require user research, technical validation and partnerships; they are not claimed as live features.

## User need and pilot plan
**Do not submit invented farmer numbers or testimonials.** Before final submission, interview smallholder crop farmers in the proposed Plateau pilot communities and, where possible, agricultural extension professionals. Ask about the crops they grow, post-harvest losses, storage access, how they find buyers and inputs, phone/internet access, and what would make a directory trustworthy. Obtain consent before recording quotations or photos.

Suggested initial pilot:
- Recruit a small, clearly stated group of volunteer farmers through legitimate local contacts.
- Observe farmers using the estimator and checklist on their own phones.
- Record completion issues, comprehension, usefulness ratings and requested language/accessibility changes.
- Validate all directory entries directly with the provider before any future public/verified listing.
- Report the actual pilot size, dates and findings only after the pilot occurs.

## Impact measures to collect
- Number of farmers who test the prototype.
- Percentage who can complete the estimator without assistance.
- Number of post-harvest handling steps farmers report adopting.
- Number of buyer/storage/input contacts farmers successfully verify and follow up.
- Farmer-reported changes in time spent searching for services and avoidable post-harvest loss, with baseline and follow-up methods documented.
- Cost of access and data consumption during testing.

## Feasibility and current limitations
The prototype is a static web page that can be hosted alongside the existing OBA AgroTech GitHub Pages website. The loss estimator and checklist run in the browser. The directory is local to one browser/device and is not a shared marketplace. Listings are visibly marked **NOT VERIFIED**. No live weather data, live market prices, authenticated supplier verification, payment, credit, logistics booking, cloud sync or extension-agent integration is currently implemented. These must be treated as future work dependent on reliable data sources, partner agreements, privacy safeguards and testing.

## Team capability — fill with confirmed details only
- **Founder / product lead:** [Name]. Practical poultry and farm-management experience; existing OBA AgroTech platform and prototype development.
- **Teammate:** [Name]. [Confirmed skills and role — e.g. crop production, agricultural extension, software, community mobilisation, logistics or business development.]
- Confirm both team members are at least 18, agree to participate throughout the programme and can substantiate their roles and availability.

## Risks and mitigations
- **Unverified contacts or fraud:** do not label a listing verified without direct checks; show verification date and responsible partner if this feature is built.
- **Wrong or over-generalised crop advice:** validate crop-specific guidance with extension professionals and reliable public sources.
- **Poor connectivity:** keep core pages lightweight; test on low-end Android devices and weak networks.
- **Low trust/adoption:** co-design with farmers, use trusted local partners and explain how information is sourced.
- **Privacy:** obtain consent before storing or sharing names and phone numbers; add clear privacy controls before any server-side directory is introduced.

## One-sentence differentiator
FarmLink turns agricultural information and last-mile service discovery into simple, phone-first actions farmers can use to assess post-harvest risk, prepare produce and organise local market and service contacts.

## Submission checklist
- [ ] Confirm primary state of operation and pilot community.
- [ ] Confirm teammate, age eligibility, role and consent to join.
- [ ] Conduct and document farmer/extension interviews.
- [ ] Test the deployed prototype on Android and desktop.
- [ ] Capture genuine screenshots and a short screen-recorded demo.
- [ ] Replace all placeholders with verified facts.
- [ ] Do not claim shared/verified listings, live prices, weather, measured savings or partnerships unless implemented and evidenced.

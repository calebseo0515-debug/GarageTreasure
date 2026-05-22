# GarageTreasure Launch Checklist

## Completed

- Technical QA GO from Winter.
- Supabase curated sales inserted.
- 14 active sales visible through the public API.
- Apple Maps markers implemented.
- Sale list and sale detail use Supabase data.
- Curated source listings use View Source Details instead of inaccurate directions.
- Create Sale changed to email-for-review flow.
- Location permission strings added.
- Secret key not included in app code.
- Final preview build created.
- GitHub main pushed at commit `e5d9733`.

## Remaining Before App Store Submission

1. Publish Privacy Policy URL.
2. Enter App Store Connect metadata from `release/app-store-connect.md`.
3. Upload screenshots.
4. Create production build.
5. Submit build to App Store Connect.
6. Complete App Privacy questionnaire.
7. Submit for review.

## Production Commands

```powershell
cd C:\Users\seo05\GarageTreasure
npx eas build --platform ios --profile production
npx eas submit --platform ios
```

## Final Phone QA

- Map opens and shows markers.
- Sales list shows curated local sales.
- Curated sale detail shows View Source Details.
- View Source Details opens source page in in-app browser.
- Existing direct-address sample sales show Get Directions.
- Submit Sale opens email review flow.

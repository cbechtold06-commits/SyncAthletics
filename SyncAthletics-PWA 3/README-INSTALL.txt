SYNCATHLETICS — FREE INSTALLABLE WEB APP

WHAT IS INCLUDED
- Existing SyncAthletics pages and branding preserved
- iPhone-style bottom navigation on mobile
- PWA manifest, app icons, and standalone display mode
- Service worker with same-origin page caching for repeat/offline visits
- Install prompt; iPhone Safari instructions included

PUBLISH TO YOUR EXISTING GITHUB PAGES SITE
1. Download and unzip this folder.
2. Open your GitHub repository: cbechtold06-commits/SyncAthletics.
3. Upload the CONTENTS of this folder to the repository root (not the folder itself).
4. Choose to replace the existing index.html/home.html/base-added.html/features.html/whyus.html/subscription.js where prompted, and add the new app.css, app.js, service-worker.js, manifest.webmanifest, and icons folder.
5. Commit the changes. Wait for GitHub Pages to finish deploying.
6. Open https://cbechtold06-commits.github.io/SyncAthletics/ in Safari on iPhone. Tap Share → Add to Home Screen.

IMPORTANT LIMITS
- This is a free PWA, not a native App Store app.
- Existing Canvas/MyU/Google Calendar descriptions and demo content are preserved; live account integrations need their own authorized API/backend setup.
- The add-on alert control remains a demo and does not send background push notifications.
- The service worker caches the app pages/assets after a successful online visit; third-party CDN/font resources may still require internet.
- The original pages use Tailwind CDN and the existing demo subscription script. This bundle does not create real user accounts or process payments.

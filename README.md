# Project

## Mobile Web Integration (/m)
This project auto-detects mobile User-Agents and serves the exported Expo (React Native) web build under `/m`.

### Build Mobile Web Bundle
From project root:

```
npm run mobile:web
```
Output path (default): `mobile/mobile-app/dist` (override with `MOBILE_WEB_DIST` env var).

### Environment Variables
- `MOBILE_WEB_DISABLE_REDIRECT=1`  Disable automatic redirect of mobile browsers to `/m`.
- `MOBILE_WEB_INJECT_TOGGLE=0`  Disable the injected mobile/desktop toggle button.
- `MOBILE_WEB_DIST=relative/path`  Override path to web build (relative to `project/`).

### Desktop / Mobile Preference
- Visit `/desktop-site` to force desktop (sets `forceDesktop=1` cookie for 30 days).
- Visit `/mobile-site` to clear preference.

### Metrics Endpoint
`GET /api/_debug/mobile-stats`
Returns JSON:
```
{
  redirects: number,
  skippedNoBuild: number,
  skippedDisabled: number,
  skippedCookie: number,
  totalChecks: number,
  buildExists: boolean
}
```

### Toggle Button Injection
By default, `/m` HTML gets a small floating toggle button (desktop/mobile). Disable with `MOBILE_WEB_INJECT_TOGGLE=0`.

### Development Notes
1. Run combined dev (web + server):
```
npm run dev
```
2. To test mobile redirect in desktop Chrome: open DevTools > Toggle device toolbar.

### Clean Build
```
npm run mobile:web:clean
npm run mobile:web
```

### Troubleshooting
- Not redirecting? Check `/api/_debug/mobile-stats` and confirm `buildExists` is true.
- Need to temporarily disable redirect while debugging desktop: set `MOBILE_WEB_DISABLE_REDIRECT=1`.
- Using a custom export command (older Expo): replace script `mobile:web` with `expo export:web`.

### Future Ideas
- Prometheus metrics export
- SSR or server-side hint page
- Granular device detection (viewport + UA)


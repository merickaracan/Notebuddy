# design-sync notes (NoteBuddy → Claude Design)

Run everything from `frontend/` (that's where `.design-sync/`, `.ds-sync/` and `ds-bundle/` live).

## Setup
- NoteBuddy is an app, not a library. `design-system/` is a small package (`notebuddy-ui`) made for this sync:
  `index.ts` re-exports the shared components from `src/components/`, the Ant Design components the app
  imports, `NoteBuddyProvider` (mirrors App.tsx's ThemeProvider + antd ConfigProvider, plus a MemoryRouter),
  and `Icons` (the @ant-design/icons glyphs the pages use).
- Build types before the converter: `./node_modules/.bin/tsc -p design-system/tsconfig.json` (= cfg.buildCmd).
  The bundle itself is built straight from `design-system/index.ts` (`--entry ./design-system/index.ts`).
- No playwright browser download: use the installed Chrome with
  `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`, and install only the
  `playwright` npm package into `.ds-sync/` with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`.
- Ant Design 6 is CSS-in-JS, so `[CSS_RUNTIME]` is expected. `design-system/global.css` (cfg.cssEntry) ships
  only the app's body font from `src/styles/index.css`; without it Select and TextArea render in serif.
  Avenir was dropped from that stack: it sits behind `system-ui`, so it's never reached (and it tripped `[FONT_MISSING]`).
  The rest of `index.css` is leftover Vite starter styling (dark body, centred flex body) and is deliberately not shipped.
- `NoteBuddyProvider`, `ThemeProvider`, `ConfigProvider` and `Icons` are excluded from cards (componentSrcMap null)
  but still exported on `window.NoteBuddy`. NoteBuddyProvider's own card crashes (router inside router) because
  cfg.provider already wraps every preview in it.

## Previews
- Sample data uses made-up students (Ava Thompson, Leo Martins, Sofia Novak, Omar Haddad, Grace Liu, Priya Shah).
  Don't use real people's names, including the original coursework team.
- `Leaderboard` preview stubs `window.fetch` for `/api/notes/leaderboard` so the table has rows.
- `Modal` / `Drawer` are position: fixed; previews wrap them in a `transform: translateZ(0)` frame with
  `getContainer={false}` so the open state renders inside the card.
- `SideMenu` reads `localStorage.user` for the teacher variant; only the default (student, collapsed) state is previewed.

## Known render warns
- None outstanding after the final run.

## Re-sync risks
- `design-system/index.ts` lists Ant Design components and icons by hand. If pages start using new antd
  components or icons, add them there (and author a preview) or the design agent won't have them.
- `NoteBuddyProvider` duplicates App.tsx's theme wiring; if App.tsx changes how ConfigProvider is themed, update it.
- `global.css` copies the body font from `src/styles/index.css`; keep them in sync.
- The Leaderboard fetch stub mirrors the API's `{ data: [...] }` shape; if the endpoint changes, update the preview.
- Built on Node v20.18.1 with Chrome as the render browser.

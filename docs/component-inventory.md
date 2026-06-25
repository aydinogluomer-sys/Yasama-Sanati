# Component Inventory

## Primary landing sections

- `sections/Hero/**`: responsive film stage, proposition, CTAs, intro dialog trigger.
- `sections/Introduction/**`: academy definition and visual introduction.
- `sections/WellnessSanctuary/**`: method/approach narrative and program action.
- `components/Client/Innovation.tsx`: cinematic program-discovery sequence.
- `sections/ElementisStory/**`: origin/trust narrative and instructor path.
- `components/Client/SustainableRetreat*.tsx`: working-area/editorial image sequence.
- `sections/Form/**`: pre-registration conversion form.
- `sections/Footer/**`: brand close, navigation, contact, newsletter, legal links.

## Shared interaction systems

- `components/Client/NavBar.tsx`, `SideBar*.tsx`: desktop/tablet/mobile navigation.
- `components/VideoPlayer/VideoPlayer.tsx`: accessible native-control film dialog.
- `components/Client/AccessibleLenis.tsx`: preference-aware smooth scrolling.
- `components/Client/ResponsiveMaskTextVariant.tsx`: SSR-stable responsive line composition.
- `components/Server/Input.tsx`, `Select.tsx`, `Client/SelectClient.tsx`, `Checkbox.tsx`: form primitives.

## 3D system

- `components/meridian-3d/MeridianParallaxContainer.tsx`: native sticky narrative track.
- `MeridianSceneWrapper.tsx`: intersection/lazy and static fallback gate.
- `MeridianScene.tsx`: R3F canvas and scene state.
- `SceneControls.tsx`, `MeridianSidebar.tsx`, `AcupointPanel.tsx`: interaction and information UI.

## Design-system ownership

- Runtime tokens and global reduced-motion safety: `app/globals.css`.
- Written rules: `design-system/**` and `docs/motion-rules.md`.

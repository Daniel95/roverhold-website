# Roverhold website

The official Roverhold game website. Static HTML, CSS and JavaScript, ready for GitHub Pages and roverhold.com.

## Files

- `index.html`: website structure and copy
- `privacy-policy.html`: privacy policy for the game and website
- `styles.css`: responsive styles
- `app.js`: trailer playback, weapon selector, mobile navigation and screenshot viewer
- `assets/`: actual game screenshots, trailer, icons and local fonts
- `CNAME`: custom domain, roverhold.com
- `.nojekyll`: serve these files directly without Jekyll

No dependencies, build step, API keys or server are required. The Unity project is separate.

## GitHub Pages setup

The website files live at the root of `Daniel95/roverhold-website`. This public repository supports GitHub Pages with GitHub Free.

1. Open Settings > Pages. Under Build and deployment, select Deploy from a branch, `main`, and `/(root)`, then Save.
2. Set the custom domain to `roverhold.com`. Verify ownership in your account Pages settings when configuring the domain.
3. Only after the domain is configured in GitHub, update its DNS records as described below.
4. Enable Enforce HTTPS after the certificate is ready.

New commits to the configured publishing branch update the website automatically. The existing ChatGPT Sites deployment is independent and remains available until you choose otherwise.

## DNS for roverhold.com

For the apex domain, use these A records at the DNS provider. These should replace conflicting website A or AAAA records for the same hostname; keep mail and unrelated records intact.

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | daniel95.github.io |

DNS and certificate provisioning can take up to 24 hours. The www record points to the account domain without a repository path. After both are configured, GitHub Pages redirects www.roverhold.com to roverhold.com.

Official documentation checked on 2026-10-02:
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Local preview

Run `python -m http.server 8000` from this directory and open http://localhost:8000.

## Content and provenance

The original game copy, upgrade/map screenshots and artwork came from Daniel95/Roverhold at commit 277a5f582c850276ada6ad933cdd6700751b0f7f. Gameplay content is based on the repository's beginner guide. Exo 2's font license is included in `assets/OFL.txt`.

The permanent-base screenshot was captured on 2026-10-02 from the adjacent Unity project at revision `682956b81588c624387c9b1a7214c7fe0edfff1c` (game version 0.3.520). It shows the current Main Menu buildings with menu overlays hidden and the camera framed around the base.

The combat screenshot was refreshed on 2026-10-02 at revision `277a5f582c850276ada6ad933cdd6700751b0f7f` (game version 0.3.525). It shows actual Level 2 gameplay on rocky terrain, with the rover, deployed HQ and defenses clearly visible between weapon volleys. All gameplay canvases were disabled temporarily for the capture, hiding the HUD, health bars and floating numbers. The unmodified 1080×1920 source is retained in `.preview/desert-combat-1.png`; earlier capture originals are also preserved.

The upgrade screenshot was refreshed on 2026-10-25 with the current production UI captured in the Unity Editor for Showcase V16. It shows two Rare Main Turret offers and one Uncommon Main Turret Split offer, including the actual descriptions, stat previews and costs. The unmodified 1080×1920 `upgrade-current-ui-source.png` is retained outside the repository and in `.preview/action-trailer-v16-20261025/`; its SHA-256 is `e9804c7ae464e52aa78bf3c03f37b689ca4540ac2f3568664248ee3023c63d1f`. Both previous website upgrade images are archived in that folder. The older 2026-10-05 capture and `assets/upgrades.webp` are also preserved.

The earlier combat and base captures used the existing save in isolated `ExistingReadOnly` Editor sessions with saving disabled and high graphics quality. Unity's original scene and preview settings were restored after capture. The V16 media handoff reports no game source, assets or saves changed; this website update only prepares delivery copies of the supplied media.

`combat.webp`, `base.webp` and `upgrades-rarities.webp` are 720×1280 display copies. Their `-full.webp` versions retain 1080×1920 resolution and load only when the screenshot viewer opens. Images retain their proportions and are shown without cropping. The map image remains unchanged.

## Trailer delivery

The website contains the two approved 30-second trailers supplied on 2026-10-26: Gameplay & Action V3 and Base Building & Progression / Overview V7. Action V3 starts directly with gameplay and includes the current upgrade UI. Overview V7 includes the corrected blue opening title, base building, movement/mining, a boss encounter, and later Colossus placement and firing. Website preparation preserves the selected exports' shots, timing, captions and encoded audio. Both use real Unity Editor captures. The upgrade gallery images remain unchanged.

| Website placement | Supplied master | Website video | Web size | Poster frame |
| --- | --- | --- | --- | --- |
| After the hero: Gameplay & Action | `roverhold-action-google-play-30s-v3.mp4`, 30 seconds | `assets/trailer.mp4` | 13,236,574 bytes | 1.8 seconds: Move your base |
| In Your Base: Base Building & Progression | `roverhold-overview-google-play-30s-v7.mp4`, 30 seconds | `assets/base-trailer.mp4` | 9,450,342 bytes | 6 seconds: Build your base |

Both selected 1080×1920 source exports remain unchanged outside the repository. Local archive copies are retained in the ignored `.preview/two-trailers-30s-20261026/action-master-30s.mp4` and `.preview/two-trailers-30s-20261026/overview-master-30s.mp4`. Their SHA-256 hashes are:

- Action V3: `2168613cd304b2c7517429b09ddbc982818f7255fb53554f3b8f87bf2fbe71ab`
- Overview V7: `1e6394587b8d2ce6ee43d034e04b57a6aaeeddf9935b7b9175bf5dc5d4a4dcd5`

The website copies are 720x1280 H.264 Main/AAC at 30 FPS, approximately 68% and 77% smaller than their selected sources. Each retains all 900 source frames and exactly 30 seconds of video/container duration. Audio is copied without re-encoding; copied audio packet hashes match the respective sources. Both MP4 files place metadata before video data for progressive playback. The matching WebP posters are 115,560 and 117,320 bytes. Delivery SHA-256 hashes are:

- Action web copy: `3b07d43969778d81228a2ba84a53ae09cd7e878a5d5078065a59d6471680a513`
- Overview web copy: `354bf7000609a48d9ea5771a2e624bd16d266a2d9f5ab6a02238b156e0d79909`

The action trailer stays immediately after the hero to introduce combat. The progression trailer sits beside the existing explanation of permanent base growth and movement. The base screenshot remains in the hero and gallery. On mobile, the base copy comes first, followed by its video and then the next-section button, so the button does not skip the progression footage.

Each player keeps inline portrait playback, muted looping and `preload="none"`. Only posters load before playback. One shared visibility observer starts autoplay when at least 25% of a video is visible; the current player keeps priority while it intersects the viewport. Both pause when fully out of view or when the browser tab is hidden. Play and sound controls also stop or mute competing trailers. Manual pause is respected while the same player remains visible.

On coarse-pointer devices or screens at most 640 pixels wide, tapping the video reveals Play/Pause, sound and **More controls** buttons below the footage. They fade after four seconds without interaction while playing, or when the visitor taps outside that player. Their space stays reserved so the page does not jump. They remain visible while paused or focused with the keyboard. **More controls** reveals the native player for seeking and fullscreen and keeps the buttons available until **Hide controls** or an outside tap returns to the clear video view. Desktop retains native controls. All players have native controls in HTML as the fallback when JavaScript is unavailable. If autoplay is blocked, the mobile Play button is revealed; without visibility observation, playback is manual. Visitors stay on the page; no standalone-video link is offered.

At widths through 640 pixels, the Trailer and Watch the trailer links center the primary player in the viewport. The heading and introduction remain above it in the normal page flow. Trailer navigation keeps its `#trailer` URL, supports repeat clicks and history navigation, and uses the existing CSS smooth-scrolling/reduced-motion preference. Both mobile players fit within the small viewport height with 16 pixels of space above and below; the full video frame remains visible with letterboxing when needed, and the caption and controls keep their normal sizes. Other section links and desktop trailer navigation retain section-top alignment.

Cache versions are `20261026-action-30s-v3` for the primary video/poster and `20261026-overview-30s-v7` for the progression video/poster. The unchanged upgrade display and gallery images, plus JavaScript, remain at `20261025-current-ui`. CSS remains at `20261024-mobile-trailer` because the layout is unchanged.

The previous 42-second action V16 and 45-second Galactic Progression V12 website videos and posters are archived in `.preview/two-trailers-30s-20261026/previous-*`. Their original masters and older verification artifacts remain under `.preview/action-trailer-v16-20261025/`, `.preview/base-trailer-v12-20261010/` and `.preview/two-trailers-20261009/`. Earlier upgrade screenshots and the supplied `assets/roverhold-trailer-sfx-shot-level-v11.mp4` remain untouched; temporary media stays ignored by Git.

FFmpeg is an optional media preparation tool, not a website runtime or build dependency. These selected sources already have a constant 30 FPS. Scale without a frame-rate filter or trim, and pass through their presentation timestamps to retain every frame:

```powershell
ffmpeg -i .preview/two-trailers-30s-20261026/action-master-30s.mp4 -map 0:v:0 -map 0:a:0 -vf "scale=720:1280:flags=lanczos" -fps_mode passthrough -c:v libx264 -preset medium -crf 23 -profile:v main -pix_fmt yuv420p -c:a copy -movflags +faststart assets/trailer.mp4
ffmpeg -i .preview/two-trailers-30s-20261026/overview-master-30s.mp4 -map 0:v:0 -map 0:a:0 -vf "scale=720:1280:flags=lanczos" -fps_mode passthrough -c:v libx264 -preset medium -crf 23 -profile:v main -pix_fmt yuv420p -c:a copy -movflags +faststart assets/base-trailer.mp4
```

Temporary masters, review captures, tools and media/playback verification reports live in the ignored `.preview/` folder. Keep original media when preparing new website copies. No store download URLs or release dates have been supplied.

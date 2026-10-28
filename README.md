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

The website contains the two approved 30-second V9 trailers supplied on 2026-10-28: Gameplay & Action and Base Building & Progression / Overview. Action V9 shows genuine unpressed green/blue/gold upgrade choices at 6–8 seconds, followed by the existing advanced multi-barrel shot captioned Add more barrels at 8–12 seconds. It remains a montage of separate progression captures. Overview V9 has the closer moving-base opening and continuous approach/stop/mining sequence, with the boss at 18.5–22 seconds followed by the explicitly later Colossus placement/firing at 22–28 seconds. Both retain the blue ROVERHOLD opening, gameplay reveal and title fade. Website preparation preserves their shots, timing, captions, colours and encoded audio while optimizing delivery. Both use real Unity Editor captures. Screenshots and other site content remain unchanged.

| Website placement | Supplied master | Website video | Web size | Poster frame |
| --- | --- | --- | --- | --- |
| After the hero: Gameplay & Action | `roverhold-action-google-play-30s-v9.mp4`, 30 seconds | `assets/trailer.mp4` | 13,003,329 bytes | 2.3 seconds: moving base after the opening title |
| In Your Base: Base Building & Progression | `roverhold-overview-google-play-30s-v9.mp4`, 30 seconds | `assets/base-trailer.mp4` | 9,882,394 bytes | 6.5 seconds: Build your base |

Both selected 1080×1920 source exports remain unchanged outside the repository. Local archive copies are retained in the ignored `.preview/final-v9-20261028/action-master-30s-v9.mp4` and `.preview/final-v9-20261028/overview-master-30s-v9.mp4`. Their SHA-256 hashes are:

- Action V9: `32d343b9818da87b6e1e9f53c76037c04a286f2d1206fc9dee1c2b9c08eb62b9`
- Overview V9: `c717d3b17d08f203fd3b2e3d694942623ab1644b5d0b9ef3deb6340985c85211`

The website copies are 720x1280 H.264 Main/AAC at 30 FPS, approximately 69% and 76% smaller than their selected sources. Each retains all 900 source frames and exactly 30 seconds of video/container duration. Audio is copied without re-encoding; copied audio packet hashes match the respective sources. Both MP4 files place metadata before video data for progressive playback. The matching WebP posters are 110,124 and 117,698 bytes. Delivery SHA-256 hashes are:

- Action web copy: `328b44c61460c79f4a998ec3d7c8651edfa20ef40b2bfd12f63c217d401d2e59`
- Overview web copy: `9f0a462bb7323c397079da75643a7b484d7de01d3b67667895efaef41dca7afe`

The action trailer stays immediately after the hero to introduce combat. The progression trailer sits beside the existing explanation of permanent base growth and movement. The base screenshot remains in the hero and gallery. On mobile, the base copy comes first, followed by its video and then the next-section button, so the button does not skip the progression footage.

Each player keeps inline portrait playback, muted looping and `preload="none"`. Only posters load before playback. One shared visibility observer starts autoplay when at least 25% of a video is visible; the current player keeps priority while it intersects the viewport. Both pause when fully out of view or when the browser tab is hidden. Play and sound controls also stop or mute competing trailers. Manual pause is respected while the same player remains visible.

On coarse-pointer devices or screens at most 640 pixels wide, tapping the video reveals Play/Pause, sound and **More controls** buttons below the footage. They fade after four seconds without interaction while playing, or when the visitor taps outside that player. Their space stays reserved so the page does not jump. They remain visible while paused or focused with the keyboard. **More controls** reveals the native player for seeking and fullscreen and keeps the buttons available until **Hide controls** or an outside tap returns to the clear video view. Desktop retains native controls. All players have native controls in HTML as the fallback when JavaScript is unavailable. If autoplay is blocked, the mobile Play button is revealed; without visibility observation, playback is manual. Visitors stay on the page; no standalone-video link is offered.

At widths through 640 pixels, the Trailer and Watch the trailer links center the primary player in the viewport. The heading and introduction remain above it in the normal page flow. Trailer navigation keeps its `#trailer` URL, supports repeat clicks and history navigation, and uses the existing CSS smooth-scrolling/reduced-motion preference. Both mobile players fit within the small viewport height with 16 pixels of space above and below; the full video frame remains visible with letterboxing when needed, and the caption and controls keep their normal sizes. Other section links and desktop trailer navigation retain section-top alignment.

Cache versions are `20261028-action-30s-v9` for the primary video/poster and `20261028-overview-30s-v9` for the progression video/poster. The unchanged upgrade display and gallery images, plus JavaScript, remain at `20261025-current-ui`. CSS remains at `20261024-mobile-trailer` because the layout is unchanged.

The previous Action V4 and Overview V7 website videos/posters are archived in `.preview/final-v9-20261028/previous-*`. Their source masters and the earlier V3, 42-second action V16 and 45-second Galactic Progression V12 media remain in the existing ignored `.preview/` archives. Earlier upgrade screenshots and the supplied `assets/roverhold-trailer-sfx-shot-level-v11.mp4` remain untouched; temporary media stays ignored by Git.

FFmpeg is an optional media preparation tool, not a website runtime or build dependency. These selected sources already have a constant 30 FPS. Scale without a frame-rate filter or trim, and pass through their presentation timestamps to retain every frame:

```powershell
ffmpeg -i .preview/final-v9-20261028/action-master-30s-v9.mp4 -map 0:v:0 -map 0:a:0 -vf "scale=720:1280:flags=lanczos" -fps_mode passthrough -c:v libx264 -preset medium -crf 23 -profile:v main -pix_fmt yuv420p -c:a copy -movflags +faststart assets/trailer.mp4
ffmpeg -i .preview/final-v9-20261028/overview-master-30s-v9.mp4 -map 0:v:0 -map 0:a:0 -vf "scale=720:1280:flags=lanczos" -fps_mode passthrough -c:v libx264 -preset medium -crf 23 -profile:v main -pix_fmt yuv420p -c:a copy -movflags +faststart assets/base-trailer.mp4
```

Temporary masters, review captures, tools and media/playback verification reports live in the ignored `.preview/` folder. Keep original media when preparing new website copies. No store download URLs or release dates have been supplied.

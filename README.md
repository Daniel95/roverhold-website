# Roverhold website

The official Roverhold game website. Static HTML, CSS and JavaScript, ready for GitHub Pages and roverhold.com.

## Files

- `index.html`: website structure and copy
- `styles.css`: responsive styles
- `app.js`: weapon selector, mobile navigation and screenshot viewer
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

Combat and permanent-base screenshots were captured on 2026-10-02 from the adjacent Unity project at revision `682956b81588c624387c9b1a7214c7fe0edfff1c` (game version 0.3.520). The capture used the existing save in an isolated `ExistingReadOnly` Editor session; saving was disabled. Combat shows the rover and its deployed HQ during a real level. The base image shows the current Main Menu buildings with menu overlays hidden and the camera framed around the base. High graphics quality was used for both. Unity's original scene and preview settings were restored after capture; no game source or assets were edited.

`combat.webp` and `base.webp` are 720×1280 display copies. Their `-full.webp` versions retain 1080×1920 resolution and load only when the screenshot viewer opens. Images retain their proportions and are shown without cropping. The upgrade and map images remain unchanged.

## Trailer delivery

The supplied `assets/roverhold-trailer-sfx-shot-level-v11.mp4` is the original 1080×1920, 42-second trailer (58,528,332 bytes). It is left untouched locally and ignored by Git. The published `assets/trailer.mp4` is a 720×1280 H.264/AAC web copy (16,500,947 bytes), about 72% smaller. Its shots, timing, music and sound effects are preserved. MP4 metadata is placed at the start of the file for progressive playback.

The native video player uses `controls`, `playsinline` and `preload="none"`, with no autoplay. Only the lightweight WebP poster is fetched before the visitor starts playback. The poster is an actual frame at 26 seconds. An **Open trailer** link also gives direct access to the video.

The web copy was made with FFmpeg; this is an optional media preparation tool, not a website runtime or build dependency:

```powershell
ffmpeg -i assets/roverhold-trailer-sfx-shot-level-v11.mp4 -map 0:v:0 -map 0:a:0 -vf scale=720:1280 -c:v libx264 -preset medium -crf 24 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart assets/trailer.mp4
```

Temporary capture originals, tools and preview artifacts live in the ignored `.preview/` folder. Keep original media when preparing new website copies. No store download URLs or release dates have been supplied.

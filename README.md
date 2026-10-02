# Roverhold website

The official Roverhold game website. Static HTML, CSS and JavaScript, ready for GitHub Pages and roverhold.com.

## Files

- `index.html`: website structure and copy
- `styles.css`: responsive styles
- `app.js`: weapon selector, mobile navigation and screenshot viewer
- `assets/`: actual game screenshots, icons and local fonts
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

Game copy and media came from Daniel95/Roverhold at commit 277a5f582c850276ada6ad933cdd6700751b0f7f. Screenshots are converted to WebP. Gameplay content is based on the repository's beginner guide. Exo 2's font license is included in `assets/OFL.txt`.

This package reproduces website source commit 3e84b94a6e8f90a0da6abcc4509a8f27388f7a27, with only export/setup files added. It excludes Sites configuration and Git history. No trailer or store download URLs were supplied.

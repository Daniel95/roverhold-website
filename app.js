(() => {
  'use strict';
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNavigation = document.querySelector('#main-nav');
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNavigation.classList.remove('is-open');
  };
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    mainNavigation.classList.toggle('is-open', !isExpanded);
  });
  mainNavigation.querySelectorAll('a').forEach(navigationLink => navigationLink.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  const trailerVideo = document.querySelector('.trailer-player video');
  const trailerSoundToggle = document.querySelector('.trailer-sound-toggle');
  const updateTrailerSoundLabel = () => {
    const isSilent = trailerVideo.muted || trailerVideo.volume === 0;
    trailerSoundToggle.textContent = isSilent ? 'Turn sound on' : 'Mute sound';
  };
  trailerSoundToggle.hidden = false;
  trailerSoundToggle.addEventListener('click', () => {
    const isSilent = trailerVideo.muted || trailerVideo.volume === 0;
    trailerVideo.muted = !isSilent;
    if (isSilent && trailerVideo.volume === 0) trailerVideo.volume = 1;
    updateTrailerSoundLabel();
  });
  trailerVideo.addEventListener('volumechange', updateTrailerSoundLabel);
  updateTrailerSoundLabel();
  if ('IntersectionObserver' in window) {
    let isTrailerVisible = false;
    const updateTrailerPlayback = () => {
      if (!isTrailerVisible || document.hidden) {
        trailerVideo.pause();
        return;
      }
      if (trailerVideo.paused) {
        trailerVideo.play().catch(() => {
          // If autoplay is blocked, the native play controls remain available.
        });
      }
    };
    const trailerVisibilityObserver = new IntersectionObserver(([entry]) => {
      isTrailerVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      updateTrailerPlayback();
    }, { threshold: [0, 0.25] });
    trailerVisibilityObserver.observe(trailerVideo);
    document.addEventListener('visibilitychange', updateTrailerPlayback);
    trailerVideo.addEventListener('play', () => {
      if (!isTrailerVisible || document.hidden) trailerVideo.pause();
    });
  }
  const weaponDetails = {
    turret: { title: 'The trusty troublemaker.', description: 'Your reliable starting point for making things explode. Invest in damage, firing speed and projectile upgrades to keep the pressure on.', artwork: 'assets/turret.webp', artworkDescription: 'Main Turret upgrade artwork from Roverhold', kind: 'ROVER WEAPON' },
    orbit: { title: 'Personal space, enforced.', description: 'Surround your rover with orbiting weapons and give nearby enemies something to worry about. Upgrade your orbit to put more firepower around you.', artwork: 'assets/orbit.webp', artworkDescription: 'Orbit weapon upgrade artwork from Roverhold', kind: 'ROVER WEAPON' },
    shield: { title: 'A little breathing room.', description: 'Absorb incoming damage with an Energy Shield. Improve its protection and regeneration so you can stay in the fight a little longer.', artwork: 'assets/shield.webp', artworkDescription: 'Energy Shield upgrade artwork from Roverhold', kind: 'ROVER DEFENSE' }
  };
  const weaponButtons = Array.from(document.querySelectorAll('[data-weapon]'));
  weaponButtons.forEach(weaponButton => {
    weaponButton.addEventListener('click', () => {
      const weaponIdentifier = weaponButton.dataset.weapon;
      const selectedWeapon = weaponDetails[weaponIdentifier];
      if (!selectedWeapon) return;
      weaponButtons.forEach(candidateButton => {
        const isSelected = candidateButton === weaponButton;
        candidateButton.setAttribute('aria-pressed', String(isSelected));
        candidateButton.classList.toggle('selected', isSelected);
      });
      document.querySelector('#weapon-title').textContent = selectedWeapon.title;
      document.querySelector('#weapon-description').textContent = selectedWeapon.description;
      document.querySelector('#weapon-kind').textContent = selectedWeapon.kind;
      const weaponImage = document.querySelector('#weapon-image');
      weaponImage.src = selectedWeapon.artwork;
      weaponImage.alt = selectedWeapon.artworkDescription;
      document.querySelector('.weapon-display').dataset.activeWeapon = weaponIdentifier;
    });
  });
  const galleryImages = [
    { source: 'assets/combat-full.webp', title: 'Combat', description: 'Actual Roverhold gameplay: the rover and its deployed headquarters with defenses firing across rocky terrain, with glowing ore in the distance.', width: 1080, height: 1920 },
    { source: 'assets/base-full.webp', title: 'Permanent base', description: 'The current permanent Main Menu base with evolved turrets, rocket launchers and Tesla defenses.', width: 1080, height: 1920 },
    { source: 'assets/upgrades-rarities-full.webp', title: 'Upgrades', description: 'The real Roverhold upgrade menu showing Legendary Rockets, Rare Tesla Coil and Uncommon Energy Shield offers.', width: 1080, height: 1920 },
    { source: 'assets/map.webp', title: 'Level map', description: 'Roverhold level map with interconnected planets and different challenges.', width: 750, height: 1334 }
  ];
  const screenshotDialog = document.querySelector('#screenshot-dialog');
  const lightboxImage = document.querySelector('#lightbox-image');
  let activeScreenshotIndex = 0;
  let lightboxTrigger = null;
  const showScreenshot = requestedIndex => {
    activeScreenshotIndex = (requestedIndex + galleryImages.length) % galleryImages.length;
    const screenshot = galleryImages[activeScreenshotIndex];
    lightboxImage.src = screenshot.source;
    lightboxImage.alt = screenshot.description;
    lightboxImage.width = screenshot.width;
    lightboxImage.height = screenshot.height;
    document.querySelector('#lightbox-caption').textContent = screenshot.title;
    document.querySelector('#lightbox-counter').textContent = `${activeScreenshotIndex + 1} / ${galleryImages.length}`;
  };
  document.querySelectorAll('[data-gallery-index]').forEach(screenshotButton => {
    screenshotButton.addEventListener('click', () => {
      lightboxTrigger = screenshotButton;
      showScreenshot(Number(screenshotButton.dataset.galleryIndex));
      screenshotDialog.showModal();
      document.body.classList.add('dialog-open');
    });
  });
  document.querySelector('.lightbox-close').addEventListener('click', () => screenshotDialog.close());
  document.querySelector('#previous-screenshot').addEventListener('click', () => showScreenshot(activeScreenshotIndex - 1));
  document.querySelector('#next-screenshot').addEventListener('click', () => showScreenshot(activeScreenshotIndex + 1));
  screenshotDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showScreenshot(activeScreenshotIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showScreenshot(activeScreenshotIndex + 1); }
  });
  screenshotDialog.addEventListener('click', event => {
    if (event.target !== screenshotDialog) return;
    const dialogBounds = screenshotDialog.getBoundingClientRect();
    const isOutside = event.clientX < dialogBounds.left || event.clientX > dialogBounds.right || event.clientY < dialogBounds.top || event.clientY > dialogBounds.bottom;
    if (isOutside) screenshotDialog.close();
  });
  screenshotDialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    lightboxTrigger?.focus();
  });
})();

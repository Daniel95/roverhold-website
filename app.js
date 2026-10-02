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
  const weaponDetails = {
    turret: { title: 'The trusty troublemaker.', description: 'Your reliable starting point for making things explode. Invest in damage, firing speed and projectile upgrades to keep the pressure on.', flavor: 'A classic for a very good reason.', artwork: 'assets/turret.webp', artworkDescription: 'Main Turret upgrade artwork from Roverhold', kind: 'ROVER WEAPON' },
    orbit: { title: 'Personal space, enforced.', description: 'Surround your rover with orbiting weapons and give nearby enemies something to worry about. Upgrade your orbit to put more firepower around you.', flavor: 'Please remain outside the danger circle.', artwork: 'assets/orbit.webp', artworkDescription: 'Orbit weapon upgrade artwork from Roverhold', kind: 'ROVER WEAPON' },
    shield: { title: 'A little breathing room.', description: 'Absorb incoming damage with an Energy Shield. Improve its protection and regeneration so you can stay in the fight a little longer.', flavor: 'Because dodging absolutely everything is ambitious.', artwork: 'assets/shield.webp', artworkDescription: 'Energy Shield upgrade artwork from Roverhold', kind: 'ROVER DEFENSE' }
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
      document.querySelector('#weapon-flavor').textContent = selectedWeapon.flavor;
      document.querySelector('#weapon-kind').textContent = selectedWeapon.kind;
      const weaponImage = document.querySelector('#weapon-image');
      weaponImage.src = selectedWeapon.artwork;
      weaponImage.alt = selectedWeapon.artworkDescription;
      document.querySelector('.weapon-display').dataset.activeWeapon = weaponIdentifier;
    });
  });
  const galleryImages = [
    { source: 'assets/combat.webp', title: 'Bring the chaos', description: 'Actual Roverhold gameplay: a rover fights enemy vehicles and collects glowing ore.', width: 1080, height: 1920 },
    { source: 'assets/base.webp', title: 'Make yourself at home', description: 'A blue headquarters with defensive turrets on an icy alien landscape.', width: 750, height: 1334 },
    { source: 'assets/upgrades.webp', title: 'Pick your power trip', description: 'The in-game upgrade menu offers Rockets, Tesla Coil and Energy Shield.', width: 750, height: 1334 },
    { source: 'assets/map.webp', title: 'Find your next fight', description: 'Roverhold level map with interconnected planets and different challenges.', width: 750, height: 1334 }
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

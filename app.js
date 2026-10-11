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
  const trailerPlayers = Array.from(document.querySelectorAll('.trailer-player')).map(container => ({
    container,
    video: container.querySelector('video'),
    controlBar: container.querySelector('.trailer-controls'),
    soundToggle: container.querySelector('.trailer-sound-toggle'),
    playToggle: container.querySelector('.trailer-play-toggle'),
    controlsToggle: container.querySelector('.trailer-controls-toggle'),
    controlsHideTimer: null,
    showsNativeControls: false,
    isVisible: false,
    canAutoplay: false
  }));
  const observesTrailerVisibility = 'IntersectionObserver' in window;
  const mobileTrailerControls = 'matchMedia' in window ? window.matchMedia('(pointer: coarse), (max-width: 640px)') : null;
  const updateNativeControlsLabel = player => {
    const controlsAction = player.showsNativeControls ? 'Hide controls' : 'More controls';
    player.controlsToggle.textContent = controlsAction;
    player.controlsToggle.setAttribute('aria-label', `${controlsAction} for ${player.video.getAttribute('aria-label')}`);
  };
  const hideTrailerControls = player => {
    window.clearTimeout(player.controlsHideTimer);
    player.controlsHideTimer = null;
    player.container.classList.remove('controls-visible');
    player.controlBar.inert = mobileTrailerControls?.matches || false;
    if (mobileTrailerControls?.matches) {
      player.showsNativeControls = false;
      player.video.controls = false;
      updateNativeControlsLabel(player);
    }
  };
  const showTrailerControls = player => {
    if (!mobileTrailerControls?.matches) return;
    window.clearTimeout(player.controlsHideTimer);
    player.controlsHideTimer = null;
    player.container.classList.add('controls-visible');
    player.controlBar.inert = false;
    // Keep Play reachable while paused and avoid interrupting keyboard or native seeking controls.
    if (player.video.paused || player.showsNativeControls || player.container.querySelector(':focus-visible')) return;
    player.controlsHideTimer = window.setTimeout(() => hideTrailerControls(player), 4000);
  };
  const updateTrailerControlMode = () => {
    const usesMobileControls = mobileTrailerControls?.matches || false;
    trailerPlayers.forEach(player => {
      hideTrailerControls(player);
      player.showsNativeControls = false;
      player.container.classList.toggle('uses-mobile-controls', usesMobileControls);
      player.video.controls = !usesMobileControls;
      if (usesMobileControls) player.video.setAttribute('tabindex', '0');
      else player.video.removeAttribute('tabindex');
      player.playToggle.hidden = !usesMobileControls;
      player.controlsToggle.hidden = !usesMobileControls;
      updateNativeControlsLabel(player);
    });
  };
  let activeTrailer = null;
  const pauseOtherTrailers = selectedTrailer => {
    trailerPlayers.forEach(player => { if (player !== selectedTrailer) player.video.pause(); });
  };
  const updateTrailerPlayback = () => {
    const nextTrailer = document.hidden ? null :
      activeTrailer?.isVisible ? activeTrailer : trailerPlayers.find(player => player.canAutoplay) || null;
    if (nextTrailer === activeTrailer) return;
    activeTrailer = nextTrailer;
    pauseOtherTrailers(activeTrailer);
    if (activeTrailer) {
      const selectedTrailer = activeTrailer;
      selectedTrailer.video.play().catch(() => {
        if (activeTrailer === selectedTrailer && !document.hidden) showTrailerControls(selectedTrailer);
      });
    }
  };
  trailerPlayers.forEach(player => {
    const { container, video, controlBar, soundToggle, playToggle, controlsToggle } = player;
    video.addEventListener('click', () => showTrailerControls(player));
    video.addEventListener('keydown', event => {
      if (mobileTrailerControls?.matches && !video.controls && (event.key === 'Enter' || event.key === ' ' || event.key === 'Tab')) {
        if (event.key !== 'Tab') event.preventDefault();
        showTrailerControls(player);
      }
    });
    controlBar.addEventListener('click', () => showTrailerControls(player));
    container.addEventListener('focusin', () => showTrailerControls(player));
    container.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (container.classList.contains('controls-visible')) showTrailerControls(player);
      }, 0);
    });
    const updatePlaybackLabel = () => {
      const playbackAction = video.paused ? 'Play' : 'Pause';
      playToggle.textContent = playbackAction;
      playToggle.setAttribute('aria-label', `${playbackAction} ${video.getAttribute('aria-label')}`);
    };
    playToggle.addEventListener('click', () => {
      if (video.paused) {
        video.play().catch(() => {
          updatePlaybackLabel();
          if (!document.hidden && (!observesTrailerVisibility || player.isVisible)) showTrailerControls(player);
        });
      } else {
        video.pause();
      }
    });
    controlsToggle.addEventListener('click', () => {
      player.showsNativeControls = !player.showsNativeControls;
      video.controls = player.showsNativeControls;
      updateNativeControlsLabel(player);
      showTrailerControls(player);
    });
    const updateSoundLabel = () => {
      const isSilent = video.muted || video.volume === 0;
      const soundAction = isSilent ? 'Turn sound on' : 'Mute sound';
      soundToggle.textContent = soundAction;
      soundToggle.setAttribute('aria-label', `${soundAction} for ${video.getAttribute('aria-label')}`);
      if (!isSilent) {
        trailerPlayers.forEach(otherPlayer => { if (otherPlayer !== player) otherPlayer.video.muted = true; });
      }
    };
    soundToggle.hidden = false;
    soundToggle.addEventListener('click', () => {
      const isSilent = video.muted || video.volume === 0;
      video.muted = !isSilent;
      if (isSilent && video.volume === 0) video.volume = 1;
      updateSoundLabel();
    });
    video.addEventListener('volumechange', updateSoundLabel);
    video.addEventListener('play', () => {
      if (video.paused) return;
      if (document.hidden || (observesTrailerVisibility && !player.isVisible)) {
        video.pause();
        return;
      }
      activeTrailer = player;
      pauseOtherTrailers(player);
    });
    video.addEventListener('play', updatePlaybackLabel);
    video.addEventListener('play', () => {
      if (container.classList.contains('controls-visible')) showTrailerControls(player);
    });
    video.addEventListener('pause', updatePlaybackLabel);
    video.addEventListener('pause', () => {
      if (!document.hidden && (!observesTrailerVisibility || player.isVisible) && container.classList.contains('controls-visible')) showTrailerControls(player);
      else hideTrailerControls(player);
    });
    video.addEventListener('ended', updatePlaybackLabel);
    updatePlaybackLabel();
    updateSoundLabel();
  });
  updateTrailerControlMode();
  mobileTrailerControls?.addEventListener?.('change', updateTrailerControlMode);
  document.addEventListener('pointerdown', event => {
    trailerPlayers.forEach(player => {
      if (!player.container.contains(event.target)) hideTrailerControls(player);
    });
  });
  if (observesTrailerVisibility) {
    const trailerVisibilityObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const player = trailerPlayers.find(candidate => candidate.video === entry.target);
        player.isVisible = entry.isIntersecting;
        player.canAutoplay = player.isVisible && entry.intersectionRatio >= 0.25;
      });
      updateTrailerPlayback();
    }, { threshold: [0, 0.25] });
    trailerPlayers.forEach(player => trailerVisibilityObserver.observe(player.video));
  }
  document.addEventListener('visibilitychange', updateTrailerPlayback);
  const weaponDetails = {
    turret: { title: 'Main Turret', description: 'Upgrade your main turret’s damage, firing speed and projectiles.', artwork: 'assets/turret.webp', artworkDescription: 'Main Turret upgrade artwork from Roverhold', kind: 'ROVER WEAPON' },
    orbit: { title: 'Orbit Weapons', description: 'Surround your rover with orbiting weapons and upgrade their firepower.', artwork: 'assets/orbit.webp', artworkDescription: 'Orbit weapon upgrade artwork from Roverhold', kind: 'ROVER WEAPON' },
    shield: { title: 'Energy Shield', description: 'Absorb incoming damage. Upgrade the shield’s protection and regeneration.', artwork: 'assets/shield.webp', artworkDescription: 'Energy Shield upgrade artwork from Roverhold', kind: 'ROVER DEFENSE' }
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

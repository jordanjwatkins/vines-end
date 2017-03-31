/* globals Howler, window, document, Crafty */

import scenes from './scenes/index';
import assets from './assets';
import GradientGenerator from './libs/gradient-generator';
import sounds from './scenes/sounds';
import addDebugRectangles from './util/debug-rectangle'; // eslint-disable-line no-unused-vars

let appState;
let elOverlay;
let elSvg;

const elAppRoot = document.getElementById('app-root');

run(true);

function run(shouldQuickStart) {
  preInit();

  if (shouldQuickStart) {
    quickStart();
  } else {
    startWithTitleScreen();
  }
}

function preInit() {
  appState = {
    currentScene: 'level-1',
    introsDisabled: false,
  };

  Crafty.init(document.body.clientWidth, constrainedHeight(), elAppRoot);

  // maintains sharp edges when scaling lo-res pixel art
  // (but can cause aliasing when image is rotated)
  Crafty.pixelart(true);

  startGradientGeneration();

  elOverlay = document.querySelector('.overlay');
  elSvg = document.querySelector('svg');
}

function constrainedHeight() {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;

  return (height > width * 0.75) ? width * 0.75 : null;
}

function startGradientGeneration() {
  if (typeof Worker !== 'undefined') {
    appState.gradientGenerator1 = new GradientGenerator(appState, 'gradient1');
    appState.gradientGenerator2 = new GradientGenerator(appState, 'gradient2');
  }
}

function init() {
  pauseWhenInactive();

  scenes(appState);

  waitForWorkers(() => {
    Crafty.load(assets, () => Crafty.enterScene(appState.currentScene));
  });
}

function waitForWorkers(callback) {
  if (
    (appState.gradientGenerator1 && appState.gradientGenerator1.waitingOnWorkers) ||
    (appState.gradientGenerator2 && appState.gradientGenerator2.waitingOnWorkers)
  ) {
    setTimeout(() => waitForWorkers(callback), 100);
  } else {
    appState.gradientGenerator1.maybeSaveGradientImageData();
    appState.gradientGenerator2.maybeSaveGradientImageData();

    callback();
  }
}

function startWithTitleScreen() { // eslint-disable-line no-unused-vars
  setTimeout(() => {
    startSound();
  }, 500);

  setTimeout(() => {
    init();
  }, 6500);

  setTimeout(() => {
    elOverlay.classList.add('is-hidden');
    elSvg.classList.add('is-hidden');
  }, 7000);

  setTimeout(() => {
    elOverlay.remove();
    elSvg.remove();
  }, 8000);
}

function quickStart() { // eslint-disable-line no-unused-vars
  startSound();

  setTimeout(() => {
    elOverlay.remove();
    elSvg.remove();
  }, 0);

  init();
}

function startSound() {
  const music = sounds['minimal-french-electro-sm'];
  const loop = music.play('loop');

  music.fade(0, 0.3, 2000, loop);

  setTimeout(() => {
    const bit1 = music.play('bit1');

    music.fade(0, 0.1, 1000, bit1);
    music.rate(1.13, bit1);

    setTimeout(() => {
      const bit2 = music.play('bit2');

      music.fade(0, 0.25, 1000, bit2);

      setTimeout(() => {
        music.fade(0.3, 0.04, 1500, loop);

        setTimeout(() => {
          music.fade(0.04, 0.25, 1500, loop);
        }, 5000);
      }, 3000);
    }, 1900);
  }, 1700);

  window.sounds = sounds;
  window.music = music;
  window.loop = loop;
}

function pauseWhenInactive() {
  const blurVolume = 0.0011;

  const onBlur = () => {
    if (!Crafty.isPaused()) {
      Crafty.pause();
      Howler.volume(blurVolume);
    }
  };

  const onFocus = () => {
    const pausedByBlur = (Howler.volume() === blurVolume);

    if (pausedByBlur) {
      Crafty.pause();
      Howler.volume(1);
    }
  };

  window.addEventListener('focus', onFocus);
  window.addEventListener('blur', onBlur);
}

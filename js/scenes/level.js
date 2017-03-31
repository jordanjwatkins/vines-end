/* globals Howler */

import dimensions from '../viewport-dimensions';
import clickable from '../entities/clickable';
import Morti from '../entities/morti';
import addCloud from '../entities/cloud';
import addRope from '../entities/rope';
import addBag from '../entities/bag';
import delay from '../util/delay';
import addLevelControls from './other/controls';
import basicIntro from './other/basic-intro';
import basicOutro from './other/basic-outro';

class Level {
  constructor(props) {
    Object.assign(this, addLevelControls, basicIntro, basicOutro);

    this.dimensions = dimensions();

    this.appState = props.appState;

    this.morti = new Morti();

    this.morti.scene = this;

    this.addRope = addRope;
    this.addCloud = addCloud;
    this.addBag = addBag;

    this.levelStarted = false;
    this.levelStarting = false;
  }

  start(skipIntro = false) {
    this.skipIntro = skipIntro;

    const userControlDelay = this.levelIntro();

    delay(() => {
      this.levelStarted = true;
    }, userControlDelay);
  }

  initControls() {
    const { vw, vh } = this.dimensions;

    // using 'MouseDown' since 'Click' failed to fire occasionally because
    // mouse input was being interpreted as drag instead of click
    this.viewClickable = clickable('MouseDown', vw, vh, () => {
      this.maybeJump();
    })

    .bind('KeyDown', (e) => {
      if (e.key === Crafty.keys.SPACE) {
        this.maybeJump();
      }
    })

    .bind('ViewportScroll', function () {
      this.x = -Crafty.viewport.x;
    });

    this.addLevelControls();
  }

  maybeJump() {
    if (this.levelStarted && !this.inputDisabled) {
      this.morti.jump();
    }
  }

  resetLevel(levelId) {
    this.appState.introsDisabled = true;

    if (Crafty.isPaused()) Crafty.pause();

    Howler.volume(1);

    if (this.gameBasicsText) this.dismissBasics();

    this.shouldShowGameBasics = false;

    Crafty.enterScene(levelId);
  }
}

export default Level;

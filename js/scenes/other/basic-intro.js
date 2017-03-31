/* globals sounds, music, loop */

import delay from '../../util/delay';

export default {
  levelIntro() {
    const { vw, vh } = this.dimensions;

    // color overlay
    this.overlay = Crafty.e('2D, WebGL, Color, Tween')
      .attr({ x: 0, y: 0, w: vw, h: vh, z: 99999 })
      .color('#3181ff');

    if (!this.intro || this.skipIntro || this.appState.introsDisabled) {
      this.overlay.tween({ alpha: 0 }, 1000);

      return 0;
    }

    return this.intro();
  },

  basicIntro({ text, textColor = 'white' }) {
    const { vw, vh, vunit, u } = this.dimensions;
    const viewport = Crafty.viewport;

    const titleText = Crafty.e('2D, DOM, Text, Tween')
      .attr({ x: u(56), y: 10 * vunit, w: 100 * vunit, alpha: 0, z: 999 })
      .text(text)
      .textColor(textColor)
      .textFont({ size: `${u(5)}px` });

    viewport.clampToEntities = false;

    // zoom in on center
    viewport.zoom(2, vw / 2, vh / 2, 0);

    // then move viewport to desired location
    // if timeout is too short then camera gets misaligned
    // (morti has to land first?)
    delay(() => {
      viewport.x = -u(30);
      viewport.y = u(0);
    }, 650);

    delay(() => {
      titleText.tween({ alpha: 1 }, 1000);
      this.overlay.tween({ alpha: 0 }, 1000);
    }, 900);

    delay(() => {
      sounds['low-tom'].play();

      viewport.pan(-u(30), u(35), 600, 'easeInQuad');

      Crafty.one('CameraAnimationDone', function () {
        titleText.destroy();

        delay(() => {
          viewport.zoom(0.5, vw / 2 , vh / 2, 500);
        }, 800);
      });

      delay(() => {
        music.fade(0.01, 0.25, 1500, loop);
      }, 1800);

      this.shouldShowGameBasics = true;

      delay(() => {
        if (!this.morti.hasJumpedAtLeastOnce && this.shouldShowGameBasics) this.showGameBasics();
      }, 4800);
    }, 2800);

    return 3600;
  },

  showGameBasics() {
    this.overlay.x = -Crafty.viewport.x;

    this.gameBasics();

    this.viewClickable.one('MouseDown', () => {
      this.dismissBasics();
    });

    this.viewClickable.one('KeyDown', (event) => {
      if (event.key === Crafty.keys.SPACE) {
        this.dismissBasics();
      }
    });
  },

  gameBasics() {
    const { vw, vh, u } = this.dimensions;

    const previousText = Crafty('gameBasicsText');

    // destroy any existing instances
    if (previousText.get().length > 0) {
      this.gameBasicsText = previousText.get(0);

      return;
    }

    this.gameBasicsText = Crafty.e('2D, DOM, Text, Tween, gameBasicsText')
      .attr({ x: -Crafty.viewport.x + vw / 2 - u(50), y: vh / 2 - u(10), w: u(100), z: 300, alpha: 0 })
      .text(`Tap or Click or Space To Jump`)
      .textColor('white')
      .textAlign('center')
      .textFont({ size: `${u(7)}px` });

    setTimeout(() => {
      this.gameBasicsText.tween({ alpha: 0.8 }, 400);
    }, 200);
  },

  dismissBasics() {
    this.gameBasicsText.tween({ alpha: 0 }, 400, () => {
      this.gameBasicsText.destroy();
    });
  },
};

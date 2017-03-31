/* globals Howler */

import delay from '../../util/delay';

export default {
  addLevelControls() {
    const { vw, vh, u } = this.dimensions;
    const _this = this;

    const resetLevel1Button = Crafty.e('2D, WebGL, Color, Mouse, UILayer')
      .attr({ x: vw - u(25), y: u(1.5), w: u(4), h: u(4), z: -9999, alpha: 0 })
      .color('green')
      .bind('MouseDown', () => {
        this.resetLevel('level-1');
      });

    const resetLevel2Button = Crafty.e('2D, WebGL, Color, Mouse, UILayer')
      .attr({ x: vw - u(17), y: u(1.5), w: u(4), h: u(4), z: -9999, alpha: 0 })
      .color('#3181ff')
      .bind('MouseDown', () => {
        this.resetLevel('level-2');
      });

    const pauseText = Crafty.e('2D, DOM, Text')
      .attr({ x: vw / 2 - vw / 4, y: vh / 2 - u(5), w: vw / 2, z: -1000, alpha: 0 })
      .text('Paused')
      .textColor('white')
      .textAlign('center')
      .textFont({ size: `${u(7)}px` });

    const pauseScreen = Crafty.e('2D, WebGL, Color, Mouse')
      .attr({ x: 0, y: 0, w: vw, h: vh, z: -1000, alpha: 0 })
      .color('blue');

    const unpause = function () {
      Crafty.pause();

      Howler.volume(1);

      resetLevel1Button.alpha = 0;
      resetLevel2Button.alpha = 0;

      resetLevel1Button.z = -999;
      resetLevel2Button.z = -999;

      delay(() => {
        pauseScreen.alpha = 0;
        pauseScreen.z = -99999;
        pauseText.alpha = 0;
        pauseText.z = -99999;
      }, 300);
    };

    pauseScreen.bind('MouseDown', unpause);

    window.unpauseScreen = unpause;

    const pause = () => {
      pauseScreen.alpha = 0.7;
      pauseScreen.z = 99998;
      pauseText.alpha = 0.7;
      pauseText.z = 99998;

      if (_this.gameBasicsText) _this.gameBasicsText.alpha = 0;

      resetLevel1Button.alpha = 1;
      resetLevel2Button.alpha = 1;

      resetLevel1Button.z = 99999;
      resetLevel2Button.z = 99999;

      delay(() => {
        Crafty.pause();

        Howler.volume(0.01);
      }, 100);
    };

    window.pauseScreen = pause;

    const pauseButton = Crafty.e('2D, WebGL, Mouse, UILayer')
      .attr({ x: vw - u(12), y: u(1.5), w: u(12), h: u(12), z: 9999 })
      .bind('MouseDown', pause);

    const pauseButton1 = Crafty.e('2D, WebGL, Color, Mouse, UILayer')
      .attr({ x: vw - u(6), y: u(1.5), w: u(1.5), h: u(4), z: 9999 })
      .color('white')
      .bind('MouseDown', pause);

    const pauseButton2 = Crafty.e('2D, WebGL, Color, Mouse, UILayer')
      .attr({ x: vw - u(3), y: u(1.5), w: u(1.5), h: u(4), z: 9999 })
      .color('white')
      .bind('MouseDown', pause);

    pauseScreen.attach(pauseText);

    this.viewClickable.attach(pauseButton);
    this.viewClickable.attach(pauseButton1);
    this.viewClickable.attach(pauseButton2);

    this.viewClickable.attach(pauseScreen);

    this.viewClickable.attach(resetLevel1Button);
    this.viewClickable.attach(resetLevel2Button);
  },
};

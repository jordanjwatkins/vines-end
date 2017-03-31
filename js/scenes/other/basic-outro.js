/* globals sounds, music, loop */

import delay from '../../util/delay';

export default {
  basicOutro(afterOutro) {
    const currentScene = this.appState.currentScene;

    this.overlay.x = -Crafty.viewport.x;
    this.afterOutro = afterOutro;

    // color overlay fade in
    this.overlay.tween({ alpha: 1 }, 1000)
      .bind('TweenEnd', () => {
        this.showOutroStats();

        music.fade(0.25, 0.3, 1500, loop);

        delay(() => {
          if (currentScene === this.appState.currentScene) {
            this.exitOutro();
          }
        }, 8000);

        // allow early exit from stats
        delay(() => {
          this.viewClickable.one('MouseDown', () => {
            this.exitOutro();
          });

          this.viewClickable.one('KeyDown', (event) => {
            if (event.key === Crafty.keys.SPACE) {
              this.exitOutro();
            }
          });
        }, 1200);
      });
  },

  exitOutro() {
    this.appState.currentScene = '';

    this.outroStats0.tween({ alpha: 0 }, 400);

    this.outroStats1.tween({ alpha: 0 }, 400).bind('TweenEnd', () => {
      delay(this.afterOutro, 200);
    });

    this.outroStats2.tween({ alpha: 0 }, 400);

    music.fade(0.3, 0.01, 1500, loop);

    delay(() => {
      music.fade(0.01, 0.25, 1500, loop);
    }, 2000);
  },

  showOutroStats() {
    const { vw, vh, u } = this.dimensions;

    const bestBagRun = Math.max(this.morti.bagRun, this.morti.bestBagRun);

    this.outroStats0 = Crafty.e('2D, DOM, Text, Tween, outrostats')
      .attr({ x: -Crafty.viewport.x + vw / 2 - u(50), y: vh / 2 - u(10), w: u(100), z: 1000, alpha: 1 })
      .text(`${this.levelName}`)
      .textColor('white')
      .textAlign('center')
      .textFont({ size: `${u(8)}px` });

    this.outroStats1 = Crafty.e('2D, DOM, Text, Tween, outrostats')
      .attr({ x: -Crafty.viewport.x + vw / 2 - u(20), y: vh / 2 + u(6), w: u(40), h: u(9), z: 1000, alpha: 1 })
      .text('bags')
      .textColor('white')
      .textAlign('center')
      .textFont({ size: `${u(6)}px` })
      .css('border-bottom', '1px solid #fff');

    this.outroStats2 = Crafty.e('2D, DOM, Text, Tween, outrostats')
      .attr({ x: -Crafty.viewport.x + vw / 2 - u(50), y: vh / 2 + u(17), w: u(100), z: 1000, alpha: 1 })
      .text(`
        total: ${this.morti.bagCount}/${this.totalBags}<br>
        best combo: ${bestBagRun}/${this.totalBags}<br>
        exit combo: ${this.morti.bagRun}/${this.totalBags}
      `)
      .textColor('white')
      .textAlign('center')
      .textFont({ size: `${u(4)}px`, lineHeight: 1.5 });

    if (this.morti.bagRun !== this.totalBags) {
      this.progressAdvice = Crafty.e('2D, DOM, Text, Tween, outrostats')
        .attr({ x: -Crafty.viewport.x + vw / 2 - u(50), y: u(4), w: u(100), z: 1000, alpha: 1 })
        .text(`Collect more bags in a row to earn medals.`)
        .textColor('white')
        .textAlign('center')
        .textFont({ size: `${u(3)}px`, lineHeight: 1.5 });
    }

    const bronze = this.addMedal(-u(40), '#C08D58');

    const silver = this.addMedal(-u(10), 'silver');

    const gold = this.addMedal(u(20), 'gold');

    delay(() => {
      if (bestBagRun > 1) bronze.activate('low-tom');
    }, 500);

    delay(() => {
      if (bestBagRun > this.totalBags / 1.5 || this.totalBags === this.morti.bagCount) silver.activate('mid-tom');
    }, 1000);

    delay(() => {
      if (this.morti.bagRun === this.totalBags) gold.activate('high-tom');
    }, 1500);
  },

  addMedal(xOffset, activeColor) {
    const { vw, vh, u } = this.dimensions;

    const medal = Crafty.e('2D, DOM, Color').attr({
      x: -Crafty.viewport.x + vw / 2 + xOffset,
      y: vh / 6 - u(5),
      w: u(20),
      h: u(20),
      z: 1001,
      alpha: 0.3,
    }).color('black');

    medal.activate = function (sound) {
      this.alpha = 1;
      this.color(activeColor);

      sounds[sound].play();
    };

    return medal;
  },
};

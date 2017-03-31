import Level from '../level';
import floors from './floors';
import background from './background';

import './morti';

class Level1 extends Level {
  constructor(appState) {
    super(appState);

    this.levelName = 'Treeful Farewell';

    this.addLevelEntities();

    this.morti.addComponent('mortiLevel1');

    this.initControls();

    this.addVisualEffects();

    this.start();
  }

  addVisualEffects() {
    this.addFog();
    this.addShadows();
  }

  addShadows() {
    const { vh, u } = this.dimensions;

    if (this.appState.gradientGenerator2.gradient2Url) {
      // shadow 1
      const greenGradient = Crafty.e('2D, Image, WebGL, Color, grad')
        .attr({
          w: vh * 1.7,
          h: u(150),
          x: u(29),
          y: u(-9),
          z: 963,
          alpha: 0.23,
        })
        .image(this.appState.gradientGenerator2.gradient2Url, 'repeat-y');

      greenGradient.origin(greenGradient.w / 2, greenGradient.h / 2);
      greenGradient.rotation = 77;

      // shadow 2
      const greenGradient2 = greenGradient.clone();

      greenGradient2.w = vh * 3.4;
      greenGradient2.h = u(220);
      greenGradient2.x = u(68);
      greenGradient2.y = -u(51);
      greenGradient2.alpha = 0.2;

      greenGradient2.origin(greenGradient2.w / 2, greenGradient2.h / 2);
      greenGradient2.rotation = 130;

      // shadow 3
      const greenGradient3 = Crafty.e('2D, Image, WebGL, Color, grad')
        .attr({
          w: vh * 3.7,
          h: u(140),
          x: u(221),
          y: u(-45),
          z: 963,
          alpha: 0.2,
        });

      greenGradient3
        .origin(greenGradient3.w / 2, greenGradient3.h / 2)
        .rotation = 30;
    }
  }

  addFog() {
    const { vh } = this.dimensions;

    if (this.appState.gradientGenerator1.gradient1Url) {
      const skyGradient = Crafty.e('2D, Image, WebGL, Color, grad')
        .attr({ w: 2046, h: vh, x: -30, y: 0, z: 961, alpha: 0.6 })
        .image(this.appState.gradientGenerator1.gradient1Url, 'repeat-x');

      this.viewClickable.attach(skyGradient);
    }
  }

  intro() {
    return this.basicIntro({ text: 'Treeful Farewell' });
  }

  addLevelEntities() {
    background(this.dimensions);
    floors(this.dimensions);

    this.ropes();

    // @ platform
    this.addBag({ x: 23, y: 90, z: 1 });

    // @ chasm
    this.addBag({ x: 85, y: 18 });
    this.addBag({ x: 95, y: 50 });

    // @ tree
    this.addBag({ x: 128 - 3, y: 62 });

    this.totalBags = 4;

    this.addExitVine();
  }

  addExitVine() {
    let { vh, vunit, attr2dToPixels } = this.dimensions;

    vh = vh / vunit;

    const y = vh - 40;
    const x = 176;
    const z = 100;

    const exitVineAnchor = Crafty.e('2D, WebGL, Color')
      .attr({ x, y, w: 5, h: 5, z })
      .color('#59350e');

    const exitVine = Crafty.e('2D, WebGL, Color')
      .attr({
        x: x + 1,
        y: y + 1,
        w: 1,
        h: vh,
        z,
      })
      .color('#176006');

    attr2dToPixels(exitVineAnchor);
    attr2dToPixels(exitVine);
  }

  ropes() {
    const { vh, u } = this.dimensions;

    const rope = {
      x: u(50),
      y: u(-1),
      w: u(1),
      h: vh - vh / 10,
      rotation: 26,
      z: 300,
    };

    this.addRope(rope, this.morti);
  }
}

export default Level1;

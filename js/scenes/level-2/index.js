import Level from '../level';
import floors from './floors';
import background from './background';
import mainIsland from './main-island';

import './monte';
import './morti';

class Level2 extends Level {
  constructor(props) {
    super(props);

    this.levelName = 'River Rush';

    this.appState.currentScene = 'level-2';

    this.addLevelEntities();

    this.morti.addComponent('mortiLevel2');

    this.monte = Crafty.e('monteLevel2');
    this.monte.scene = this;

    this.prepIslands();

    this.initControls();

    Object.assign(this, mainIsland);

    this.addVisualEffects();

    this.start();
  }

  addVisualEffects() {
    this.addFog();
    this.addShadows();
  }

  addFog() {
    let gradientHeight = 510;

    if (Crafty.viewport.rect()._h > 512) {
      gradientHeight = 1022;
    }

    const skyGradient = Crafty.e('2D, Image, WebGL, Color, grad')
      .attr({ w: 2046, h: gradientHeight / 2, x: -30, y: 0, z: -53 })
      .image(this.appState.gradientGenerator1.gradient1Url, 'repeat-x');

    this.viewClickable.attach(skyGradient);
  }

  addShadows() {
    const { vh, u } = this.dimensions;

    let gradientWidth = 1022;

    if (Crafty.viewport.rect()._w * 1.1 > 1024) {
      gradientWidth = 2046;
    }

    Crafty.e('2D, Image, WebGL, Color, grad')
      .attr({ w: gradientWidth, h: vh, x: -u(35), y:0, z: -53 })
      .image(this.appState.gradientGenerator2.gradient2Url, 'repeat-y');

    Crafty.e('2D, Image, WebGL, Color, grad')
      .attr({ w: gradientWidth, h: vh + 5, x: -u(35), y: -5, z: 99853, alpha: 0.8 })
      .image(this.appState.gradientGenerator2.gradient2Url, 'repeat-y');
  }

  intro() {
    return this.basicIntro({ text: 'River Rush' });
  }

  prepIslands() {
    this.islands = Crafty('grass unsupportive');
    this.greens = Crafty('island');

    this.islands.each(function () {
      this.removeComponent('Floor');
    });

    this.greens.each(function () {
      this.addComponent('Tween');
    });
  }

  raiseIslands() {
    const { u } = this.dimensions;

    if (!this.islandsRaised) {
      this.islands.each(function () {
        this.addComponent('Floor');
      });

      this.greens.each(function () {
        this.tween({ y: this.y - u(6) }, 300);
      });

      this.islandsRaised = true;
    }
  }

  addLevelEntities() {
    background(this.dimensions);
    floors(this.dimensions);

    this.ropes();

    this.addCloud({ x: 226, y: 6, w: 28, h: 16 });

    // first water
    this.addBag({ x: 69, y: 20 });
    this.addBag({ x: 112, y: 62 });

    // first tree
    this.treeBag = this.addBag({ x: 154, y: 71 });

    // far grass
    this.addBag({ x: 351, y: 80 });
    this.addBag({ x: 448, y: 40 });

    this.totalBags = 5;

    this.addExitVine();
  }

  addExitVine() {
    let { vh, vunit, attr2dToPixels } = this.dimensions;

    vh = vh / vunit;

    const y = vh - 27;
    const x = 423;
    const z = 100;

    const exitVineAnchor = Crafty.e('2D, WebGL, Color')
      .attr({ x, y, w: 4, h: 4, z })
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
    const { vunit } = this.dimensions;

    const rope = {
      x: 50 * vunit,
      y: -1 * vunit,
      w: 1 * vunit,
      h: 95 * vunit,

      rotation: 22,
    };

    const rope2 = Object.assign({}, rope, { x: 225 * vunit, rotation: 35 });
    const rope3 = Object.assign({}, rope, { x: 372 * vunit, rotation: -45, reversed: true });

    this.rope1 = this.addRope(rope, this.morti);
    this.rope2 = this.addRope(rope2, this.morti);

    this.rope3 = this.addRope(rope3, this.morti);
  }
}

export default Level2;

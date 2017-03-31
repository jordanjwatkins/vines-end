import delay from '../../util/delay';

Crafty.c('monteLevel2', {
  required: '2D, WebGL, Collision, Gravity, Tween, viewportDimensions, debugRectangle, monteStanding, Jumper, monte',

  init() {
    const { vh, vunit, u } = this.dimensions;

    this.attr({ x: 179 * vunit, y: vh - 17.5 * vunit, w: 15 * vunit, h: 15 * vunit, z: 5 })
      .origin(7 * vunit, 7 * vunit)
      .gravity('Floor')
      .gravityConst(u(90));

    this.addEventHandlers();
  },

  addEventHandlers() {
    this.onHit('landFeet', this.onMortiFeetHit);
    this.onHit('morti', this.onMortiHit);
    this.bind('Move', this.onMove);
  },

  onMove() {
    if (this.inWater()) this.sink();
  },

  inWater() {
    return (this.y > this.dimensions.vh - this.u(12));
  },

  sink() {
    this.vy = Math.round(this.u(6));
    this.vx = 0;
  },

  onMortiFeetHit(hit) {
    const overlap = hit[0].overlap;
    const morti = hit[0].obj._parent;

    if (this.isBeingKicked(morti, overlap)) {
      this.droppedOn = true;

      this.says('Yowch!', 1000);

      delay(() => {
        this.says('owch!', 1000, { fontSize: 2.7 });
      }, 350);

      delay(() => {
        this.says('ow!', 1000, { fontSize: 2.2 });
      }, 600);
    }
  },

  onMortiHit(hit) {
    const overlap = hit[0].overlap;
    const morti = hit[0].obj;

    if (morti.highFived && !this.highFived) {
      this.onHighFive(hit[0].obj, overlap);
    }

    if (this.hurt && !this.scared) {
      this.scared = true;
      this.getScared();
    }
  },

  isBeingKicked(morti, overlap) {
    return (morti.dropping && !this.droppedOn && !this.hurt && overlap < -this.u(4.15));
  },

  getHurt() {
    sounds['closed'].play();

    delay(() => {
      this.tween({ x: this.u(150) }, 300).bind('TweenEnd', () => this.hurt = true);

      sounds['closed'].play();
    }, 100);

    delay(() => {
      sounds['closed'].play();
    }, 300);
  },

  getScared() {
    this.jumpStartled();

    this.says('AAAAAaaaaaaaaggghhhh!', 1200);

    sounds['Jump20'].play();

    delay(() => {
      // tree bag falls
      this.scene.treeBag.moveToY(this.scene.treeBag.y + this.u(3));

      Crafty('rope').get(1).dangle();

      this.tween({ x: this.u(205) }, 500)
        .bind('TweenEnd', this.jumpOffIsland.bind(this));
    }, 800);
  },

  monteJump(jumpSpeed) {
    if (jumpSpeed) this.jumpSpeed(this.u(jumpSpeed));

    this.sprite('monteJumping');

    this.jump();
  },

  jumpStartled() {
    this.monteJump(28);
  },

  jumpOffIsland() {
    this.monteJump(54);

    this.vx = this.u(25);
  },

  onHighFive(morti, overlap) {
    this.highFived = true;

    if (overlap < -this.u(3)) {
      delay(() => {
        this.says('Pbbbth. Gah!', 1500);

        sounds['low-tom'].play();

        delay(() => {
          sounds['closed'].play();
          sounds['mid-tom'].play();
        }, 200);

        Crafty('rope').get(1).dangle();
      }, 0);
    } else {
      this.slappedHands = true;

      delay(() => {
        this.says('KaBlam!', 1500);

        sounds['clap'].play();
      }, 0);
    }
  },

  // not sure how I feel about this
  says(
    textString,
    duration,
    {
      offset = { x: 0, y: 7 },
      textColor = 'black',
      fontSize,
    } = {}
  ) {
    const { u } = this.dimensions;

    fontSize = fontSize || 4;

    const text = Crafty.e('2D, DOM, Text, debugRectangle')
      .attr({
        x: this.x - u(offset.x),
        y: this.y - u(offset.y),
        h: 200,
        w: 1000,
        z: 1000,
        alpha: 0,
      })

      .text(textString)
      .textColor(textColor)
      .textAlign('left')
      .textFont({ size: `${u(fontSize)}px` });

    delay(()=>{
      text.alpha = 1;
    }, 30);

    delay(() => {
      text.destroy();
    }, duration);

    // replace (interrupt) any existing speech instead of stacking
    if (this.saying) this.saying.destroy();

    this.saying = text;

    return text;
  },
});

export default function () {
  return Crafty.e('monteLevel2');
}

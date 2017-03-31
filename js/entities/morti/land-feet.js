Crafty.c('mortiFeet', {
  init() {
    this.feetActive = true;

    setTimeout(() => this.addFeet(this), 0);
  },

  addFeet(parent) {
    const { u } = this.dimensions;

    const landFeet = Crafty.e('2D, WebGL, Collision, debugRectanglePlus, landFeet')

      .attr({
        x: (parent.x + parent.w / 2) - parent.w / 4,
        y: parent.y + parent.h - u(0.5),
        w: parent.w / 2.2,
        h: u(0.5),
      })

      .onHit('Floor', (_hit) => {
        if (!parent.feetActive) return;
        if (this.floored) return;
        if (this.onRope) return;

        this.floored = true;
        this.dropping = false;
        this.jumping = false;
      });

    parent.attach(landFeet);
  },

  landing() {
    return this.ground && !this.onRope && !this.dropping && this.floored;
  },

  maybeLand() {
    if (this.landing()) this.land();
  },

  land() {
    this.vx = 0;
    this.vy = 0;
    this.jumping = false;

    this.sprite('mortiStanding');

    if (Math.random() * 2 > 1) {
      sounds['high-tom'].play();
    } else {
      sounds['mid-tom'].play();
    }

    this.rotation = 360;

    if (this.onLanded) this.onLanded();
  },
});

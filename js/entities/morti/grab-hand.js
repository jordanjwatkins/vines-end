Crafty.c('mortiHand', {
  init() {
    this.delay(() => this.addHand(this), 0);

    this.mayGrab = true;
  },

  addHand(parent) {
    const { u } = this.dimensions;

    parent.grabHand = Crafty.e('2D, WebGL, Collision, debugRectangle, grabHand')

      .attr({
        x: parent.x + u(14),
        y: parent.y + u(4),
        w: u(1),
        h: u(1),
      })

      .onHit('rope', (hit) => {
        const rope = hit[0].obj;

        if (this.shouldGrabRope(parent, rope)) {
          sounds['closed'].play();

          parent.onRope = true;
          parent.rope = rope;

          parent.antigravity();

          rope.onGrabbed(parent);

          this.delay(() => {
            // stop parent movement
            parent._vx = 0;
            parent._vy = 0;
          }, 0);
        }

        rope.onSwing();
      });

    parent.attach(parent.grabHand);
  },

  flipHand() {
    if (!this.handFlipped) {
      this.handFlipped = true;

      this.grabHand.x = this.grabHand.x - this.u(14);
    }
  },

  unflipHand() {
    if (this.handFlipped) {
      this.handFlipped = false;

      this.grabHand.x = this.grabHand.x + this.u(14);
    }
  },

  shouldGrabRope(entity, rope) {
    return (rope.grabbable && rope._children.length < 2 && !entity.dropping && entity.jumping && !entity.onRope && entity.mayGrab && (!rope.reversed || (rope.reversed && rope.grabbable)));
  },
});

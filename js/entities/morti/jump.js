Crafty.c('mortiJump', {
  init() {
    this.vXReleaseModifier = this.vXReleaseModifier || 0.3;
    this.vYReleaseModifier = this.vYReleaseModifier || 0.41;

    this.groundJumpSpeed = this.groundJumpSpeed || { x: 37, y: 17 };

    this.defaultGroundJumpSpeed = { ...this.groundJumpSpeed };

    this.floored = true;
    this.mayJump = true;
  },

  resetGroundJumpSpeed() {
    this.groundJumpSpeed.x = this.defaultGroundJumpSpeed.x;
    this.groundJumpSpeed.y = this.defaultGroundJumpSpeed.y;
  },

  onCheckJump() {
    if (this.shouldGroundJump()) {
      this.groundJump();
    } else {
      if (this.onRope) this.ropeJump();

      this.canJump = false;
    }

    if (this.afterCheckJump) this.afterCheckJump();
  },

  shouldGroundJump() {
    return (this.ground && this.floored && !this.jumping && this.mayJump);
  },

  groundJump() {
    const { u } = this.dimensions;

    this.sprite('mortiJumping');

    sounds['low-tom'].play();

    if (this.flipped) {
      this.vx = -u(this.groundJumpSpeed.x);
    } else {
      this.vx = u(this.groundJumpSpeed.x);
    }

    this.vy = 0;

    setTimeout(() => {
      this.vy = -u(this.groundJumpSpeed.y);
    }, 0);

    this.jumping = true;
    this.floored = false;

    if (this.afterGroundJump) this.afterGroundJump(this);
  },

  ropeJump() {
    sounds['mid-tom'].play();

    this.changeToReleaseVelocity();

    this.releaseRope();

    this.rope.released(this);

    this.dismountFlip();
  },

  releaseRope() {
    this.gravity();

    this.onRope = false;
    this.dropping = true;
    this.jumping = false;
    this.floored = false;
  },

  dismountFlip() {
    this.flipX();

    this.feetActive = false;

    this.tween({ rotation: 0 }, 300).bind('TweenEnd', function () {
      this.feetActive = true;
    });
  },

  changeToReleaseVelocity() {
    this.vx = -this.rope.vrotation * this.vXReleaseModifier * this.u(1);

    const vy = this.rope.vrotation * this.vYReleaseModifier * this.u(1);

    this.vy = (this.flipped) ? -vy : vy;
  },
});

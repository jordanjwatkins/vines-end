Crafty.c('mortiLevel2', {
  init() {
    const { vw, vh, u } = this.dimensions; // eslint-disable-line no-unused-vars

    this.startCenter = Crafty.e('2D').attr({ x: vw / 2, y: vh / 2, w: 0, h: 0 });

    this.wait = 20;
  },

  onReset() {
    this.highFived = false;
    this.scene.highFived = false;
    this.scene.monte.highFived = false;
    this.scene.monte.slappedHands = false;
  },

  afterOnMove() {
    if (this.inWater()) this.sink();

    if (this.bagCount > 1 && this.x < this.u(170)) {
      this.scene.raiseIslands();
    }

    this.maybeExit();
  },

  inWater() {
    return (this.y > this.dimensions.vh - this.u(12) && this.x < this.u(390));
  },

  sink() {
    this.wait++;

    if (this.wait > 30) {
      this.wait = 0;

      sounds['descending'].play();
    }

    this.vy = Math.round(this.u(6));
    this.vx = 0;
  },

  onLanded() {
    if (this.landingOnMainIsland()) return this.scene.mainIsland();

    this.unflipX(200);

    if (this.landingOnExitIsland()) return this.landedOnExitIsland();

    if (this.landingBeyondExitIsland()) return this.flipX(400);
  },

  landingOnMainIsland() {
    return (this.x > this.u(160) && this.x < this.u(210));
  },

  landingOnExitIsland() {
    return (this.x > this.u(360) && this.x < this.u(410));
  },

  landingBeyondExitIsland() {
    return (this.x > this.u(430));
  },

  landedOnExitIsland() {
    this.win = true;

    if (this.x > this.u(370)) {
      this.groundJumpSpeed.y = 38;
    } else {
      this.resetGroundJumpSpeed();
    }
  },

  maybeExit() {
    if (
      this.x > this.u(410) &&
      this.y + this.h / 2 < this.dimensions.vh &&
      this.y > this.dimensions.vh - this.u(30) &&
      this.win &&
      !this.exiting
    ) {
      sounds['Jump20'].play();

      this.exiting = true;

      this.vx = 0;
      this.vy = 0;

      this.viewportFollowDisabled = true;

      this.tween({ y: this.dimensions.vh + this.h }, 3000)
        .bind('TweenEnd', () => {
          this.scene.basicOutro(() => Crafty.enterScene('level-1'));
        });
    }
  },
});

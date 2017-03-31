Crafty.c('mortiReset', {
  maybeReset() {
    if (this.shouldReset()) this.reset();
  },

  shouldReset() {
    const { vh } = this.dimensions;

    return this.y > vh && !this.exiting && !this.resetting;
  },

  reset() {
    sounds['descending'].play();

    this.resetting =  true;

    this.resetGroundJumpSpeed();

    this.jumping = false;
    this.dropping = true;
    this.viewportFollowDisabled = true;

    this.unflipX();

    if (this.bagRun > this.bestBagRun) this.bestBagRun = this.bagRun;

    this.bagRun = 0;

    if (this.onReset) this.onReset();

    this.reenter();
  },

  reenter() {
    const { vh, vunit, u } = this.dimensions;

    setTimeout(()=> {
      if (this.startCenter) Crafty.viewport.centerOn(this.startCenter, 500);

      this.backupDistance = this.w;

      this.x = -this.backupDistance;

      this.vx = 0;
      this.vy = 0;
      this.y = vh - 52 * vunit; // TODO: take this as a param as it depends on level start platform

      setTimeout(() => {
        Crafty('rope').get().forEach((rope) => {
          rope.reset();
        });

        this.viewportFollowDisabled = false;

        this.jump();

        this.vy = -u(15);

        this.enterOffset = (this.enterOffset) ? false : true;

        if (this.enterOffset) {
          this.vx = u(27);
        } else {
          this.vx = u(32);
        }

        setTimeout(() => (this.resetting = false), 550);
      }, 700);
    }, 500);
  },
});

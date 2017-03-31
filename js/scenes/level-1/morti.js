Crafty.c('mortiLevel1', {
  required: 'Delay',

  init() {
    const { vw, vh } = this.dimensions;

    this.startCenter = Crafty.e('2D').attr({ x: vw / 2, y: vh / 2, w: 0, h: 0 });

    this.win = false;
  },

  afterOnMove() {
    if (this.onRope && this.groundJumpSpeed.y === 66) this.resetGroundJumpSpeed();

    if (this.shouldExit()) {
      this.exit();
    }
  },

  shouldExit() {
    return (this.x > this.u(163) && this.win && !this.exiting);
  },

  exit() {
    sounds['Jump20'].play();

    this.delay(() => {
      sounds['Jump20'].play();
    }, 500);

    this.exiting = true;

    this.vx = 0;
    this.vy = 0;

    this.tween({ y: this.dimensions.vh + this.h }, 3000)
      .bind('TweenEnd', () => {
        this.scene.basicOutro(() => Crafty.enterScene('level-2'));
      });
  },

  onLanded() {
    const { u } = this.dimensions;

    // @ first platform grass
    if (this.x < u(30) && this.x > u(19) && this.ground.has('grass')) {
      this.groundJumpSpeed.y = 66;
      this.unflipX(300);

      return;
    }

    // @ main island
    if (this.x > u(110) && this.ground && (this.ground.has('tree') || this.ground.has('grass')) && !this.win) {
      this.win = true;
    }

    this.unflipX(300);
  },
});

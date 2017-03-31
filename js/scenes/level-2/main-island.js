import delay from '../../util/delay';

export default {
  initMainIsland() {
    this.landingCount = 0;
    this.highFiveAttempts = 0;
    this.highFives = 0;
  },

  mainIsland() {
    if (!this.landingCount) this.initMainIsland();

    this.landingCount++;

    const scene = this;
    const { morti, monte } = this;

    if(morti.ground && morti.ground.has('tree')) return morti.unflipX(200);

    if (monte.droppedOn && !monte.hurt) return scene.runAwayHurt();

    if (scene.hurtMonte) return scene.monteNeedsSpace();

    if (scene.highFived) return morti.unflipX(200);

    if (morti.x > monte.x + monte.w / 2) {
      morti.flipX();

      scene.highFive();
    } else {
      morti.unflipX(100);
    }
  },

  monteNeedsSpace() {
    const scene = this;
    const { morti, monte } = this;
    const rope = Crafty('rope').get(1);

    scene.highFived = true;

    if (rope.rotation !== 0 && rope.rotation % 360 !== 0) rope.dangle();

    if (this.landingCount % 2 === 0) {
      monte.says('Stay back!', 900, {
        offset: { x: -25, y: 7 },
      });
    } else {
      monte.says('Please!', 900, {
        offset: { x: -25, y: 7 },
        fontSize: 2.2,
      });
    }

    morti.unflipX(400);

    morti.resetGroundJumpSpeed();
  },

  runAwayHurt() {
    const { morti, monte } = this;

    this.hurtMonte = true;

    morti.groundJumpSpeed = { x: 5, y: 11 };

    monte.getHurt();
  },

  highFive() {
    const { morti, monte } = this;

    if (this.highFiveOrCloseToIt()) {
      this.adjustMonteForSolidHighFive();
    }

    this.highFived = true;

    this.inputDisabled = true;

    delay(() => {
      monte.says('High Five?', 1400);
    }, 700);

    delay(() => {
      this.highFiveZoomIn();

      delay(() => {
        this.inputDisabled = false;
        morti.mayJump = false;

        morti.afterCheckJump = () => {
          monte.saying.destroy();

          this.tryHighFive();
        };
      }, 1300);
    }, 80);
  },

  adjustMonteForSolidHighFive() {
    const { morti, monte } = this;

    monte.tween({
      x: monte.x + (morti.x - (monte.x + monte.w)) + 1,
    }, 800);
  },

  highFiveOrCloseToIt() {
    const { morti, monte } = this;

    return (
      morti.x - (monte.x + monte.w) >= -morti.u(3.2) && // not too left
      morti.x - (monte.x + monte.w) < morti.u(2.5) // not too right
    );
  },

  tryHighFive() {
    const { morti, monte } = this;

    this.highFiveAttempts++;

    if (morti.highFived) {
      morti.afterCheckJump = null;

      return;
    }

    morti.sprite('mortiJumping');
    monte.sprite('monteJumping');

    morti.highFived = true;

    delay(() => {
      this.hitOrMissHighFive();
    }, 200);
  },

  hitOrMissHighFive() {
    const { morti, monte } = this;

    if (morti.hit('monte')) {
      if (monte.slappedHands) {
        this.friendlyToss();
      } else {
        delay(() => {
          this.afterHighFive();
        }, 700);
      }

      return;
    }

    if (this.handsBarelyTouching()) {
      this.friendlyToss();
    } else {
      this.missHighFive();
    }
  },

  handsBarelyTouching() {
    const { morti, monte } = this;

    return (morti.x - (monte.x + monte.w) < 0.5);
  },

  missHighFive() {
    const { monte } = this;

    monte.says('Whiff! Maybe next time.', 1500);

    sounds['closed'].play();

    this.highFived = true;
    monte.highFived = true;

    Crafty('rope').get(1).dangle();

    delay(() => {
      this.afterHighFive();
    }, 500);
  },

  friendlyToss() {
    const { morti, monte } = this;

    this.highFives++;

    this.inputDisabled = true;
    morti.viewportFollowDisabled = true;

    morti.groundJumpSpeed = { x: 20, y: 88 };

    morti.mayJump = true;
    morti.mayGrab = false;

    sounds['clap'].play();

    delay(() => {
      morti.jump();

      monte.tween({ rotation: -360 }, 300);
      morti.tween({ rotation: 360 }, 300);
    }, 200);

    if (this.highFives === 1) {
      this.shakeDownTreeBag();
    }

    delay(() => {
      monte.sprite('monteStanding');
    }, 900);

    delay(() => {
      this.afterHighFive();
    }, 2500);
  },

  shakeDownTreeBag() {
    const targetY = this.treeBag.y + this.morti.u(3);

    delay(() => {
      this.treeBag.paused = true;
      this.treeBag.tween({ y: targetY }, 1200);
    }, 1900);

    delay(() => {
      this.treeBag.moveToY(targetY);
      this.treeBag.paused = false;
    }, 3700);
  },

  afterHighFive() {
    const { morti, monte } = this;

    this.inputDisabled = false;

    morti.mayGrab = true;
    morti.mayJump = true;

    morti.unflipX();

    morti.resetGroundJumpSpeed();

    morti.sprite('mortiStanding');
    monte.sprite('monteStanding');

    monte.rotation = 0;

    if (this.highFiveZoomed) this.highFiveZoomOut();

    delay(() => {
      morti.viewportFollowDisabled = false;
    }, 700);
  },

  highFiveZoomIn() {
    Crafty.viewport.zoom(2, this.morti.x, this.morti.y - this.morti.u(7), 700);

    Crafty.one('CameraAnimationDone', () => Crafty.viewport.x = Math.round(Crafty.viewport.x));

    this.highFiveZoomed = true;
  },

  highFiveZoomOut() {
    Crafty.viewport.zoom(0.5, this.morti.x, this.dimensions.vh / 2, 500);

    Crafty.one('CameraAnimationDone', () => Crafty.viewport.x = Math.round(Crafty.viewport.x));

    this.highFiveZoomed = false;
  },
};

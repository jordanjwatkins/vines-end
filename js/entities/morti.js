import dimensions from '../viewport-dimensions';
import './morti/grab-hand';
import './morti/land-feet';
import './morti/reset';
import './morti/jump';
import './morti/viewport';

Crafty.c('MortiBase', {
  required: [
    '2D, WebGL, Jumper, Gravity, Collision, Tween, Delay',
    'debugRectangle, viewportDimensions',
    'mortiReset, mortiFeet, mortiJump, mortiViewport, mortiHand, mortiStanding, morti',
  ].join(', '),

  events: {
    'CheckJumping': function (ground) {
      this.onCheckJump(ground);
    },

    'CheckLanding': function () {
      this.canLand = (this.floored);

      this.maybeSyncHandFlipped();
    },

    'Move':  function () {
      this.onMove();
    },

    // round position before render
    // reduces visual problems (wobbly eyes, etc)
    'PreRender': function () {
      this.preciseX = this._x;
      this.preciseY = this._y;

      this._x = Math.round(this._x);
      this._y = Math.round(this._y);
    },

    // unround position after render
    // prevents collision bug caused by rounding on PreRender
    'PostRender': function () {
      this._x = this.preciseX;
      this._y = this.preciseY;
    },
  },

  onMove() {
    if (this.beforeOnMove) this.beforeOnMove();

    this.maybeReset();
    this.maybeLand();
    this.updateViewport();

    if (this.vy === 0) this.dropping = false;

    if (this.afterOnMove) this.afterOnMove();
  },

  maybeSyncHandFlipped() {
    if (!this.isUnrotated()) return;

    if (this.flipped && !this.handFlipped) this.flipHand();
    if (!this.flipped && this.handFlipped) this.unflipHand();
  },

  isUnrotated() {
    return (this.rotation % 360 === 0);
  },

  flipX(visualFlipDelay = 0) {
    if (!this.flipped) {
      this.flipped = true;

      if (this.rotation % 360 === 0) this.flipHand();

      setTimeout(() => (this.flip('X')), visualFlipDelay);
    }
  },

  unflipX(visualFlipDelay = 0) {
    if (this.flipped) {
      this.flipped = false;

      if (this.rotation % 360 === 0) this.unflipHand();

      setTimeout(() => (this.unflip('X')), visualFlipDelay);
    }
  },
});

function Morti() {
  let { vh, vunit, attr2dToPixels, u } = dimensions();

  vh = vh / vunit;

  const attr = {
    x: 2,
    y: vh - 52,
    w: 15,
    h: 16,
    rotation: 360,
    z: 100,
    bagCount: 0,
    bagRun: 0,
    bestBagRun: 0,
    hasJumpedAtLeastOnce: false,
    hasLandedAtLeastOnce: false,
  };

  attr2dToPixels(attr);

  attr.canLand = false;

  return Crafty.e('MortiBase')
    .attr(attr)
    .origin(u(7.5), u(7.5))

    .gravity('Floor')
    .gravityConst(u(90))

    .preventGroundTunneling(true)

    .one('CheckLanding', function () {
      this.hasLandedAtLeastOnce = true;

      if (this.onFirstLandingCheck) this.onFirstLandingCheck();
    })

    .one('CheckJumping', function () {
      this.hasJumpedAtLeastOnce = true;

      if (this.onFirstJumpCheck) this.onFirstJumpCheck();
    });
}

export default Morti;

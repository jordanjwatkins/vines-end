Crafty.c('rope', {
  required: '2D, WebGL, Color, Collision, Motion, AngularMotion, Tween, viewportDimensions, Delay, rope',

  init() {
    this.color('#0d4700');

    this.z = this.z || 101;

    this.initialAttributes = Object.assign({}, this.attr);
    this.grabbable = true;
  },

  startSwing() {
    const arotation = 81;

    this.arotation = (this.reversed) ? arotation : -arotation;
  },

  onGrabbed(grabber) {
    if (this.dangleTween && this.dangleTween.cancelTween) {
      this.dangleTween.cancelTween({ rotation: 0 });
    }

    this.attach(grabber);
    this.startSwing();
  },

  onSwing() {
    if (this.arotation !== 0 && (this.vrotation < -200 || this.vrotation > 200)) {
      this.arotation = 0;

      this.delay(() => {
        this.arotation = 0;
      }, 100);
    }
  },

  released(releaser) {
    this.detach(releaser);

    this.tween({ arotation: 0, vrotation: 0 }, 300, 'easeOutQuad');

    this.delay(() => this.dangle(), 300);
  },

  reset() {
    if (this.rotation % 360 < 1 && this.rotation % 360 > -1) {
      this.tween({ rotation: this.rotation + this.initialAttributes.rotation }, 500);
    }
  },

  dangle() {
    const rotations = this.rotation / 360;
    const currentRotationDegreesPastZero = rotations % 1 * 360;

    let nearestDangle;

    this.grabbable = false;

    if (rotations % 1 < -0.5) {
      nearestDangle = this.rotation -  currentRotationDegreesPastZero - 360;

      this.dangleTween = this.tween({
        rotation: nearestDangle,
      }, 800, 'easeOutQuad');
    } else {
      nearestDangle = this.rotation - currentRotationDegreesPastZero;

      this.dangleTween = this.tween({
        rotation: nearestDangle,
      }, 1000, 'easeInOutQuad');
    }

    // TODO: extract this to level 2
    if (this.reversed) return this.grabbable = false;

    this.delay(() => {
      this.grabbable = true;
    }, 900);
  },
});

function addRope(attr) {
  return Crafty.e('rope')
    .attr(attr)
    .initialAttributes = Object.assign({}, attr);
}

export default addRope;

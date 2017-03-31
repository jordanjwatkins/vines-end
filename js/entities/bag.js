import dimensions from '../viewport-dimensions';

Crafty.sprite('images/bag-of-crap.png', { bag: [0, 0, 11, 12] });

function addBag(attr) {
  const { attr2dToPixels, u } = dimensions();

  const frequencyDamper = 10 + u(0.4) * u(0.4);
  const amplitude = u(1);

  attr.z = attr.z || 399;
  attr.w = attr.w || 6;
  attr.h = attr.h || 6;

  if (!attr.pixelUnits) attr2dToPixels(attr);

  attr.startY = attr.y;

  const bag = Crafty.e('2D, WebGL, Motion, Collision, Tween, bag')
    .attr(attr)

    .bind('EnterFrame', function ({ frame, _dt }) {
      if (this.paused) return;

      this.y = Math.round(this.startY + Math.sin(frame / frequencyDamper) * amplitude);
    })

    .onHit('morti', function (hit) {
      if (this.grabbed) return;

      // require some a decent overlap before counting the hit
      if (hit[0].overlap < -u(3.7)) {
        setTimeout(() => {
          sounds['clap'].play();
        }, 10);

        hit[0].obj.bagCount++;
        hit[0].obj.bagRun++;

        this.z = 999;

        this.offset = u(6) * hit[0].obj.bagCount;
        this.grabbed = true;

        this.one('TweenEnd', () => {
          this.tweenDone = true;
        });

        this.tween({ x: -Crafty.viewport.x + this.offset, y: u(5), startY: u(5), w: u(4), h: u(4) }, 600);

        this.bind('ViewportScroll', function () {
          this.tween({ x: -Crafty.viewport.x + this.offset, y: u(5) }, 600);
        });
      }
    });

  bag.moveToY = function (y) {
    this.y = y;
    this.startY = y;
  };

  return bag;
}

export default addBag;

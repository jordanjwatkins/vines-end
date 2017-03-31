import dimensions from '../viewport-dimensions';

function addCloud(attr) {
  const { u, attr2dToPixels } = dimensions();

  attr.speed = attr.speed || 1;
  attr.rotate = 0.0001;
  attr.z = 200;

  attr2dToPixels(attr);

  attr.preciseX = attr.x;

  return Crafty.e('2D, WebGL, Motion, cloud').attr(attr)

    .bind('EnterFrame', function ({ dt }) {
      this.preciseX += u(attr.speed) / dt;

      this.x = Math.floor(this.preciseX);
    });
}

export default addCloud;

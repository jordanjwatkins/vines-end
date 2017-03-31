import dimensions from '../viewport-dimensions';

Crafty.sprite('images/ground-plants.png', { plants: [0, 0, 20, 6] });
Crafty.sprite('images/palm-1.png', { palm: [0, 0, 11, 13] });

const debug = true;
let floorComponents = '2D, WebGL, Floor';

if (debug === true) floorComponents = `${floorComponents}, debugRectangle`;

function grass(attr) {
  const { u, attr2dToPixels } = dimensions();

  attr.h = attr.h || 999;
  attr.z = attr.z || 200;

  if (!attr.pixelUnits) attr2dToPixels(attr);

  const green = Crafty.e('2D, WebGL, Color, greenGrass')
    .attr(attr)
    .color('#176006');

  const grassWidth = attr.grassWidth || u(10);

  let widthLeft = attr.w;
  let i = 0;

  while (widthLeft > 0) {
    let y;

    if (attr.hanging) {
      y = attr.y + attr.h;
    } else {
      y = attr.y - u(5);
    }

    if (attr.grassWidth) {
      widthLeft = attr.grassWidth;
    }

    const grass = Crafty.e('2D, WebGL, Sprite, plants')
      .attr({
        x: attr.x + grassWidth * i,
        y: y,
        w: attr.grassWidth || (grassWidth > widthLeft) ? widthLeft : grassWidth,
        h: attr.grassHeight || u(5.5),
        z: attr.z,
      });

    if (attr.hanging) grass.flip('Y');

    green.attach(grass);

    widthLeft -= grassWidth;

    i++;
  }

  if (!attr.hasFloor) return;

  const floor = Crafty.e(`${floorComponents}, grass`)
    .attr({
      ...attr,
      h: u(3),
      x: attr.x + u(0.8),
      w: attr.w - u(1.7),
    });

  green.attach(floor);

  return { floor, green, grass };
}

function tree(attr) {
  const { u, attr2dToPixels } = dimensions();

  if (!attr.pixelUnits) attr2dToPixels(attr);

  const tree = Crafty.e('2D, WebGL, Wall, palm')
    .attr(attr);

  tree.origin(tree.w / 2, 0);

  attr.hasFloor = attr.hasFloor || false;

  const trunk = Crafty.e('2D, WebGL, Color, Wall')
    .attr({
      ...attr,
      y: attr.y + attr.h,
      w: attr.w / 5.5,
      x: attr.x + attr.w / 2 - attr.w / 5.5 / 4,
      z: attr.z - 1,
      h: u(attr.trunkLength) || 800,
    })
    .color('#4F2C06');

  tree.attach(trunk);

  if (!attr.hasFloor) return tree;

  Crafty.e(`${floorComponents}, tree`)
    .attr({
      x: attr.x + attr.w / 3,
      y: attr.y + u(2.25),
      w: attr.w / 2.5,
      h: u(2),
      z: 300,
    });

  return tree;
}

function color(attr, color = 'brown') {
  const { u, attr2dToPixels } = dimensions();

  attr.h = attr.h || 999;

  if (!attr.pixelUnits) attr2dToPixels(attr);

  attr.hasFloor = attr.hasFloor || false;

  Crafty.e('2D, WebGL, Color, Wall')
    .attr(attr)
    .color(color);

  if (!attr.hasFloor) return;

  Crafty.e(floorComponents)
    .attr({
      x: attr.x,
      y: attr.y,
      w: attr.w,
      h: u(2),
    });
}

const floors = {
  grass,
  color,
  tree,
};

export default floors;

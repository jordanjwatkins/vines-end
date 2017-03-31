import dimensions from '../../viewport-dimensions';
import terrain from '../../entities/terrain';

function background(dimensions) {
  backgroundSky(dimensions);

  atmosphere({ z: -60, alpha: 0.18 });

  atmosphere({ z: 99950, alpha: 0.08 });

  backgroundTerrain(dimensions);
}

function atmosphere({ z = -60, alpha = 0.15 } = {}) {
  const { vw, vh } = dimensions();

  Crafty.e('2D, WebGL, Color')
    .attr({ x: 0, y: 0, w: vw, h: vh, z: z, alpha })
    .color('#3181ff')

    // follow viewport
    .bind('ViewportScroll', function () {
      this.x = -Crafty.viewport.x;
    });
}

function backgroundSky() {
  Crafty.background('#3181ff'); // sky blue
}

function backgroundTerrain({ vh, vunit }) {
  // vh in vunits
  vh = vh / vunit;

  // ceiling vines
  terrain.grass({
    x: -3.9 * vunit + 18,
    y: -2.4 * vunit - 100,
    w: 3.5 * vunit,
    h: 0.1,
    hanging: true,
    grassHeight: 223 * vunit,
    z: 499,
  });

  // ceiling vines
  terrain.grass({
    x: 70,
    y: -4 * vunit - 20,
    w: 1,
    h: 0.1,
    hanging: true,
    grassHeight: 180 * vunit,
    grassWidth: 15 * vunit,
    z: 499,
  });

  // @ platform
  terrain.tree({
    x: -2,
    y: vh - 155,
    w: 78,
    h: 155,
    z: -999,
  });

   // @ water 1
  terrain.tree({
    x: 25,
    y: vh - 165,
    w: 150,
    h: 190,
    z: -999,
  });

  // @ water 1
  terrain.tree({
    x: 120,
    y: vh - 115,
    w: 37,
    h: 70,
    trunkLength: 300,
    z: -999,
  });

  // @ water 2
  terrain.tree({
    x: 227,
    y: vh - 73,
    w: 21,
    h: 30,
    trunkLength: 200,
    z: -990,
  });

  // @ water 2
  terrain.tree({
    x: 230,
    y: vh - 120,
    w: 70,
    h: 120,
    z: -900,
  });

  // @ water 2
  terrain.tree({
    x: 240,
    y: vh - 150,
    w: 110,
    h: 190,
    z: -63,
  });

  // @ water 2
  terrain.tree({
    x: 272,
    y: vh - 110,
    w: 90,
    h: 120,
    z: -59,
  });

  // @ cliff
  terrain.tree({
    x: 445,
    y: vh - 60,
    w: 30,
    h: 40,
    z: 0,
    trunkLength: 990,
  }).rotation = 47;
}

export default background;

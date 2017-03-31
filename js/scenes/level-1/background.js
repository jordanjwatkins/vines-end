import dimensions from '../../viewport-dimensions';
import terrain from '../../entities/terrain';

function background(dimensions) {
  backgroundSky();

  atmosphere();

  atmosphere({ z: -50, alpha: 0.38 });

  backgroundTerrain(dimensions);
}

function atmosphere({ z = -60, alpha = 0.35 } = {}) {
  const { vw, vh } = dimensions();

  Crafty.e('2D, WebGL, Color')
    .attr({ x: 0, y: 0, w: vw, h: vh, z, alpha })
    .color('#000')

    // follow viewport
    .bind('ViewportScroll', function () {
      this.x = -Crafty.viewport.x;
    });
}

function backgroundSky() {
  Crafty.background('#002801'); // black green
}

function backgroundTerrain({ vh, vunit }, z) {
  // vh in vunits
  vh = vh / vunit;

  z = z || -61;

  // ceiling vines
  terrain.grass({
    x: 0,
    y: -73.5,
    w: 60,
    h: 0.1,
    hanging: true,
    grassHeight: 180 * vunit,
    z: -62,
  });

  // ceiling vines
  terrain.grass({
    x: 80,
    y: -93.5,
    w: 60,
    h: 0.1,
    hanging: true,
    grassHeight: 180 * vunit ,
    z: -52,
  });

  // ceiling vines
  terrain.grass({
    x: 100,
    y: -3 * vunit,
    w: 120,
    h: 0.1,
    hanging: true,
    grassHeight: 180 * vunit,
    z: -62,
  });

  // ceiling vines
  terrain.grass({
    x: 90,
    y: -6 * vunit,
    w: 1,
    h: 0.1,
    hanging: true,
    grassHeight: 180 * vunit,
    grassWidth: 15 * vunit,
    z: -60,
  });

  // ceiling vines
  terrain.grass({
    x: 40,
    y: -6 * vunit,
    w: 1,
    h: 0.1,
    hanging: true,
    grassHeight: 180 * vunit,
    grassWidth: 10 * vunit,
    z: -60,
  });

  // ceiling vines
  terrain.grass({
    x: 250,
    y: -6 * vunit,
    w: 1,
    h: 0.1,
    hanging: true,
    grassHeight: 180 * vunit,
    grassWidth: 10 * vunit,
    z: -60,
  });

  // ceiling vines
  terrain.grass({
    x: 250,
    y: -17 * vunit,
    w: 80,
    h: 0.1,
    hanging: true,
    grassHeight: 180 * vunit,
    z: -62,
  });

  // grass on start platform
  terrain.grass({
    x: -20,
    y: vh - 28,
    w: 45,
    h: 0.2,
    z: 12,
    hanging: true,
  });

  // @ start platform
  terrain.tree({
    x: -72,
    y: vh - 114,
    w: 110,
    h: 100,
    z: 11,
  });

  // @ start platform
  terrain.tree({
    x: -95,
    y: vh - 110,
    w: 180,
    h: 80,
    z: -51,
  });

  // @ start platform
  terrain.tree({
    x: -75,
    y: vh - 70,
    w: 180,
    h: 80,
    z,
  });

  // @ chasm
  terrain.tree({
    x: 28,
    y: vh - 130,
    w: 184,
    h: 280,
    z: -59,
  });

  // @ exit vine
  terrain.tree({
    x: 90,
    y: vh - 120,
    w: 150,
    h: 190,
    z: -49,
  });

  // tree 3
  terrain.tree({
    x: 190,
    y: vh - 80,
    w: 30,
    h: 80,
    z,
  });

  // tree 4
  terrain.tree({
    x: 210,
    y: vh - 90,
    w: 30,
    h: 90,
    z,
  });

  // tree 5
  terrain.tree({
    x: 230,
    y: vh - 40,
    w: 30,
    h: 90,
    z,
  });

  // tree 6
  terrain.tree({
    x: 250,
    y: vh - 90,
    w: 110,
    h: 190,
    z,
  });
}

export default background;

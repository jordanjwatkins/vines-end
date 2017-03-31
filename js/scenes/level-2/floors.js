import terrain from '../../entities/terrain';

function floors({ vh, vunit }) {
  // convert vh to vunits
  vh = vh / vunit;

  let x = 0;
  let w = 160;

  // start platform
  terrain.color({
    x: -60,
    y: vh - 20,
    w: 80,
    hasFloor: true,
  }, '#4F2C06');

  // grass 1
  terrain.grass({
    x: x - 35,
    y: vh - 20,
    w: 60,
    h: 2,
    hasFloor: true,
  });

  // water 1
  terrain.color({
    x,
    y: vh - 3,
    w: w + 240,
    z: 8500,
  }, 'blue');

  x += w;
  w = 50;

  // rising island
  const island = terrain.grass({
    x: x - 45,
    y: vh + 3,
    w: 40,
    hasFloor: true,
    z: 101,
  });

  island.floor.addComponent('unsupportive');
  island.green.addComponent('island');

  // grass 2 + tree 1
  terrain.tree({
    x: x - 7,
    y: vh - 30,
    w: 20,
    h: 50,
    hasFloor: true,
    z: 500,
  });

  terrain.grass({
    x,
    y: vh - 3,
    w,
    hasFloor: true,
    z: 504,
  });

  // water 2
  x += w;
  w = 160;

  terrain.color({
    x,
    y: vh - 3,
    w,
    z: 500,
  }, 'blue');

  x += w;
  w = 30;

  // rising island 2
  const island2 = terrain.grass({
    x: x - 45,
    y: vh + 3,
    w: 40,
    hasFloor: true,
    z: 101,
  });

  island2.floor.addComponent('unsupportive');
  island2.green.addComponent('island');

  // @ exit island
  terrain.grass({
    x,
    y: vh - 3,
    w,
    hasFloor: true,
  });

  x += w;
  w = 7;

  // waterfall
  terrain.color({
    x,
    y: vh - 3,
    w,
    z: 500,
  }, 'blue');

  // @ beyond exit
  terrain.grass({
    x: x + 49,
    y: vh - 50,
    w: 4,
    h: 0.01,
    hasFloor: true,
    hanging: true,
  });
}

export default floors;

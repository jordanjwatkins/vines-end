import terrain from '../../entities/terrain';

function floors({ vh, vunit }) {
  // vh in vunits
  vh = vh / vunit;

  // grass near side
  terrain.grass({
    x: -30,
    y: vh - 1,
    w: 61,
    hasFloor: true,
  });

  // starting platform top
  terrain.color({
    x: -20,
    y: 0,
    w: 40,
  }, '#472705');

  // starting platform top
  terrain.color({
    x: -20,
    y: 0,
    w: 40,
    h: vh * 0.45,
  }, '#4F2C06');

  // starting platform
  terrain.color({
    x: -20,
    y: vh - 28,
    w: 40,
    hasFloor: true,
  }, '#4F2C06');

  // grass far side
  terrain.grass({
    x: 129,
    y: vh - 1,
    w: 35,
    hasFloor: true,
  });

  // platform tree
  terrain.tree({
    x: 120,
    y: vh - 28,
    w: 20,
    h: 28,
    z: 10,
    hasFloor: true,
  });
}

export default floors;

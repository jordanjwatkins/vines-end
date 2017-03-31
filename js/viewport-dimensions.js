function viewportDimensions() {
  const vw = Crafty.viewport.rect()._w;
  const vh = Crafty.viewport.rect()._h;
  const vmin = Math.min(vh, vw);
  const vmax = Math.max(vh, vw);
  const vunit = vmin / 100;

  const attr2dToPixels = (attr) => {
    attr.w *= vunit;
    attr.h *= vunit;
    attr.x *= vunit;
    attr.y *= vunit;
  };

  const toPixels = (gameUnit) => {
    return gameUnit * vunit;
  };

  return {
    vw,
    vh,
    vmin,
    vmax,
    vunit,
    unit: vunit,
    u: toPixels,
    attr2dToPixels: attr2dToPixels,
  };
}

Crafty.c('viewportDimensions', {
  init() {
    this.dimensions = viewportDimensions();
    this.u = this.dimensions.u;
  },
});

export default viewportDimensions;

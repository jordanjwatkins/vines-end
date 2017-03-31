Crafty.c('mortiViewport', {
  updateViewport() {
    if (this.viewportFollowDisabled) return;

    const { vw } = this.dimensions;

    Crafty.viewport.clampToEntities = false;

    // follow on x axis once past half the screen
    if (this.x < vw / 2) {
      Crafty.viewport.x = 0;
    } else {
      // rounding allows for tree / trunk alignment despite scrolling
      Crafty.viewport.x = Math.round((this.x - (vw / 2)) * -1);
    }
  },
});

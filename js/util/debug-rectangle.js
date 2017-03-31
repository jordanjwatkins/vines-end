export default () => {
  Crafty.c('debugRectangle', {
    required: 'DebugRectangle',

    init() {
      this.debugColor('red');
    },

    debugColor(color) {
      if (color) this._debugColor = color;

      this.debugStroke(this._debugColor).debugRectangle(this);

      return this._debugColor;
    },
  });

  Crafty.c('debugRectanglePlus', {
    required: 'Color',

    init() {
      this.debugColor('red');
      this.z = 500;
    },

    debugColor(color) {
      if (color) this._debugColor = color;

      this.color(this._debugColor);

      return this._debugColor;
    },
  });
};

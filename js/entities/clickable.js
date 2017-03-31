import dimensions from '../viewport-dimensions';

const dev = false;

function clickable(eventName, w, h, callback) {
  return Crafty.e('2D, WebGL, Mouse').attr({ x: 0, y:0, w: w, h: h })

    .bind(eventName, function (MouseEvent) {
      if (dev) logPosition(MouseEvent);

      if (callback) callback(MouseEvent);
    });
}

function logPosition() {
  const { vunit } = dimensions();

  console.log('click position in vunits: ', MouseEvent.realX / vunit, MouseEvent.realY / vunit);
}

export default clickable;

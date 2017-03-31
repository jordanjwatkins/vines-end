import Level1 from './level-1';
import Level2 from './level-2';

function init(appState) {
  Crafty.defineScene(
    'level-1',
    () => new Level1({ appState })
  );

  Crafty.defineScene(
    'level-2',
    () => new Level2({ appState })
  );
}

export default init;

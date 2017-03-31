/* global Howl */

const sounds = {
  'low-tom': 'sounds/low-tom.mp3',
  'mid-tom': 'sounds/mid-tom.mp3',
  'high-tom': 'sounds/high-tom.mp3',
  'shake': 'sounds/shake.mp3',
  'Jump20': 'sounds/Jump20.wav',
  'rim': 'sounds/rim.mp3',
  'clap': 'sounds/clap.mp3',
  'closed': 'sounds/closed.mp3',
  'descending': 'sounds/descending.mp3',
};

for (const key in sounds) { // eslint-disable-line guard-for-in
  sounds[key] = new Howl({
    src: [sounds[key]],
  });
}

sounds['Jump20'].volume(0.08);

sounds['clap'].volume(0.08);
sounds['closed'].volume(0.1);

sounds['minimal-french-electro-sm'] = new Howl({
  src: ['sounds/minimal-french-electro-sm.mp3'],
  sprite: {
    loop: [200, 15850, true],
    bit1: [100, 600],
    bit2: [2000, 600],
  },
});

export default sounds;

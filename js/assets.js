const assets = {
  'sprites': {
    'images/cloud-bored-pink.png': {
      'tile': 32,
      'tileh': 18,
      'map': { 'cloud': [0, 0] },
    },

    'images/morti-sheet.png': {
      'tile': 18,
      'tileh': 19,
      'paddingX': 1,
      'map': {
        'mortiStanding': [0, 0],
        'mortiJumping': [1, 0],
      },
    },

    'images/monte-sheet.png': {
      'tile': 144,
      'tileh': 142,
      'paddingY': 3,
      'map': {
        'monteJumping': [0, 0],
        'monteStanding': [0, 1],
      },
    },
  },
};

export default assets;

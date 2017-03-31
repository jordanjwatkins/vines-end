this.onmessage = function (event) {
  console.log('worker received message');

  this.eachPixel(event.data.image, this[event.data.transformName]);

  postMessage({ image: event.data.image });
};

this.eachPixel = (imageData, fn) => {
  const pixels = imageData.data;

  let x, y;

  for (let i = 0; i < pixels.length; i += 4) {
    x = (i / 4) % imageData.width;
    y = Math.floor((i / 4) / imageData.width);

    const { r, g, b, a } = fn({ imageData, x, y, pixelIndex: i });

    pixels[i] = r;
    pixels[i + 1] = g;
    pixels[i + 2] = b;
    pixels[i + 3] = a;
  }
};

this.noiseSmoothedGreenFadeGradientTransform = ({ x, imageData }) => {
  const fadeSpeed = 255 / imageData.width;
  const noise = (Math.random() * 5) * (-1 + Math.random() * 2);

  let alpha = 255 - fadeSpeed * x + noise;

  // some browsers (Edge) don't like invalid values
  if (alpha < 0) alpha = 0;
  if (alpha > 255) alpha = 255;

  return {
    r: 0,
    g: 30,
    b: 1,
    a: alpha,
  };
};

this.skyGradientTransform = ({ y, imageData }) => {
  // moving these calculations outside of loop seems to hurt average perfomance slightly
  const fadeSpeed = 255 / (imageData.height / 2);
  const noise = (Math.random() * 5) * (-1 + Math.random() * 2);

  let alpha = 155 - fadeSpeed * y + noise;

  // some browsers (Edge) don't like invalid values
  if (alpha < 0) alpha = 0;

  return {
    r: 255,
    g: 255,
    b: 255,
    a: alpha,
  };
};

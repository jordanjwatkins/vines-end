class GradientGenerator {
  constructor(appState, gradientId) {
    const canvas = document.createElement('canvas');

    this.gradientId = gradientId;

    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.appState = appState;

    if (this.gradientId === 'gradient1') {
      this.transformName = 'skyGradientTransform';

      this.canvas.width = 128;
      this.canvas.height = 512;

      if (Crafty.viewport.rect()._h > 512) {
        this.canvas.height = 1024;
      }
    } else {
      this.transformName = 'noiseSmoothedGreenFadeGradientTransform';

      this.canvas.height = 32;
      this.canvas.width = 1024;

      if (Crafty.viewport.rect()._w * 1.1 > 1024 || Crafty.viewport.rect()._h * 1.1 > 1024) {
        this.canvas.width = 2048;
      }
    }

    if (this.shouldGenerate()) this.generateImageData();
  }

  shouldGenerate() {
    let savedGradient = localStorage.getItem(this.gradientId);

    try {
      savedGradient = JSON.parse(savedGradient);

      if (
        savedGradient &&
        savedGradient.width === this.canvas.width &&
        savedGradient.height === this.canvas.height
      ) {
        console.log('already generated');

        return false;
      }

      return true;
    } catch (e) {
      return true;
    }
  }

  generateImageData() {
    this.waitingOnWorkers = true;

    const imageData = this.context.getImageData(0, 0, this.canvas.getAttribute('width'), this.canvas.getAttribute('height'));

    const gradientWorker = new Worker('js/worker.js');

    gradientWorker.onmessage = this.makeGradientWorkerDoneHandler(this.gradientId);

    gradientWorker.postMessage({ image: imageData, transformName: this.transformName });
  }

  makeGradientWorkerDoneHandler(storageKey) {
    return (event) => {
      console.log('worker done', event.data);

      this.waitingOnWorkers = false;

      this.appState[storageKey] = event.data.image;
    };
  }

  maybeSaveGradientImageData() {
    const id = this.gradientId;

    console.log(`maybe saving gradient: ${id}`);

    if (this.appState[id]) {
      console.log('saving', id);

      const imageUrl = this.imageDataToDataUrl(this.appState[id]);

      localStorage.setItem(id, JSON.stringify({ imageUrl, width: this.context.canvas.width, height: this.context.canvas.height }));

      this.appState[id] = null;

      this[`${this.gradientId}Url`] = imageUrl;
    } else {
      const item = JSON.parse(localStorage.getItem(id));

      this[`${this.gradientId}Url`] = item.imageUrl;
    }
  }

  imageDataToDataUrl(imageData) {
    this.context.putImageData(imageData, 0, 0);

    return this.canvas.toDataURL('image/png');
  }
}

export default GradientGenerator;

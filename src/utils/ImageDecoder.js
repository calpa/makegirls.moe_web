import Config from '../Config';

class ImageDecoder {
  static DecodeNoiseOrigin(dataURL) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const canvasWidth = Config.gan.noiseLength;
      const canvasHeight = 34;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');

      const image = new Image();
      image.onload = () => {
        if (image.width !== canvasWidth || image.height !== canvasHeight) {
          return reject({ error: 'Invalid Noise Image.' });
        }
        ctx.drawImage(image, 0, 0);
        const imgd = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const pix = imgd.data;
        const result = [];
        for (let i = 0; i < canvasWidth * 4; i += 4) {
          result.push([1 - pix[i + 2] / 256, 1 - pix[i + 1] / 256]);
        }
        resolve(result);
      };
      image.onerror = function () {
        reject({ error: 'Failed to load image.' });
      };

      image.src = dataURL;
    });
  }
}

export default ImageDecoder;

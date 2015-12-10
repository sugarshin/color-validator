import getPixels from 'get-pixels';

export default function getPixelsAsync(image) {
  return new Promise((resolve, reject) => {
    getPixelsAsync(image, (err, pixels) => {
      if (err) { reject(err); }
      resolve(pixels);
    });
  });
}

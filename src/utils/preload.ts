// const preloadedImages = new Set<HTMLImageElement>();
const preloadedImages = new Set<string>();

export function preloadImages(array: (string | undefined)[]) {
  for (let i = 0; i < array.length; i++) {
    const src = array[i];
    if (!src) continue;

    if (preloadedImages.has(src)) continue;

    const img = new Image();
    img.src = src;
    preloadedImages.add(src);

    img.onload = () => {
      // console.log(`Image ${src} loaded`);
      preloadedImages.delete(src);
      img.remove();
    };
  }
}

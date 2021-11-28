import sharp from "sharp";

export function resizeImage(width: number, height: number, img: Buffer): Promise<Buffer> {
  return sharp(img)
    .resize({
      width,
      height,
      fit: "fill",
    })
    .toBuffer();
}

export function imageToJpeg(img: Buffer): Promise<Buffer> {
  return sharp(img)
    .jpeg({
      mozjpeg: true,
    })
    .toBuffer();
}

export function imageToWebP(img: Buffer): Promise<Buffer> {
  return sharp(img).webp().toBuffer();
}

export function imageToPng(img: Buffer): Promise<Buffer> {
  return sharp(img).png().toBuffer();
}

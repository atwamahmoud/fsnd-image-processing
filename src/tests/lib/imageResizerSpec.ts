import {readFile} from "fs/promises";
import sharp from "sharp";
import {imageToJpeg, imageToPng, imageToWebP, resizeImage} from "../../lib/imageResizer";
import {getFilePath} from "../../utils/getFilePath";

describe("Image resizing tests", () => {
  const WIDTH = 250;
  const HEIGHT = 250;
  let image: Buffer;
  beforeEach(async () => {
    image = await readFile(getFilePath("testing_image_do_not_delete.jpeg"));
  });
  it("Returns a buffer", async () => {
    const resized = await resizeImage(WIDTH, HEIGHT, image);
    expect(resized).toBeInstanceOf(Buffer);
  });

  it("resizes image to correct dimensions", async () => {
    const resized = await resizeImage(WIDTH, HEIGHT, image);
    const metadata = await sharp(resized).metadata();
    expect(metadata.width).toBe(WIDTH);
    expect(metadata.height).toBe(HEIGHT);
  });
});
describe("Image formating tests", () => {
  let image: Buffer;
  beforeEach(async () => {
    image = await readFile(getFilePath("testing_image_do_not_delete.jpeg"));
  });
  it("jpeg to png is success", async () => {
    const formatted = await imageToPng(image);
    const metadata = await sharp(formatted).metadata();
    expect(metadata.format).toBe("png");
  });
  it("jpeg to webp is success", async () => {
    const formatted = await imageToWebP(image);
    const metadata = await sharp(formatted).metadata();
    expect(metadata.format).toBe("webp");
  });

  it("webp to png is success", async () => {
    const webp = await imageToWebP(image);
    const formatted = await imageToPng(webp);
    const metadata = await sharp(formatted).metadata();
    expect(metadata.format).toBe("png");
  });
  it("webp to jpeg is success", async () => {
    const webp = await imageToWebP(image);
    const formatted = await imageToJpeg(webp);
    const metadata = await sharp(formatted).metadata();
    expect(metadata.format).toBe("jpeg");
  });
  it("png to jpeg is success", async () => {
    const png = await imageToPng(image);
    const formatted = await imageToJpeg(png);
    const metadata = await sharp(formatted).metadata();
    expect(metadata.format).toBe("jpeg");
  });
  it("png to webp is success", async () => {
    const png = await imageToPng(image);
    const formatted = await imageToWebP(png);
    const metadata = await sharp(formatted).metadata();
    expect(metadata.format).toBe("webp");
  });
});

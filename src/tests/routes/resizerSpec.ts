import sharp from "sharp";
import supertest from "supertest";
import {app} from "../..";
import {HttpCodes} from "../../utils/constants";

const request = supertest(app);
describe("Test /resize endpoint returns 404 for methods other than GET", () => {
  it("Returns 404 for POST", async () => {
    const response = await request.post("/resize");
    expect(response.status).toBe(HttpCodes.notFound);
  });
  it("Returns 404 for PUT", async () => {
    const response = await request.put("/resize");
    expect(response.status).toBe(HttpCodes.notFound);
  });
  it("Returns 404 for DELETE", async () => {
    const response = await request.delete("/resize");
    expect(response.status).toBe(HttpCodes.notFound);
  });
  it("Returns 404 for PATCH", async () => {
    const response = await request.patch("/resize");
    expect(response.status).toBe(HttpCodes.notFound);
  });
});
describe("Test /resize endpoint returns 400 for incorrect dimensions", () => {
  it("Returns 400 when width is invalid", async () => {
    const responses = await Promise.all([
      request.get(
        "/resize?height=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png",
      ),
      request.get(
        "/resize?width=13.4?height=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png",
      ),
      request.get(
        "/resize?width=13 ?height=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png",
      ),
      request.get(
        "/resize?width=?height=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png",
      ),
      request.get(
        "/resize?width= ?height=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png",
      ),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.badRequest));
  });
  it("Returns 400 when height is invalid", async () => {
    const responses = await Promise.all([
      request.get(
        "/resize?width=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png",
      ),
      request.get(
        "/resize?height=13.4?width=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png",
      ),
      request.get(
        "/resize?height=13 ?width=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png",
      ),
      request.get(
        "/resize?height=?width=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png",
      ),
      request.get(
        "/resize?height= ?width=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png",
      ),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.badRequest));
  });
});

describe("Test /resize endpoint returns 404 for incorrect files", () => {
  it("Returns 404 when file couldn't be found", async () => {
    const response = await request.get("/resize?filename=file_that_doesnt_exisit&height=250&width=250");
    expect(response.statusCode).toBe(HttpCodes.notFound);
  });
});

describe("Test /resize endpoint sends correct responses for valid requests", () => {
  const filename = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png";
  const width = 250;
  const height = 250;
  const url = `/resize?url=${filename}&width=${width}&height=${height}`;

  it("Returns jpeg as default encoding", async () => {
    const response = await request.get(url).responseType("arrayBuffer");
    const metadata = await sharp(response.body).metadata();
    expect(metadata.format).toBe("jpeg");
    expect(response.headers["content-type"]).toBe("image/jpeg");
  });
  it("Returns correct content encoding when specifing webp", async () => {
    const response = await request.get(`${url}&type=webp`).responseType("arrayBuffer");
    const metadata = await sharp(response.body).metadata();
    expect(metadata.format).toBe("webp");
    expect(response.headers["content-type"]).toBe("image/webp");
  });
  it("Returns correct content encoding when specifing jpeg", async () => {
    const response = await request.get(`${url}&type=jpeg`).responseType("arrayBuffer");
    const metadata = await sharp(response.body).metadata();
    expect(metadata.format).toBe("jpeg");
    expect(response.headers["content-type"]).toBe("image/jpeg");
  });

  it("Returns correct content encoding when specifing png", async () => {
    const response = await request.get(`${url}&type=png`).responseType("arrayBuffer");
    const metadata = await sharp(response.body).metadata();
    expect(metadata.format).toBe("png");
    expect(response.headers["content-type"]).toBe("image/png");
  });

  it("Returns correct dimensions", async () => {
    const response = await request.get(`${url}&type=png`).responseType("arrayBuffer");
    const metadata = await sharp(response.body).metadata();
    expect(metadata.width).toBe(width);
    expect(metadata.height).toBe(height);
  });
});

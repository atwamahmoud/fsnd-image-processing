import supertest from "supertest";
import {app} from "../..";
import {HttpCodes} from "../../utils/constants";

const request = supertest(app);
describe("Test /placeholder endpoint returns 404 for methods other than GET", () => {
  it("Returns 404 for POST", async () => {
    const response = await request.post("/placeholder");
    expect(response.status).toBe(HttpCodes.notFound);
  });
  it("Returns 404 for PUT", async () => {
    const response = await request.put("/placeholder");
    expect(response.status).toBe(HttpCodes.notFound);
  });
  it("Returns 404 for DELETE", async () => {
    const response = await request.delete("/placeholder");
    expect(response.status).toBe(HttpCodes.notFound);
  });
  it("Returns 404 for PATCH", async () => {
    const response = await request.patch("/placeholder");
    expect(response.status).toBe(HttpCodes.notFound);
  });
});
describe("Test /placeholder endpoint returns 400 for incorrect dimensions", () => {
  it("Returns 400 when width is invalid", async () => {
    const responses = await Promise.all([
      request.get("/placeholder?height=250"),
      request.get("/placeholder?width=13.4?height=250"),
      request.get("/placeholder?width=13 ?height=250"),
      request.get("/placeholder?width=?height=250"),
      request.get("/placeholder?width= ?height=250"),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.badRequest));
  });
  it("Returns 400 when height is invalid", async () => {
    const responses = await Promise.all([
      request.get("/placeholder?width=250"),
      request.get("/placeholder?height=13.4?width=250"),
      request.get("/placeholder?height=13 ?width=250"),
      request.get("/placeholder?height=?width=250"),
      request.get("/placeholder?height= ?width=250"),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.badRequest));
  });
});

describe("Test /placeholder endpoint returns 400 for incorrect colors", () => {
  it("Returns 400 when bgColor is invalid", async () => {
    const responses = await Promise.all([
      request.get("/placeholder?height=250&width=250&bgColor="),
      request.get("/placeholder?height=250&width=250&bgColor=color"),
      request.get("/placeholder?height=250&width=250&bgColor=rgba"),
      request.get("/placeholder?height=250&width=250&bgColor=rgb"),
      request.get("/placeholder?height=250&width=250&bgColor=#ff"),
      request.get("/placeholder?height=250&width=250&bgColor=rgb(, 33, 1)"),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.badRequest));
  });
  it("Returns 400 when textColor is invalid", async () => {
    const responses = await Promise.all([
      request.get("/placeholder?height=250&width=250&textColor="),
      request.get("/placeholder?height=250&width=250&textColor=color"),
      request.get("/placeholder?height=250&width=250&textColor=rgba"),
      request.get("/placeholder?height=250&width=250&textColor=rgb"),
      request.get("/placeholder?height=250&width=250&textColor=#ff"),
      request.get("/placeholder?height=250&width=250&textColor=rgb(, 33, 1)"),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.badRequest));
  });
});

describe("Test /placeholder endpoint returns 200 with correct header for valid requests", () => {
  it("Returns correct header", async () => {
    const response = await request.get("/placeholder?width=240&height=240");
    expect(response.headers["content-type"]).toBe("image/svg+xml");
  });
  it("Returns 200 when params are valid", async () => {
    const responses = await Promise.all([
      request.get("/placeholder?height=250&width=250&textColor=%23fff&bgColor=%23000&text=Hello, World!"),
      request.get("/placeholder?height=250&width=250&textColor=%23fff&bgColor=%23000"),
      request.get("/placeholder?height=250&width=250&textColor=%23fff"),
      request.get("/placeholder?height=250&width=250"),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.ok));
  });
});

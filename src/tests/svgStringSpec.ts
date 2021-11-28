import {createSVGString} from "../lib/svgString";
import cheerio from "cheerio";
import {DEFAULT_SVG_BG_COLOR, DEFAULT_SVG_TEXT_COLOR} from "../utils/constants";

describe("SVG string generation", () => {
  it("Creates string with correct dimensions", () => {
    const svg = createSVGString({
      width: 250,
      height: 250,
    });
    const $ = cheerio.load(svg);
    expect($("svg").attr("width")).toBe("250");
    expect($("svg").attr("height")).toBe("250");
    expect($("rect").attr("width")).toBe("250");
    expect($("rect").attr("height")).toBe("250");
  });
  it("Creates string with default background color", () => {
    const svg = createSVGString({
      width: 250,
      height: 250,
    });
    const $ = cheerio.load(svg);
    expect($("rect").attr("fill")).toBe(DEFAULT_SVG_BG_COLOR);
  });
  it("Creates string with default text colors", () => {
    const svg = createSVGString({
      width: 250,
      height: 250,
    });
    const $ = cheerio.load(svg);
    expect($("text").attr("fill")).toBe(DEFAULT_SVG_TEXT_COLOR);
  });
  it("Creates string with default text", () => {
    const svg = createSVGString({
      width: 250,
      height: 250,
    });
    const $ = cheerio.load(svg);
    expect($("rect").attr("fill")).toBe(DEFAULT_SVG_BG_COLOR);
    expect($("text").text().trim()).toBe("250x250");
  });
  it("Creates string with correct background color", () => {
    const bgColor = "#ffffff";
    const svg = createSVGString({
      width: 250,
      height: 250,
      bgColor,
    });
    const $ = cheerio.load(svg);
    expect($("rect").attr("fill")).toBe(bgColor);
  });
  it("Creates string with correct text color", () => {
    const textColor = "#000000";
    const svg = createSVGString({
      width: 250,
      height: 250,
      textColor,
    });
    const $ = cheerio.load(svg);
    expect($("text").attr("fill")).toBe(textColor);
  });
  it("Creates string with correct text", () => {
    const text = "Hello, World!";
    const svg = createSVGString({
      width: 250,
      height: 250,
      text,
    });
    const $ = cheerio.load(svg);
    expect($("text").text().trim()).toBe(text);
  });
});

import {getCacheFilename} from "../../utils/cache";

describe("cache filenames are escaped and dims are added correctly", () => {
  it("replaces all slashes with {{slash}}", () => {
    const dimension = 250;
    const filename = "facebook.com/aim";
    const escapedFilename = "facebook.com{{slash}}aim250x250";
    expect(getCacheFilename(dimension, dimension, filename)).toBe(escapedFilename);
  });
  it("adds correct dims at the end of filename", () => {
    const width = 250;
    const height = 350;
    const filename = "aim";
    const escapedFilename = "aim250x350";
    expect(getCacheFilename(width, height, filename)).toBe(escapedFilename);
  });
});

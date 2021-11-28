import {rm} from "fs/promises";
import {CACHE_DIR, IMG_DIR} from "../../utils/constants";
import {getFilePath} from "../../utils/getFilePath";
import {initDirs} from "../../utils/initDir";
import {validateFileCanBeAccessed} from "../../utils/validators";

describe("directories are initialized correctly", () => {
  beforeAll(async () => {
    const dirPaths = [getFilePath("", CACHE_DIR), getFilePath("", IMG_DIR)];
    await Promise.allSettled(
      dirPaths.map(async (path) => {
        const exists = await validateFileCanBeAccessed(path);
        if (!exists) return;
        await rm(path, {
          recursive: true,
          force: true,
        });
      }),
    );
  });
  it("CACHE_DIR is created if it doesn't exist", async () => {
    const dirPath = getFilePath("", CACHE_DIR);
    await initDirs();
    const val = await validateFileCanBeAccessed(dirPath);
    expect(val).toBe(true);
  });
  it("IMG_DIR is created if it doesn't exist", async () => {
    const dirPath = getFilePath("", IMG_DIR);
    await initDirs();
    const val = await validateFileCanBeAccessed(dirPath);
    expect(val).toBe(true);
  });
});

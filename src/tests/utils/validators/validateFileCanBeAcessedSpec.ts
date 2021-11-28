import {unlink, writeFile} from "fs/promises";
import {getFilePath} from "../../../utils/getFilePath";
import {validateFileCanBeAccessed} from "../../../utils/validators";

describe("Testing file access helper func. is setup correctly", () => {
  it("Returns false when file doesn't exist", async () => {
    const val = await validateFileCanBeAccessed(getFilePath("file_that_doesnt_exist"));
    expect(val).toBe(false);
  });
  it("Returns true when file exist and has no permission errors", async () => {
    const filePath = getFilePath("file_that_doesnt_exist");
    await writeFile(filePath, "test data\n");
    const val = await validateFileCanBeAccessed(filePath);
    await unlink(filePath);
    expect(val).toBe(true);
  });
  /**
   * This test is commented and not implemented since windows doesn't support the permissions that linux supports
   * which might confuse the reader of this code if he/she uses windows.
   * However this is how it should be implemented,
   * 1. create a file
   * 2. remove read permission from the current user using `fs.chmod`
   * 3. Call validateFileCanBeAcessed
   * 4. it should return false
   *
   * it("Returns false when file exist but we don't have a permission to read it", async (done) => {
   * });
   *
   *
   */
});

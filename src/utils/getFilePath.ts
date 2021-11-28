import {resolve} from "path";

export function getFilePath(filename: string, parentDir = ""): string {
  return resolve(__dirname, "../../", parentDir, filename);
}

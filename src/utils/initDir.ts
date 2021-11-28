import {mkdir} from "fs/promises";
import {CACHE_DIR, IMG_DIR} from "./constants";
import {getFilePath} from "./getFilePath";
import {validateFileCanBeAccessed} from "./validators";

async function initDir(dir: string) {
  const dirPath = getFilePath("", dir);
  if (await validateFileCanBeAccessed(dirPath)) return;
  await mkdir(dirPath);
}

export function initDirs(): Promise<void[]> {
  return Promise.all([initDir(IMG_DIR), initDir(CACHE_DIR)]);
}

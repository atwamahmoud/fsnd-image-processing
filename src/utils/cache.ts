import {writeFile} from "fs/promises";
import {CACHE_DIR, CACHE_FILENAME_SLASH_ESCAPER} from "./constants";
import {getFilePath} from "./getFilePath";

export function getCacheFilename(width: number, height: number, filename: string): string {
  const newFilename = filename.replace(/\//g, CACHE_FILENAME_SLASH_ESCAPER);
  return `${newFilename}${width}x${height}`;
}

export async function saveToCache(filename: string, buffer: Buffer): Promise<void> {
  const filepath = getFilePath(filename, CACHE_DIR);
  return writeFile(filepath, buffer);
}

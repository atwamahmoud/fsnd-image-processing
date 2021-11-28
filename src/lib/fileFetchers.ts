import {readFile} from "fs/promises";
import fetch from "node-fetch";

export function fetchFileFromFS(path: string): Promise<Buffer> {
  return readFile(path);
}

export async function fetchFileFromHTTP(url: string): Promise<Buffer> {
  const response = await fetch(url);

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

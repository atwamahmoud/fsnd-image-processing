import {access} from "fs/promises";

export async function validateFileCanBeAccessed(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

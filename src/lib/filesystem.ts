import fs from 'fs';

export function getSubdirs(path: string): Array<string> {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);
}

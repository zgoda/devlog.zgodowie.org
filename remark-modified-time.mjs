import { execSync } from 'child_process';

export function remarkModifiedTime() {
  return function (tree, file) {
    const filePath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filePath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}

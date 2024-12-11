import { execSync } from 'child_process';
import type { VFile } from 'vfile';
import type { RemarkPlugin } from '@astrojs/markdown-remark';

export function remarkModifiedTime(): ReturnType<RemarkPlugin> {
  return function (_tree: any, file: VFile) {
    const filePath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filePath}"`);
    file.data.astro!.frontmatter!.lastModified = result.toString();
  };
}

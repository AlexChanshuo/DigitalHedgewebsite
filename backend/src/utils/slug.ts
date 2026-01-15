// src/utils/slug.ts

/**
 * 生成 URL-friendly slug
 * 支援中文轉拼音或保留英文
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // 移除特殊字元，保留中文、英文、數字、空格、連字號
    .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
    // 空格轉連字號
    .replace(/\s+/g, '-')
    // 移除連續連字號
    .replace(/-+/g, '-')
    // 移除首尾連字號
    .replace(/^-|-$/g, '');
}

/**
 * 確保 slug 唯一性
 */
export async function ensureUniqueSlug(
  baseSlug: string,
  checkExists: (slug: string) => Promise<boolean>
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (await checkExists(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

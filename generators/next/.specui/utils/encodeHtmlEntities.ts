export function encodeHtmlEntities(str: string) {
  return str.replace(/[\u00A0-\u9999<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

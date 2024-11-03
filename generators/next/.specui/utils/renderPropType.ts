export function renderPropType(type?: string) {
  if (!type) {
    return 'unknown';
  }

  if (type === 'function') {
    return '() => {}';
  }

  return type;
}

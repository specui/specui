export function renderPropValue(value?: string) {
  if (!value) {
    return '';
  }
  return value.startsWith('$') ? value.slice(1) : `"${value}"`;
}

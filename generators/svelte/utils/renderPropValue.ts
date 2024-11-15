export function renderPropValue(value?: any) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.startsWith('$') ? value.slice(1) : `"${value}"`;
}

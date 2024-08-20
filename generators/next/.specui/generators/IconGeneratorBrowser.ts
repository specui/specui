interface Spec {
  icon: string;
  size: number;
}

export const IconGeneratorBrowser = async (spec: Spec) => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(spec.icon, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;

  svgElement.setAttribute('width', spec.size.toString());
  svgElement.setAttribute('height', spec.size.toString());

  const serializer = new XMLSerializer();
  const resizedSvgString = serializer.serializeToString(svgElement);

  return resizedSvgString;
};

import sharp from 'sharp';

interface Spec {
  icon: string;
  size: number;
}

export const IconGenerator = async (spec: Spec) => {
  return await sharp(Buffer.from(spec.icon)).resize(spec.size, spec.size).png().toBuffer();
};

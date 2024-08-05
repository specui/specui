import sharp from 'sharp';

interface Spec {
  icon: Buffer;
  size: number;
}

export const IconGenerator = async (spec: Spec) => {
  return await sharp(spec.icon).resize(spec.size, spec.size).png().toBuffer();
};

import { PrettierRustProcessor } from '../processors/PrettierRustProcessor';

describe('PrettierRustProcessor', () => {
  it('should make rust prettier', async () => {
    const processor = PrettierRustProcessor();

    const result = await processor(` fn main() {tauri_build::build()}`);

    expect(result).toStrictEqual('fn main() {\n  tauri_build::build()\n}\n');
  });
});

import { TomlEngine } from '../engines';

describe('pathListToNodeList', () => {
  it('should stringify to toml', async () => {
    const result = await TomlEngine({
      test: {
        name: 'test',
      },
    });

    expect(result).toStrictEqual('[test]\nname = "test"\n')
  });
});

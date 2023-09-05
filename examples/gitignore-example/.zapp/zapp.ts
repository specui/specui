import { GitignoreGenerator } from '@zappjs/git';

export default {
  '.gitignore': GitignoreGenerator(['node_modules/', '.DS_Store']),
};

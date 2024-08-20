export function getEditorLanguage(file: string) {
  return file.endsWith('.css')
    ? 'css'
    : file.endsWith('.gitignore')
    ? 'shell'
    : file.endsWith('.html')
    ? 'html'
    : file.endsWith('.js')
    ? 'javascript'
    : file.endsWith('.json')
    ? 'json'
    : file.endsWith('.md')
    ? 'markdown'
    : file.endsWith('.rs')
    ? 'rust'
    : file.endsWith('.sass')
    ? 'sass'
    : file.endsWith('.scss')
    ? 'scss'
    : file.endsWith('.svg')
    ? 'xml'
    : file.endsWith('.ts') || file.endsWith('.tsx')
    ? 'typescript'
    : file.endsWith('.yaml') || file.endsWith('.yml')
    ? 'yaml'
    : 'text';
}

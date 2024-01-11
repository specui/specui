# Example: Tauri Menu Bar App

> Use [ZappJS](https://zappjs.com) to generate a [Tauri](https://tauri.app) desktop app that runs in your menu bar

## Quickstart

By default, this project is specced to generate an MBA for [Vercel](https://vercel.com/dashboard).

To run this project as-is:

```sh
npm install
npm run tauri dev
```

## Update Spec

If you want to generate an MBA for another web app, edit the spec in `.zapp/spec.yml`.

Here is an example for ChatGPT:

```yaml
name: chatgpt-mba
title: ChatGPT
domain: dev.ctate
version: 0.1.0
license: MIT
url: https://chat.openai.com
window:
  width: 600
  height: 800
```

Then run:

```
npm run generate
npm run tauri dev
```

## Change Icon

To change the icon, swap out `.zapp/icon.svg` for another SVG icon.

## License

ZappJS is released under the [MIT License](https://github.com/zappjs/zappjs/blob/main/LICENSE).

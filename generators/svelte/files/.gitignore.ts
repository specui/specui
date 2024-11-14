import { generate } from "@specui/core";

export default async function GitignoreFile() {
  return await generate({
    template: [
      "node_modules",

      // Output
      ".output",
      ".vercel",
      "/.svelte-kit",
      "/build",

      // OS
      ".DS_Store",
      "Thumbs.db",

      // Env
      ".env",
      ".env.*",
      "!.env.example",
      "!.env.test",

      // Vite
      "vite.config.js.timestamp-*",
      "vite.config.ts.timestamp-*",
    ].join("\n"),
  });
}

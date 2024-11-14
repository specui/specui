import { generate } from "@specui/core";

export default async function PrettierIgnoreFile() {
  return await generate({
    template: [
      // Package Managers
      "package-lock.json",
      "pnpm-lock.yaml",
      "yarn.lock",
    ].join("\n"),
  });
}

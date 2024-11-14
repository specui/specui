import { generate } from "@specui/core";

export default async function NpmConfigFile() {
  return await generate({
    template: `engine-strict=true`
  });
}

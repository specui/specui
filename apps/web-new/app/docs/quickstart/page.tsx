export default function DocsQuickstartPage() {
  return (
    <>
      <div>
        ## Quickstart ### VS Code / Cursor Extension Install SpecUI extension:
        [https://marketplace.visualstudio.com/items?itemName=specui.specui](https://marketplace.visualstudio.com/items?itemName=specui.specui)
        ### CLI #### New Project Start a new project: ``` npx @specui/cli new ``` This creates a
        folder for your project and installs dependencies. For example, choosing the `next` SpecUI
        sets up a Next.js code generator. #### Try It Out Navigate to the new folder and run: ```
        npx @specui/cli generate ```
      </div>
    </>
  );
}

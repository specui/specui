## Install Zapp CLI

### Install Globally

To make Zapp available across all your projects, perform a global installation:

```sh
npm install @zappjs/cli --global
```

With Zapp globally installed, you can run it directly within any workspace directory:

```sh
cd $PROJECT_DIR
zapp generate
```

### Install Per Repository

For more control over the Zapp version used in a specific repository—particularly useful when collaborating with a team—you can install Zapp as a development dependency at the repository root:

```sh
npm install @zappjs/cli --save-dev
```

Even with a global installation, Zapp will prioritize the local, repository-specific version if one is present. This approach offers a balanced solution: project-level version pinning without sacrificing the convenience of global accessibility.

#!/bin/bash

DIR="./examples"

for folder in "$DIR"/*; do
  if [ -d "$folder" ]; then
    echo "Running command in $folder"
    (cd "$folder" && ~/Developer/specui/packages/specui-cli/bin/specui generate -f -d && pnpm install)
  fi
done
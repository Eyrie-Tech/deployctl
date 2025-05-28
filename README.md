# deployctl

This repository contains the `eyrie/deployctl` GitHub Action.

## Action Example

```yml
name: Deploy

on: push

jobs:
   deploy:
      runs-on: ubuntu-latest

      permissions:
         id-token: write # Needed for auth with Eyrie
         contents: read # Needed to clone the repository

      steps:
         - name: Clone repo
           uses: actions/checkout@v3

         - name: Deploy eyrie app
           uses: ./.github/actions/deploy
           with:
              artifactId: "123456"
              tag: my-lovely/app:654321
              fileName: my-lovely-app-654321
```

To learn more about the action, checkout [action readme](./action/README.md).

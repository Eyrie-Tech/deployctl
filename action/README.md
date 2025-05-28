# eyrie-tech/deployctl

GitHub Actions for deploying to Eyrie.

- [Usage](#usage)
  - [Permissions](#permissions)
  - [Inputs](#inputs)
- [Examples](#examples)
  - [Deploy an OCI image](#deploy-an-oci-image)

## Usage

To deploy you just need to include the Eyrie GitHub Action as a step in your
workflow.

You do **not** need to set up any secrets for this to work.

You **do** need to link your GitHub repository to your Eyrie project.

**COMING SOON**

### Permissions

You have to set `id-token: write` permission to authenticate with Eyrie.

```yaml
jobs:
  deploy:
    permissions:
      id-token: write # required
      contents: read
    steps:
# your steps here...
```

### Inputs

```yaml
- name: Deploy to Eyrie
  uses: eyrie-tech/deployctl@main
  with:
    # The GitHub artifact ID containing a pre-built OCI image tarball, created using
    # `docker save ...`.
    # Required.
    artifactId:

    # The filename of the OCI image tarball contained within the artifact.
    # Required.
    fileName:

    # The tag of the OCI image artifact.
    # Required.
    tag:

    # Entrypoint location executed by the OCI container running in Eyrie.
    # Optional.
    entrypoint:
```

## Examples

### Deploy an OCI image

All files and subdirectories in the **working directory** will be deployed.

```yaml
- name: Deploy to Eyrie
  uses: eyrie-tech/deployctl@main
  with:
    artifactId: "123456"
    tag: my-lovely/app:654321
    fileName: my-lovely-app-654321
```

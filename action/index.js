import core from "@actions/core";

try {
  // Fetch the value of the input specified in action.yml
  const entrypoint = core.getInput("entrypoint");
  const artifactId = core.getInput("artifactId");
  const tag = core.getInput("tag");
  const fileName = core.getInput("fileName");

  // Deploy
  const origin = "http://139.59.198.139";
  const aud = new URL("/v1/deployments", origin);
  let token;
  try {
    token = await core.getIDToken(aud);
  } catch (error) {
    const message =
      "Failed to get the GitHub OIDC token. Make sure that this job has the required permissions for getting GitHub OIDC tokens (see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#adding-permissions-settings ).";
    throw new Error(message);
  }
  const response = await fetch(
    aud,
    {
      method: "POST",
      body: JSON.stringify({
        artifactId: Number(artifactId),
        fileName: String(fileName),
        tag: String(tag),
        entrypoint,
      }),
      headers: new Headers({
        "content-type": "application/json",
        authorization: `GitHubOIDC ${token}`,
      }),
    },
  );
  const status = response.status;
  if (status !== 200) {
    throw new Error("Not OK");
  }
} catch (error) {
  // Handle errors and indicate failure
  core.setFailed(error.message);
}

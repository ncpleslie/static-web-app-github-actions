# Static Web Apps GitHub Actions

This is an example repo for how to deploy an [Azure Static Web App](https://azure.microsoft.com/en-us/products/app-service/static) to Azure using GitHub Actions.
This repo will show you how to create the resources in Azure and automate the deployment process.

## Features

- Quickly create new Azure resources using ARM templates
- PR feature testing environments with active URLs automatically added to the PR
- Automated Chrome Lighthouse testing
- Standard lint and testing
- Deploy same codebase to multiple instances of Static Web Apps (See FAQ for more)

## Getting started

### Connect to Azure

Ensure you have an [Azure](https://azure.microsoft.com/) account and the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) installed.

Log into the Azure CLI using `az login`

Run the following and add the complete output to your repo's "Actions secrets and variables" under the name `AZURE_CREDENTIALS`.
Replace `<my-app-name-here>` with the name of you application and `<subscription-id>` with the ID of your subscription in Azure.

```bash
az ad sp create-for-rbac --name "<my-app-name-here>" --role contributor --scopes /subscriptions/<subscription-id> --sdk-auth
```

The output should look something like the following and should be added to your repo's secrets as `AZURE_CREDENTIALS`:

```JSON
 {
   "clientId": "<GUID>",
   "clientSecret": "<STRING>",
   "subscriptionId": "<GUID>",
   "tenantId": "<GUID>",
   "resourceManagerEndpointUrl": "<URL>"
   (...)
 }
```

### Obtain GitHub Secrets

Create a "fine-grained" GitHub secret. More on this can be found [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

Ensure it is specific to the repo you are working on and short-lived (7 days is minimum), unless you plan on create new Static Web App instances regularly.
This token requires only "Read access to metadata" and "Read and Write access to secrets".

Add this token to your repo's secrets under the name `REPO_ACCESS_TOKEN`.

### Create Azure Resources

- Navigate to the "Actions" tab on your repo's GitHub page.
- From here, click "Manual: Create Azure Resources".
- Click "Run workflow" and enter the relevant data.

The Static Web App should be created successfully and the deployment secrets will be added to your repo.

## Pipeline

This pipeline is pretty "fast-and-loose" with the standards of "git-flow".
Some assumptions are made around your git process. This repo uses a simplified version of git-flow with three main branches.

- feature/\*\*
  - for all feature work
- main
  - for main
- release
  - for production releases

Assumptions are made that there will be one Static Web App environment (`dev`) made for internal testing and another (`prd`) for client use.
The `dev` Static Web App environment with have environments under it.

- "fte" for feature testing (can be manually run for "feature/\*\*" branches)
- "Production" (Azure's main environment for Static web apps)

The `prd` environment will have two environment under it.

- "uat" for user acceptance testing by the client
- "Production" (Azure's main environment for Static web apps)

Pushes to "main" will deploy to your `dev` environments "Production" environment AND the clients (`prd`) "uat" environment.
Pushes to "release" will deploy JUST to the clients (`prd`) "Production" environment.

Manual deployments can be deployed to your (`dev`) "fte" environment. If a PR is open for that feature, a comment with the URL will be added to the PR.

## FAQ

### Why have two separate Static Web Apps? Why not just use the environments provided by default from SWA?

Mostly to keep the two environments as separate as possible. For reasons such as: billing, downtime, ability to destroy develop without touching prod, and client's unwillingness to have merged resources.
Also, just so you can see that you can deploy one codebase into two, separate Static Web Apps.
Feel free to change the [push-deploy.yml](.github/workflows/push-deploy.yml) workflow if you would like to change this.

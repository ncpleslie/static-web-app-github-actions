# API

This API is similar to an Azure Function App

## Local settings

Add a `local.settings.json` file to the root of the `api` directory.
This shouldn't be checked it.

An example is:

```JSON
{
  "IsEncrypted": false,
  "Values": {},
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
}

```

import { AzureFunction, Context, HttpRequest } from "@azure/functions";

/**
 * Provides a configuration file for the frontend.
 */
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.res = {
    body: "Hello, world",
  };
};

export default httpTrigger;

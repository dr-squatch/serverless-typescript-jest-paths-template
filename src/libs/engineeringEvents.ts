import { EngineeringEvents } from '@dr-squatch/lib';

const {
  STORE_HANDLE,
} = process.env;

export const engineeringEvents = new EngineeringEvents('serverless-typescript-webpack-template', (props) => {
  throw new Error(`Please rename the serviceName passed in from serverless-typescript-webpack-template to a meaningful name for this service, then remove this error.
  
  Also, please update the package.json accordingly, if not yet udpated.

  And verify any potential env var updates, etc, in serverless.ts`);
  return ({
    ...props,
    store: STORE_HANDLE,
  });
});
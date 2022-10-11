import { handlerPath } from '@libs/handler-resolver';

export default {
  type: 'queue',
  worker: {
    handler: `${handlerPath(__dirname)}/handler.main`,
    timeout: 30,
  },
};
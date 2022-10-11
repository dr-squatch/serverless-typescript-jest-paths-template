/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

// functions
// @ts-ignore
import shopifyOrderCreateWebhook from '@functions/useCases/shopifyOrderCreateWebhook';

// consumers
// @ts-ignore
import shopifyOrderCreateConsumer from '@consumers/shopifyOrderCreate';

const serverlessConfiguration: AWS = {
  service: 'engineering-events',
  frameworkVersion: '3',
  plugins: [
    'serverless-webpack',
    'serverless-lift',
  ],
  provider: {
    stage: 'fallback',
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    region: 'us-east-1',
    /**
     * @note if using dr-squatch/lib, ensure that you have the correct env vars
     * set here, per function you import from, so that those would operate
     * as expected (pretty much, whenever it's obvious that a specific API
     * key/etc would be needed to make a request, check what that would be /
     * what env var dr-squatch/lib is looking for, for that function).
     *
     * For a pretty exhaustive example consumer of dr-squatch/lib, see
     * remorse-period-processing.
     */
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',

      // eslint-disable-next-line no-template-curly-in-string
      SHOPIFY_ORDER_CREATE_QUEUE_URL: '${construct:shopifyOrderCreateConsumer.queueUrl}',

      // === begin squatch-lib env vars ===
      SHOPIFY_GRAPHQL_URL: 'https://companyStoreName.myshopify.com/admin/api/2023-01/graphql.json',
      SHOPIFY_API_KEY: '', // prod store API key (create your own in Shopify apps/developer to maintain this services' rate limits independently of other services)
      SHOPIFY_DOMAIN: 'companyStoreName.myshopify.com',
      // === end squatch-lib env vars ===

      // update these as desired per use-case (default is us-east-1)
      DYNAMODB_REGION: 'us-east-1',
      S3_REGION: 'us-east-1',
    },
  },
  // import the function via paths
  functions: {
    shopifyOrderCreateWebhook,
  }, // Lambda Functions
  // @ts-ignore
  constructs: {
    shopifyOrderCreateConsumer,
  }, // SQS consumers
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      // keepOutputDirectory: true,
    },
  },
};

module.exports = serverlessConfiguration;

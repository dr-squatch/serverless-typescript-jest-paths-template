import { ShopifyOrderCreateAPIGatewayProxyEvent, formatErrorResponse, formatJSONResponse } from '@libs/api-gateway';
import { sqs } from '@libs/aws';
import { engineeringEvents } from '@libs/engineeringEvents';
import { middyfy } from '@libs/lambda';

const {
  SHOPIFY_ORDER_CREATE_QUEUE_URL,
} = process.env;

const shopifyOrderCreateWebhook = async (event: ShopifyOrderCreateAPIGatewayProxyEvent) => {
  const shopifyOrder = event.body;
  try {
    await engineeringEvents.sendProcessingBeginEvent(shopifyOrder);
    await sqs.sendMessage({
      QueueUrl: SHOPIFY_ORDER_CREATE_QUEUE_URL,
      MessageBody: JSON.stringify(shopifyOrder),
    }).promise();
    await engineeringEvents.sendProcessingCompleteEvent(shopifyOrder);
    return formatJSONResponse({
      message: `SQS message for uid of ${shopifyOrder.id} sent!`,
      event,
    });
  } catch (err) {
    try {
      await engineeringEvents.sendCriticalErrorEvent(shopifyOrder);
      // eslint-disable-next-line no-empty
    } catch { }
    console.debug('err:', err.stack || err);
  }
  return formatErrorResponse({
    message: `SQS message for uid of ${shopifyOrder.id} errored while sending!`,
    event,
  });
};

export const main = middyfy(shopifyOrderCreateWebhook);

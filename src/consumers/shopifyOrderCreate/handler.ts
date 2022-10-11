import { formatJSONResponse } from '@libs/api-gateway';
import { ShopifyOrderObject } from '@dr-squatch/lib';
import { engineeringEvents } from '@libs/engineeringEvents';
import { doSomethingUsefulWithAnOrder } from './useCases/doSomethingUsefulWithAnOrder/doSomethingUsefulWithAnOrder';

export const main = async event => {
  const promises: Promise<any>[] = [];
  try {
    for (const record of event.Records) {
      const { body } = record;
      const shopifyOrder: ShopifyOrderObject = JSON.parse(body);

      console.debug({
        id: shopifyOrder.id,
        orderNumber: shopifyOrder.order_number,
      });

      // eslint-disable-next-line no-await-in-loop
      await engineeringEvents.sendProcessingBeginEvent(shopifyOrder);

      promises.push(
        doSomethingUsefulWithAnOrder(shopifyOrder),
      );

      // eslint-disable-next-line no-await-in-loop
      await Promise.all(promises);

      // eslint-disable-next-line no-await-in-loop
      await engineeringEvents.sendProcessingCompleteEvent(shopifyOrder);
    }
  } catch (err) {
    console.error('shopifyOrderCreateConsumer, queue worker:', (err || {}).stack);
    console.debug('shopifyOrderCreateConsumer, queue worker, event.body:', JSON.stringify(event.body));

    try {
      await engineeringEvents.sendCriticalErrorEvent(event.body);
      // eslint-disable-next-line no-empty
    } catch { }

    try {
      const allSettledResult = await Promise.allSettled(promises);
      console.debug('shopifyOrderCreateConsumer, queue worker, retried allSettledResults:', JSON.stringify(allSettledResult));
    } catch (err2) {
      console.debug('shopifyOrderCreateConsumer, queue worker, retry error:', err2.stack || err2);
    }

    throw err;
  }
  return formatJSONResponse({
    message: 'success',
    event,
  });
};
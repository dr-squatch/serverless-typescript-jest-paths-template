import { ShopifyOrderObject } from '@dr-squatch/lib';
import { engineeringEvents } from '@libs/engineeringEvents';

export const doSomethingUsefulWithAnOrder = async (shopifyOrder: ShopifyOrderObject) => {
  try {
    await engineeringEvents.sendProcessingBeginEvent(shopifyOrder);

    // do some useful processing/etc here...
    console.debug('doSomethingUsefulWithAnOrder, shopifyOrder:', shopifyOrder);

    await engineeringEvents.sendProcessingCompleteEvent(shopifyOrder);
  } catch (err) {
    try {
      await engineeringEvents.sendCriticalErrorEvent(shopifyOrder);
      // eslint-disable-next-line no-empty
    } catch { }
    console.debug('doSomethingUsefulWithAnOrder, err:', err.stack || err);
  }
};
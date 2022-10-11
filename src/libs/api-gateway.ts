import type { APIGatewayEvent } from 'aws-lambda';
import { ShopifyOrderObject } from '@dr-squatch/lib';

// @ts-ignore
export interface ShopifyOrderCreateAPIGatewayProxyEvent extends APIGatewayEvent {
  body: ShopifyOrderObject
}

export const formatJSONResponse = (response: Record<string, unknown>) => ({
  statusCode: 200,
  body: JSON.stringify(response),
});

export const formatErrorResponse = (response: Record<string, unknown>, statusCode?: number) => ({
  statusCode: statusCode || 400,
  body: JSON.stringify(response),
});

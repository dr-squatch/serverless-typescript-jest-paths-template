import {
  DynamoDBClient, DeleteItemCommand, GetItemCommand, PutItemCommand, ScanCommand, QueryCommand,
} from '@aws-sdk/client-dynamodb';

export const dynamodb = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION || '',
});

export {
  DeleteItemCommand, GetItemCommand, PutItemCommand, ScanCommand, QueryCommand,
};
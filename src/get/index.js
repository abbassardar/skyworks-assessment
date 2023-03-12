import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "skyworkz-news";

module.exports.get = async (event, context) => {  
  let body = await dynamo.send(
    new ScanCommand({ TableName: tableName })
  );
  body = body.Items;

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
};

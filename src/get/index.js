import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "skyworkz-news";



module.exports.post = async (event, context) => {  
  generatedId = uuidv4;
  body = await dynamo.send(
    new ScanCommand({ TableName: tableName })
  );
  body = body.Items;

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
};

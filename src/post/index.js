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
  let generatedId = uuidv4;
  let requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              id: generatedId,
              title: requestJSON.title,
              date: requestJSON.date,
              description: requestJSON.description,
            },
          })
        );
        body = `Put item ${generatedId}`;
  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: "Item created with id: ", generatedId,
      },
      null,
      2
    ),
  };
};

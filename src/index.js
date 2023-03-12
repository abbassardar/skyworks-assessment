var AWS = require('aws-sdk');

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "skyworkz-news";

module.exports.post = async (event, context) => {  
  generatedId = uuid.v4;
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

  event.body
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

var AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-1'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'skyworkz-news';

module.exports.handler = async (event) => {
  let response;
  console.log("test get");
  response = await getItems();
  console.log("test after get");
  return response;
};


async function getItems() {
  const params = {
    TableName: tableName
  }
  console.log("test before scan");

  const allItems = await scanDynamoRecords(params, []);
  const body = {
    items: allItems
  }
  console.log("test after scan");
  console.log("testitems ", allItems);

  return buildResponse(200, body)
}

async function scanDynamoRecords(scanParams, itemsArray) {
  try {
    const dynamoData = await dynamoDB.scan(scanParams).promise();
    itemsArray = itemsArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey
      return await scanDynamoRecords(scanParams, itemsArray)
    }
    return itemsArray
  } catch (error) {
    console.error("problem scanning items", error);
  }
}

function buildResponse(statusCode, body) {
  return {
    StatusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}
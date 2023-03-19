var AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-1'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'skyworkz-news';

module.exports.handler = async (event) => {
  let response;
  console.log("test post  event  ", event);
  response = await saveItem(JSON.parse(event.body));
  console.log("testafter post");
  return response;
};

async function saveItem(requestBody) {
  const params = {
    TableName: tableName,
    Item: requestBody
  }
  return await dynamoDB.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error("problem saving item", error);
  })
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
var AWS = require('aws-sdk');
AWS.config.update({
  region:'eu-west-1'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'skyworkz-news';

module.exports.handler = async (event) => {  
 let response;
 switch(true){
  case event.httpMethod === 'GET' :
    response =  await getItems();
    break;
  case event.httpMethod === 'POST' :
    response = await saveItem(JSON.parse(event.body));
    break;
 }
 return response;
};


async function getItems(){
  const params ={
    TableName: tableName
  }
  const allItems = await scanDynamoRecords(params, []);
  const body = {
    items: allItems
  }
  return buildResponse(200, body)
}

async function scanDynamoRecords(scanParams, itemsArray){
  try{
  const dynamoData = await dynamoDB.scan(scanParams).promise();
  itemsArray = itemsArray.concat(dynamoData.Items);
    if(dynamoData.LastEvaluatedKey){
      scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey
      return await scanDynamoRecords(scanParams, itemsArray)
    }
  return itemsArray
}catch(error){
  console.error("problem scanning items", error);
}
}

async function saveItem(requestBody){
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


function buildResponse(statusCode, body){
return {
  StatusCode: statusCode,
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
  }
}
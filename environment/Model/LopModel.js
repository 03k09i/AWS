// Configure the region
const AWS = require('aws-sdk');

// Configure the region
AWS.config.update({
  region: 'us-east-1'
});

//
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var docClient = new AWS.DynamoDB.DocumentClient();
async function Get()
{
    const params = {
    TableName : 'Lops'
  }
  try{
    let Records=await docClient.scan(params).promise()
    return Records;
  }
  catch(error){
    console.log(error);
  }
}
async function Create(Data)
{
    let LopData = {
        'MaLop': Data.MaLop,
        'TenLop': Data.TenLop,
        'MaLop':Data.MaLop
    }
    let sqsLopData = {
        MessageAttributes: {
          "MaLop": {
            DataType: "String",
            StringValue: LopData.MaLop
          },
          "TenLop": {
            DataType: "String",
            StringValue: LopData.TenLop
          },
          "MaLop": {
            DataType: "String",
            StringValue: LopData.MaLop
          }
        },
        MessageBody: JSON.stringify(LopData),
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588509624082/InsertLop'
    };
    let sendSqsMessage = sqs.sendMessage(sqsLopData).promise();
    sendSqsMessage.then((data) => {
        console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
        return
    }).catch((err) => {
        console.log(`OrdersSvc | ERROR: ${err}`);
    });
}
async function GetById(ID)
{
  var params = {
  TableName: 'Lops',
  FilterExpression: '#name = :value',
  ExpressionAttributeValues: { ':value': ID },
  ExpressionAttributeNames: { '#name': 'MaLop' }
}
try {
    const data = await docClient.scan(params).promise()
    return data
  } catch(error){
    console.log(error);
  }
}
async function Update(ID,TenLop,MaLop){
    let LopData = {
        'MaLop': ID,
        'TenLop': TenLop,
        'MaLop':MaLop
    }
    let sqsLopData = {
        MessageAttributes: {
          "MaLop": {
            DataType: "String",
            StringValue: LopData.MaLop
          },
          "TenLop": {
            DataType: "String",
            StringValue: LopData.TenLop
          },
          "MaLop": {
            DataType: "String",
            StringValue: LopData.MaLop
          }
        },
        MessageBody: JSON.stringify(LopData),
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588509624082/UpdateLop'
    };
    let sendSqsMessage = sqs.sendMessage(sqsLopData).promise();
    sendSqsMessage.then((data) => {
        console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
        return
    }).catch((err) => {
        console.log(`OrdersSvc | ERROR: ${err}`);
    });
}
async function Delete(ID){
    let LopData = {
        'MaLop': ID
    }
    let sqsLopData = {
        MessageAttributes: {
          "MaLop": {
            DataType: "String",
            StringValue: LopData.MaLop
          }
        },
        MessageBody: JSON.stringify(LopData),
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588509624082/DeleteLop'
    };
    let sendSqsMessage = sqs.sendMessage(sqsLopData).promise();
    sendSqsMessage.then((data) => {
        console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
        return
    }).catch((err) => {
        console.log(`OrdersSvc | ERROR: ${err}`);
    });
}
module.exports={
    Get:Get,
    Create:Create,
    GetById:GetById,
    Update:Update,
    Delete:Delete
}

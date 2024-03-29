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
    TableName : 'Diems'
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
    let DiemData = {
        DiemChuyenCan:Data.DiemChuyenCan,
       DiemGiuaKi:Data.DiemGiuaKi,
       DiemCuoiKi:Data.DiemCuoiKi,
       MaMon:Data.MaMon,
       MaSV:Data.MaSV
    }
    let sqsDiemData = {
        MessageAttributes: {
          "DiemChuyenCan": {
            DataType: "String",
            StringValue: DiemData.DiemChuyenCan
          },
          "DiemGiuaKi": {
            DataType: "String",
            StringValue: DiemData.DiemGiuaKi
          },
          "DiemCuoiKi": {
            DataType: "String",
            StringValue: DiemData.DiemCuoiKi
          },
          "MaMon": {
            DataType: "String",
            StringValue: DiemData.MaMon
          },
          "MaSV": {
            DataType: "String",
            StringValue: DiemData.MaSV
          }
        },
        MessageBody: JSON.stringify(DiemData),
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588509624082/InsertDiem'
    };
    let sendSqsMessage = sqs.sendMessage(sqsDiemData).promise();
    sendSqsMessage.then((data) => {
        console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
        return
    }).catch((err) => {
        console.log(`OrdersSvc | ERROR: ${err}`);
    });
}
async function GetById(ID,ID1)
{
  var params = {
  TableName: 'Diems',
  FilterExpression: '#name = :value AND #malop = :valu',
  ExpressionAttributeValues: { ':value': ID,':valu':ID1 },
  ExpressionAttributeNames: { '#name': 'MaMon','#malop':"MaSV" }
}
  try {
    const data = await docClient.scan(params).promise()
    return data
  } catch (err) {
    return err
  }
}
async function Update(ID,ID1,Data){
    let DiemData = {
        DiemChuyenCan:Data.DiemChuyenCan,
       DiemGiuaKi:Data.DiemGiuaKi,
       DiemCuoiKi:Data.DiemCuoiKi,
       MaMon:ID,
       MaSV:ID1
    }
    let sqsDiemData = {
        MessageAttributes: {
          "DiemChuyenCan": {
            DataType: "String",
            StringValue: DiemData.DiemChuyenCan
          },
          "DiemGiuaKi": {
            DataType: "String",
            StringValue: DiemData.DiemGiuaKi
          },
          "DiemCuoiKi": {
            DataType: "String",
            StringValue: DiemData.DiemCuoiKi
          },
          "MaMon": {
            DataType: "String",
            StringValue: DiemData.MaMon
          },
          "MaSV": {
            DataType: "String",
            StringValue: DiemData.MaSV
          }
        },
        MessageBody: JSON.stringify(DiemData),
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588509624082/UpdateDiem'
    };
    let sendSqsMessage = sqs.sendMessage(sqsDiemData).promise();
    sendSqsMessage.then((data) => {
        console.log(`OrdersSvc | SUCCESS: ${data.MessageId}`);
        return
    }).catch((err) => {
        console.log(`OrdersSvc | ERROR: ${err}`);
    });
}
async function Delete(ID,ID1){
    let DiemData = {
        'MaMon': ID,
        'MaSV':ID1
    }
    let sqsDiemData = {
        MessageAttributes: {
          "MaMon": {
            DataType: "String",
            StringValue: DiemData.MaMon
          },
          "MaSV": {
            DataType: "String",
            StringValue: DiemData.MaSV
          }
        },
        MessageBody: JSON.stringify(DiemData),
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588509624082/DeleteDiem'
    };
    let sendSqsMessage = sqs.sendMessage(sqsDiemData).promise();
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

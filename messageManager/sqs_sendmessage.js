// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'REGION' });
// Set credentials
const credentials = new AWS.SharedIniFileCredentials({ profile: 'sqs-profile' });
AWS.config.credentials = credentials;

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const params = {
  DelaySeconds: 5,
  MessageAttributes: {
    "Title": {
      DataType: "String",
      StringValue: "The Whistler"
    },
    "Author": {
      DataType: "String",
      StringValue: "John Grisham"
    },
    "WeeksOn": {
      DataType: "Number",
      StringValue: "6"
    }
  },
  MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageId: "Group1",  // Required for FIFO queues
  QueueUrl: "https://sqs.us-east-2.amazonaws.com/817439561489/SQS_QUEUE_NODE"
};

sqs.sendMessage(params, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
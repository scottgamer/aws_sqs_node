// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east-2' });

// Create the SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueURL = "https://sqs.us-east-2.amazonaws.com/817439561489/SQS_QUEUE_NODE";

const params = {
  AttributeNames: [
    "SentTimestamp"
  ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
    "All"
  ],
  QueueUrl: queueURL
};

sqs.receiveMessage(params, (err, data) => {
  if (err) {
    console.log("Receive Error", err);
  } else {
    const visibilityParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle,
      VisibilityTimeout: 20 // 20 second timeout
    };
    sqs.changeMessageVisibility(visibilityParams, (err, data) => {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Timeout Changed", data);
      }
    });
  }
});
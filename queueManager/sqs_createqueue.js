// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east-2' });
// Set credentials
const credentials = new AWS.SharedIniFileCredentials({ profile: 'sqs-profile' });
AWS.config.credentials = credentials;

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const params = {
  QueueName: 'SQS_QUEUE_NODE',
  Attributes: {
    'DelaySeconds': '5',
    'MessageRetentionPeriod': '86400'
  }
};

sqs.createQueue(params, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});
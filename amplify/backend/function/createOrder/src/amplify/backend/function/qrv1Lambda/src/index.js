const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});


exports.handler = (event, context, callback) => {
    // TODO implement
    console.log(event)
    var params = {
        TableName: 'orders',
        Limit: 100
    };
    
    docClient.scan(params, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
        
        var response = {
        "statusCode": 200,
        "headers": {
           "Access-Control-Allow-Origin": "*"
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };
        
        
        
      callback(null, response)
        }
  });

};
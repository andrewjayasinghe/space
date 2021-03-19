/* Amplify Params - DO NOT EDIT
	API_QRV1API_APIID
	API_QRV1API_APINAME
	ENV
	FUNCTION_CREATECUSTOMER_NAME
	FUNCTION_CREATEORDER_NAME
	FUNCTION_QRV1LAMBDA_NAME
	REGION
	STORAGE_CUSTOMERS_ARN
	STORAGE_CUSTOMERS_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});


exports.handler = (event, context, callback) => {
    // TODO implement
    console.log(event)
    var params = {
        TableName: 'customers-deploy',
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
/* Amplify Params - DO NOT EDIT
	API_QRV1API_APIID
	API_QRV1API_APINAME
	ENV
	FUNCTION_CREATECUSTOMER_NAME
	FUNCTION_CREATEORDER_NAME
	FUNCTION_DELETECUSTOMER_NAME
	FUNCTION_GETCUSTOMERS_NAME
	FUNCTION_GETORDERS_NAME
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
	// const body = JSON.parse(event.body)
    var params = {
		TableName: 'customers-dev',
		Key: {
			"customer_id": event.pathParameters.customer_id
		}
    };
    
    docClient.get(params, (err, data) => {
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
/* Amplify Params - DO NOT EDIT
	API_QRV1API_APIID
	API_QRV1API_APINAME
	ENV
	FUNCTION_CREATECUSTOMER_NAME
	FUNCTION_CREATEORDER_NAME
	FUNCTION_GETCUSTOMERS_NAME
	FUNCTION_QRV1LAMBDA_NAME
	REGION
	STORAGE_CUSTOMERS_ARN
	STORAGE_CUSTOMERS_NAME
Amplify Params - DO NOT EDIT */

"use strict";

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});


exports.handler = (event, context, callback) => {
    // TODO implement
    const body = JSON.parse(event.body)
    console.log("This is the EVENT", event);
    console.log("This is the CONTEXT", context);

    var params = {
        Key: {
         "customer_id": parseInt(event.queryStringParameters.customer_id),
        },
        TableName: "customers-dev"
        
    };

 
    docClient.delete(params, function(err, data) {
        if (err) {
            console.log("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err, null);
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            var response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(data),
                "isBase64Encoded": false
                };
            callback(null, response);
        }
    });
};

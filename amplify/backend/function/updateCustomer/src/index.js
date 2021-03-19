/* Amplify Params - DO NOT EDIT
	API_QRV1API_APIID
	API_QRV1API_APINAME
	ENV
	FUNCTION_CREATECUSTOMER_NAME
	FUNCTION_CREATEORDER_NAME
	FUNCTION_DELETECUSTOMER_NAME
	FUNCTION_GETCUSTOMERS_NAME
	FUNCTION_GETCUSTOMER_NAME
	FUNCTION_GETORDERS_NAME
	FUNCTION_QRV1LAMBDA_NAME
	REGION
	STORAGE_CUSTOMERS_ARN
	STORAGE_CUSTOMERS_NAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});

// response heler
const response = (statusCode, body, additionalHeaders) => ({
  statusCode,
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...additionalHeaders },
})

function updateRecord(username, customer_id, eventBody) {
    let d = new Date()
    const params = {
        TableName: 'customers-deploy',
        Key: {
            "customer_id": customer_id
        },
        UpdateExpression: "set lastupdate_date = :lud, #i = :i",
        ExpressionAttributeNames: {
            // using ExpressionAttributeNames to show how to
            // overcome reserved names, in this case <item>
            '#i': 'item'
        },
        ExpressionAttributeValues: {
            ':lud': d.toISOString(),
            ':i': eventBody.item
        },
        ReturnValues: "ALL_NEW"
    }

    return docClient.update(params)
}


exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

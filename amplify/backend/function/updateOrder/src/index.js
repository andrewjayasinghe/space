const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});

// response heler
const response = (statusCode, body, additionalHeaders) => ({
  statusCode,
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...additionalHeaders },
})

function updateRecord(order_id, event) {
    let d = new Date()
    let dISO = d.toISOString()
    let auto_fields = {
        "order_id": parseInt(order_id),
        "lastupdate_date": dISO
    }

  //merge the json objects
  let item_body = {...auto_fields, ...event.body }

  
  //final params to DynamoDB
  const params = {
      TableName: "orders",
      Item: item_body,
      ReturnValues: "ALL_OLD"
  }

  return docClient.put(params)
}

exports.handler = async (event) => {
     try {
        let data = await updateRecord(event.pathParameters.order_id, event).promise()
        return response(200, data)
    } catch (err) {
        return response(400, { message: err.message })
    }
};

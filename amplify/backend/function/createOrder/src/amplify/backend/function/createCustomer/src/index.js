'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});
const { v1: uuidv1 } = require('uuid');

const response = (statusCode, body, additionalHeaders) => ({
  statusCode,
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...additionalHeaders },
})

function isValidRequest(context, event) {
  return (event.body !== null)
}

function getId(){
  const cust_params = {
		TableName: 'sysVars-dev',
		Key: {
			"tableVars": "custVars"
		}
    };
    
    return docClient.get(cust_params);
}

function updateId(id){
  const cust_params = {
		TableName: 'sysVars-dev',
		Item: {
			"tableVars": "custVars",
		  "next_id": id + 1
		},
    };
    
    return docClient.put(cust_params);
}

function addRecord(event, id) {
  
  let d = new Date()
  let dISO = d.toISOString()
  let auto_fields = {
      "customer_id": id,
      "creation_date": dISO,
      "lastupdate_date": dISO
  }

  //merge the json objects
  let item_body = {...auto_fields, ...JSON.parse(event.body) }

  
  //final params to DynamoDB
  const params = {
      TableName: "customers-dev",
      Item: item_body,
      ReturnValues: "ALL_OLD"
  }

  return docClient.put(params)
}

exports.handler = async (event, context, callback) => {
 
    //get the next id
    let id = await getId().promise();
    const next_id = id.Item.next_id
    try {
      let data = await addRecord(event, next_id).promise();
      //update the next id
      let update_id = await updateId(next_id).promise();
      return response(200, data)
  } catch (err) {
      return response(400, { message: err.message })
  }
 
   
 };
  

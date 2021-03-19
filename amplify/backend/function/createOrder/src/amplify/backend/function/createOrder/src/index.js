'use strict';
// import App from './app'
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ca-central-1'});
const { v1: uuidv1 } = require('uuid');



//response helper
const response = (statusCode, body, additionalHeaders) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...additionalHeaders },
})

function addRecord(event) {


    // auto generated date fields
    let d = new Date()
    let dISO = d.toISOString()
    let auto_fields = {
        "order_id": uuidv1(),
        "creation_date": dISO,
        "lastupdate_date": dISO,
        "status": "Incomplete"
    }

    //merge the json objects
    let item_body = {...auto_fields, ...JSON.parse(event.body) }

    console.log(item_body);
    
    //final params to DynamoDB
    const params = {
        TableName: 'orders',
        Item: item_body,
        ReturnConsumedCapacity: "TOTAL", 

    }
    

    return docClient.put(params)
}


exports.handler = async (event, context, callback) => {

    const body = JSON.parse(event.body);
    
    try{
        let data = await addRecord(event).promise();
        return response(200, data)
    }catch (err) {
        return response(400, {message: err.message})
    }
    
 
//   var id =  Math.floor(Math.random() * 1000);
//     const str_id = String(id)
//     var some_urls = []
//     console.log("NUMBER--------", body.num_urls);
//     var serial = Math.floor(Math.random() * 100000);
//     const order_id =  Math.floor(Math.random() * 11);
//     var m = new Date();
//     const num = body.num_urls;
//     var i;
//     console.log("num", num)
//     for (i = 0; i < num; i++) {
//         serial += 1;
//         const str_serial = String(serial);
//         const padded_serial = str_serial.padStart(6, '0');
//         console.log("In Loop--------", i);
//         var url = 'https://www.builtspace.com/i/' + padded_cust_id + padded_serial;
//         some_urls.push(url)
//     }
//     console.log(some_urls)
//         var url_params = {
//             TableName: "urls-dev",
//             Item: {
//                 "url": "fff",
//                 "cust_id": parseInt(cust_id),
//                 "order_id": str_id,
//                 "date_created": dateString,
//                 "serial": JSON.stringify(some_urls)
                
//             }
//         };
//         docClient.put(url_params, function(err, data) {
//             if (err) {
//                 console.log(err);
//                 callback(err, null);
//             }
//             else {
//                 console.log("Url Created");
//             }
//         });
    

//         var order_params = {
//             Item: {
//           "cust_idorder_id": str_id, 
//           "status": "Incomplete",
//           "date_created": m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds(),
//           "date_completed": '',
//           "customer_id": parseInt(body.customer_id),
//           "num_urls": parseInt(body.num_urls),
//             }, 
//             ReturnConsumedCapacity: "TOTAL", 
//             TableName: "spaceOrders-dev"
//  }; 
     
    
     
 
//     docClient.put(order_params, function(err, data) {
//         if (err) {
//             callback(err, null);
//         }
//         else {
//             var response = {
//                 "statusCode": 200,
//                 "headers": {
//                 "Access-Control-Allow-Origin": "*"
//             },
//             "body": JSON.stringify(data),
//             "isBase64Encoded": false
//             };
           
//         }
//     });
//   var response = {
//                 "statusCode": 200,
//                 "headers": {
//                 "Access-Control-Allow-Origin": "*"
//             },
//             "body": JSON.stringify(some_urls),
//             "isBase64Encoded": false
//             };
//  callback(null, response);
};

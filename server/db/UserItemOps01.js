const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: 'AWS_ACCESS_KEY_ID',
  secretAccessKey: 'AWS_SECRET_ACCESS_KEY'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Users";
const username = "Rupal0ps1";
const thought = "Sagittis orci a scelerisque purus semper eget duis at tellus.";



const params = {
    TableName:table,
    Item:{
        "username": username,
        "createdAt": email,
        "thought": thought
    }
};

console.log("Adding a new item...");
docClient.put(params, (err, data) => {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});

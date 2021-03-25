const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-1"

};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Thoughts";

// get all users' thoughts
router.get('/', (req, res) => {
  const params = {
    TableName: table
  };
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err); // an error occurred
    } else {
      res.json(data.Items)
    }
  });
})

// route to get thoughts from a single user
// matches with /api/users/:username GET
router.get("/:username", (req, res) => {
  console.log(`Querying for thought(s) from ${req.params.username}.`);
  const params = {
    TableName: table,
    KeyConditionExpression: "#un = :user",
    ExpressionAttributeNames: {
      "#un": "username",
      "#ca": "createdAt",
      "#th": "thought",
      "#img": "image",
    },
    ExpressionAttributeValues: {
      ":user": req.params.username,
    },
    // determine which attributes to return
    ProjectionExpression: "#img, #th, #ca, #un",
    ScanIndexForward: false, // default value is true, which sorts ascending. set to false for descending (most recent posts on top)
  };
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err); // an error occurred
    } else {
      console.log("Query succeeded.");
      res.json(data.Items);
    }
  });
});

// route to create a new user/thought
// matches with /api/users POST
router.post("/", (req, res) => {
  const params = {
    TableName: table,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      thought: req.body.thought,
      image: req.body.image,
    },
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.status(500).json(err); // an error occurred
    } else {
      console.log("Added item:", JSON.stringify(data));
      res.json({ Added: JSON.stringify(data, null, 2) });
    }
  });
});

// route to delete a user
// matches with /api/users/:time/:username DELETE
router.delete("/:time/:username", (req, res) => {
  const params = {
    TableName: table,
    Key: {
      username: req.params.username,
      createdAt: parseInt(req.params.time),
    },
  };
  dynamodb.delete(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to delete item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.status(500).json(err); // an error occurred
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data));
      res.json({ Deleted: JSON.stringify(data, null, 2) });
    }
  });
});

module.exports = router;

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    const bucket = 'amplifyjson';  // S3 bucket name
    const key = 'info.json';       // S3 JSON file

    try {
        // Fetch the JSON file from S3
        const data = await s3.getObject({ Bucket: bucket, Key: key }).promise();
        const items = JSON.parse(data.Body.toString('utf-8'));  // Parse the JSON data

        // If an ID is passed in the request, filter the items
        if (event.pathParameters && event.pathParameters.id) {
            const item = items.find(item => item.id === parseInt(event.pathParameters.id));
            if (item) {
                return { statusCode: 200, body: JSON.stringify(item) };
            } else {
                return { statusCode: 404, body: JSON.stringify({ message: "Item not found" }) };
            }
        }

        // Return all items if no ID is provided
        return { statusCode: 200, body: JSON.stringify(items) };

    } catch (error) {
        console.error("Error fetching or parsing data from S3:", error);
        return { statusCode: 500, body: JSON.stringify({ message: "Server Error", error: error.message }) };
    }
};

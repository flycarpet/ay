const axios = require('axios');

exports.handler = async function(event, context) {
    const orderNumber = event.queryStringParameters.orderNumber;
    const apiBaseUrl = 'https://ihlas-groothandel.picqer.com/api/v1';
    const config = {
        headers: {
            'Authorization': 'Basic VkZMUEY0MEl6VnlmQkFTdVBLZ2NsZEo0UnNDRlZNWE5OZ1ZGVE10MkV1VjBlS1haOg=='
        }
    };

    try {
        const response = await axios.get(`${apiBaseUrl}/orders/${orderNumber}`, config);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: error.response ? error.response.status : 500,
            body: JSON.stringify({ message: error.message })
        };
    }
};

// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000; // Gebruik de PORT omgevingsvariabele voor Vercel

app.use(express.json()); // Voor het parsen van JSON request bodies
app.use(express.static('public')); // Serveer statische bestanden vanuit de 'public' map

app.post('/api/getOrderData', async (req, res) => {
    const { orderId } = req.body;
    const apiBaseUrl = 'https://ihlas-groothandel.picqer.com/api/v1';
    const config = {
        headers: {
            'Authorization': 'Basic VkZMUEY0MEl6VnlmQkFTdVBLZ2NsZEo0UnNDRlZNWE5OZ1ZGVE10MkV1VjBlS1haOg=='
        }
    };

    try {
        const response = await axios.get(`${apiBaseUrl}/orders/${orderId}`, config);
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

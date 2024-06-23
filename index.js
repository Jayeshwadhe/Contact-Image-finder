const express = require('express');
const axios = require('axios');
const gravatar = require('gravatar');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const CLEARBIT_API_KEY = 'gravatar.com/jayeshwadhe08'; // Replace with your Clearbit API key
const CLEARBIT_LOGO_API = 'https://logo.clearbit.com/';

app.get('/home', async (req, res) => {
    res.send("hello world")
})

app.post('/get-image', async (req, res) => {
    const { input } = req.body;

    if (validateEmail(input)) {
        const gravatarUrl = gravatar.url(input, { s: '200', r: 'pg', d: '404' });
        res.json({
            type: 'email',
            imageUrl: gravatarUrl,
            input: input
        });
    } else if (validateDomain(input)) {
        try {
            const logoUrl = `${CLEARBIT_LOGO_API}${input}`;
            await axios.get(logoUrl);
            res.json({
                type: 'website',
                imageUrl: logoUrl,
                input: input
            });
        } catch (error) {
            res.json({ error: 'Could not fetch logo.' });
        }
    } else {
        res.json({ error: 'Invalid input.' });
    }
});

app.get('/autocomplete', async (req, res) => {
    const { query } = req.query;

    try {
        const response = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`, {
            headers: {
                Authorization: `Bearer ${CLEARBIT_API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.json({ error: 'Could not fetch autocomplete data.' });
    }
});

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateDomain(domain) {
    const re = /^[a-zA-Z0-9-]{1,63}\.[a-zA-Z]{2,}$/;
    return re.test(domain);
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

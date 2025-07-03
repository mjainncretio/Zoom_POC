const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://youtube:Rajnish123456@cluster0.dj261.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define Schema for storing URLs
const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortKey: String,
    shortUrl: String,       // Added field to store the full shortened URL
    redirectUrl: String     // Keeping this as optional for future use
});

// Create Model
const Url = mongoose.model('Url', urlSchema);

// Your Zoom join URL
const zoomUrl = 'https://us04web.zoom.us/j/729498774E9Li4fXU2opLAgrtTmVrY16.1';

// Simulated payment status
const isPaid = true;

// Function to generate a short URL key
const generateShortKey = (originalUrl) => 
    crypto.createHash('sha1').update(originalUrl).digest('hex').slice(0, 6);

// Route to shorten URL (stores in MongoDB)
app.get('/shorten', async (req, res) => {
    try {
        let existingUrl = await Url.findOne({ originalUrl: zoomUrl });

        if (!existingUrl) {
            const shortKey = generateShortKey(zoomUrl);
            const shortUrl = `http://localhost:${port}/${shortKey}`;
            
            // Save to database with shortUrl included
            existingUrl = await Url.create({ 
                originalUrl: zoomUrl, 
                shortKey, 
                shortUrl, 
            });
        }

        res.json({ 
            originalUrl: zoomUrl,
            shortUrl: existingUrl.shortUrl,
            shortKey: existingUrl.shortKey,
            paymentStatus: isPaid
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Middleware to handle redirects based on short URL and payment status
app.get('/:shortKey', async (req, res) => {
    try {
        const shortKey = req.params.shortKey;
        const urlEntry = await Url.findOne({ shortKey });

        if (!urlEntry) {
            return res.status(404).send('URL not found');
        }

        // Redirect based on payment status
        res.redirect(isPaid 
            ? urlEntry.originalUrl 
            : 'http://127.0.0.1:5500/-link-expiry/public/payment.html');

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
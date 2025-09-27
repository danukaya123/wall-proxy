const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Manual CORS middleware
app.use((req, res, next) => {
    // Allow all origins (or specify your domain: https://wall-rust.vercel.app)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    
    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    
    next();
});

// Proxy route
app.get("/api/wallpapers", async (req, res) => {
    const { q = "nature", page = 1, categories = "111", purity = "100", sorting = "relevance" } = req.query;

    const url = `https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(q)}&page=${page}&categories=${categories}&purity=${purity}&sorting=${sorting}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching wallpapers:", error.message);
        res.status(500).json({ error: "Failed to fetch wallpapers" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Proxy running at http://localhost:${PORT}`);
});

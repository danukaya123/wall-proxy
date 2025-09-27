const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

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

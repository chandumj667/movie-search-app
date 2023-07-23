const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

// Serve frontend files from the "public" directory
app.use(express.static("public"));

// Route to fetch movies from OMDB API
app.get("/search_movies", async (req, res) => {
    try {
        const searchTerm = req.query.q; // Query parameter from frontend
        const omdbApiKey = "effd17c3";
        const omdbApiUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${searchTerm}`;

        const response = await axios.get(omdbApiUrl);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from OMDB API:", error.message);
        res.status(500).json({ error: "Failed to fetch data from OMDB API" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

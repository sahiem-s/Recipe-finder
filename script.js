// Import required packages
import express from "express";
import cors from "cors";

// Import recipes from different files (adjust paths if needed)
import { recipe1 } from "./recipe1.js";
import { recipe2 } from "./recipe2.js";
import { recipe3 } from "./recipe3.js";

const app = express();
const port = process.env.PORT || 3000;  // Use dynamic port in Glitch

// Combine all recipe arrays into a single array
const recipes = [...recipe1, ...recipe2, ...recipe3];

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Serve static files (like HTML, CSS, and JS) from the "public" directory
app.use(express.static("public"));

// Recipe search API route
app.get("/api/search", (req, res) => {
  const searchQuery = req.query.name ? req.query.name.trim().toLowerCase() : "";

  if (!searchQuery) {
    return res.status(400).json({ error: "Please provide a recipe name to search" });
  }

  // Log the search query for debugging
  console.log("Searching for:", searchQuery);

  // Find the recipe that matches the search query (case-insensitive and trimmed)
  const recipe = recipes.find(
    (r) => r && r.name && r.name.toLowerCase().trim().includes(searchQuery)
  );

  // If recipe is found, return the recipe details
  if (recipe) {
    console.log("Recipe found:", recipe);
    return res.json({
      name: recipe.name,
      ingredients: recipe.ingredients || [],
      steps: recipe.steps || [],
      instructions: recipe.instructions || "",
      image: recipe.image || "", // Include the image if available
    });
  } else {
    // If recipe is not found, return a 404 error
    console.log("Recipe not found:", searchQuery);
    return res.status(404).json({ error: "Recipe not found" });
  }
});

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server and listen on the dynamic port (Glitch will set the port)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

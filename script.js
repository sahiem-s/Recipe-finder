// Set the live backend API URL
const apiBaseURL = "https://recipe-finder-2-8gpq.onrender.com";

// Function to search for a recipe
function searchRecipe() {
  const recipeName = document.getElementById("searchInput").value;

  // Check if the recipe name is provided
  if (!recipeName) {
    alert("Please enter a recipe name.");
    return;
  }

  // Make a request to the backend API to search for the recipe
  fetch(`https://recipe-finder-2-8gpq.onrender.com/api/search?name=${encodeURIComponent(recipeName)}`)

    .then((response) => {
      if (!response.ok) {
        throw new Error("Recipe not found.");
      }
      return response.json();
    })
    .then((recipe) => {
      // Display the recipe details once it's found
      displayRecipe(recipe);
    })
    .catch((error) => {
      console.error("Error:", error);
      // If an error occurs, display it to the user
      document.getElementById(
        "recipeResult"
      ).innerHTML = `<p>${error.message}</p>`;
    });
}

// Function to display recipe details
function displayRecipe(recipe) {
  const recipeResult = document.getElementById("recipeResult");

  // Check if the recipe has all necessary properties
  if (!recipe) {
    recipeResult.innerHTML = `<p>Recipe not found.</p>`;
    return;
  }

  // Check if recipe data is incomplete
  if (!recipe.name || !recipe.image || !recipe.ingredients || !recipe.steps) {
    recipeResult.innerHTML = `<p>Recipe data is incomplete.</p>`;
    return;
  }

  // Render the recipe details
  recipeResult.innerHTML = `
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
    <div class="recipe-ingredients">
      <h3>Ingredients:</h3>
      <ul>
        ${recipe.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}
      </ul>
    </div>
    <div class="recipe-steps">
      <h3>Steps:</h3>
      <ul>
        ${recipe.steps.map((step) => `<li>${step}</li>`).join("")}
      </ul>
    </div>
  `;
}

// Function to clear the search input field
function clearSearch() {
  document.getElementById("searchInput").value = "";
  document.getElementById("clearBtn").style.display = "none"; // Hide the clear button
  document.getElementById("recipeResult").innerHTML = ""; // Optionally clear the recipe result
}

// Function to toggle the visibility of the clear button (X)
function toggleClearButton() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");

  if (searchInput.value.trim()) {
    clearBtn.style.display = "block"; // Show the clear button when there is input
  } else {
    clearBtn.style.display = "none"; // Hide the clear button when input is empty
  }
}

// Add event listeners to the input field to trigger the toggle of the clear button
document
  .getElementById("searchInput")
  .addEventListener("input", toggleClearButton);

// Optionally, clear the search when the 'X' button is clicked
document.getElementById("clearBtn").addEventListener("click", clearSearch);

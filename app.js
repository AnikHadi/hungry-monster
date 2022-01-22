// ==========================================================================
// ================================This is ok================================
// ==========================================================================
const mealShow = () => {
    const inputMealName = document.getElementById('input-meal-name').value;

    //Check If user search anything
    if (inputMealName) {
        // Clear all Information
        clearAll();
        // Search Result Details visible 
        const catagoriesOpen = document.getElementById('catagories');
        catagoriesOpen.style.visibility = "visible";

        const nameUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMealName}`;
        fetch(nameUrl)
            .then(res => res.json())
            .then(data => {
                searchMealResult(data, inputMealName);
            })
    }
    else {
        // Clear all Information
        clearAll();
        // display Not found Meg
        const noMealFound = document.getElementById('item-not-found');
        noMealFound.innerText = `You haven't entered anything`;
    }
}
// ==========================================================================
// ============================== searchMealResult ==========================
// ==========================================================================
const searchMealResult = (data, inputMealName) => {
    const meals = data.meals;
    // console.log(meals);
    if (meals) {
        meals.forEach(meal => {
            displaySearchMeal(meal);
        });
    }
    else {
        // Clear all Information
        clearAll();
        // display Not found Meg
        const noMealFound = document.getElementById('item-not-found');
        noMealFound.innerText = `No meal found for "${inputMealName}"!`;
    }
}

// ==========================================================================
// ============================ Display Search Meal =========================
// ==========================================================================
const displaySearchMeal = (meal) => {
    let catagoriesDiv = document.getElementById('catagories')

    const mealDiv = document.createElement('div');
    mealDiv.className = "meal-div";
    const mealInfo =
        `
        <a class="meal-div-link">
            <div class="meal-image">
                <img src="${meal.strMealThumb}">
            </div>
            <div>
                <button onclick="mealDetails(${meal.idMeal})" class="meal-btn">${meal.strMeal}</button>
            </div>
        </a>
    `;
    mealDiv.innerHTML = mealInfo;
    catagoriesDiv.appendChild(mealDiv);
}

// ==========================================================================
// =========================== Meal Details Section =========================
// ==========================================================================
const mealDetails = idMeal => {
    const mealDetailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(mealDetailsUrl)
        .then(res => res.json())
        .then(data => {
            mealDetailsDiv(data);
        })

    // Clear Meal Details Information and Not Found Item
    clearMealDetailsItemNotFound();
    // Search Result Details Hide 
    const catagoriesRemove = document.getElementById('catagories');
    catagoriesRemove.style.visibility = "hidden";
}

// ==========================================================================
// ============================ Meal Details Div ============================
// ==========================================================================
const mealDetailsDiv = (data1) => {
    const meal = data1.meals[0];
    const mealDetails = document.getElementById('meal-details');

    //create div into the meal Details Div
    const mealDiv = document.createElement('div');
    mealDiv.className = "meal-details-div";
    const divInfo = `
        <div><img src="${meal.strMealThumb}"></div>
        <div class="discretion">
            <h1 class="meal-name">${meal.strMeal}</h1>
            <h3>Meal Ingredients</h3>
            <div id="ingredients-class"></div>
            <div class="close-btn ms-auto"><a onclick="clearMealDetails()">Close</a></div>
        </div>
    `;
    mealDiv.innerHTML = divInfo;
    mealDetails.appendChild(mealDiv);

    ingredientLoop(meal);
}

// ==========================================================================
// ============================= Ingredient Loop ============================
// ==========================================================================
const ingredientLoop = (data) => {
    const ingredientsParent = document.getElementById('ingredients-class');
    if (data != "") {
        for (let i = 1; data[`strIngredient${i}`]; i++) {
            const ingredientName = `
            ☑ ${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}
            `;
            //create div into the meal Details Div
            const mealDiv = document.createElement('ul');
            mealDiv.className = "ingredients-list";
            const ingredientsItems = `
                    <li class="ingredient-item">${ingredientName}</li>
            `;
            mealDiv.innerHTML = ingredientsItems;
            ingredientsParent.appendChild(mealDiv);
        }
    }
}

// ==========================================================================
// ===================== Clear Meal Details Information =====================
// ==========================================================================
const clearMealDetails = () => {
    // Clear Meal Details Information and Not Found Item
    clearMealDetailsItemNotFound();
    // Search Result Details visible 
    const catagoriesOpen = document.getElementById('catagories');
    catagoriesOpen.style.visibility = "visible";
}
// ==========================================================================
// ========================== Clear all Information =========================
// ==========================================================================
const clearAll = () => {
    // clear catagories  div
    const catagoriesDiv = document.getElementById('catagories');
    catagoriesDiv.innerText = "";

    clearMealDetailsItemNotFound();
}
// ==========================================================================
// ============ Clear Meal Details Information and Not Found Item============
// ==========================================================================
const clearMealDetailsItemNotFound = () => {
    // Clear the No Meal Found Tag For Every Single New Search
    const itemNotFound = document.getElementById('item-not-found');
    itemNotFound.innerHTML = "";
    // clear meal details information
    const mealDetails = document.getElementById('meal-details');
    mealDetails.innerHTML = "";
}
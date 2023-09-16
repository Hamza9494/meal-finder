//www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
const form = document.getElementById('submit');
const search = document.getElementById('search');
const searchBtn = document.querySelector('.search-btn');
const randomBtn = document.querySelector('#random');
const resultHeading = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');

//fetch meals
function FetchMeals(e) {
  e.preventDefault();
  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          meals.innerHTML = data.meals
            .map((item) => {
              return `<div class=meal> 
            <img src="${item.strMealThumb}" alt="${item.strMeal}">
            <div class="meal-info" data-idmeal = ${item.idMeal}> <h3>  ${item.strMeal} </h3></div>
          </div>`;
            })
            .join('');
        }
      });
  } else {
    alert('search for a meal!');
  }
}

//fetch meal by id
function getMealByID(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      console.log(meal);
      addMealToDOM(meal);
    });
}

//add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  console.log(meal);

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMeal.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}
//event listenrs
form.addEventListener('submit', FetchMeals);

meals.addEventListener('click', (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-idmeal');
    getMealByID(mealID);
  }
});

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

console.log("Tracalorie!");

class Meal {
  #id;
  #name;
  #calories;

  constructor(name, calories) {
    this.#id = this.#generateId();
    this.#name = name;
    this.#calories = calories;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get calories() {
    return this.#calories;
  }

  #generateId() {
    return `${Math.random().toString(16).slice(2)}${new Date().getTime()}`;
  }
}

class Workout {
  #id;
  #name;
  #calories;

  constructor(name, calories) {
    this.#id = this.#generateId();
    this.#name = name;
    this.#calories = calories;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get calories() {
    return this.#calories;
  }

  #generateId() {
    return `${Math.random().toString(16).slice(2)}${new Date().getTime()}`;
  }
}

class CalorieTracker {
  #calorieLimit;
  #totalCalories;
  #meals;
  #workouts;

  constructor() {
    this.#calorieLimit = 2000;
    this.#totalCalories = 0;
    this.#meals = [];
    this.#workouts = [];

    this.#displayCalorieLimit();
    this.#displayCalorieTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemaining();
    this.#displayCaloriesProgress();
  }

  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;

    this.#rendorStats();
    this.#displayNewMeal(meal);
  }

  removeMeal(id) {
    for (let i = 0; i < this.#meals.length; i++) {
      const meal = this.#meals[i];
      if (meal.id === id) {
        this.#meals.splice(i, 1);
        this.#totalCalories -= meal.calories;
        break;
      }
    }

    this.#rendorStats();
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;

    this.#rendorStats();
    this.#displayWorkout(workout);
  }

  removeWorkout(id) {
    for (let i = 0; i < this.#workouts.length; i++) {
      const workout = this.#workouts[i];
      if (workout.id === id) {
        this.#workouts.splice(i, 1);
        this.#totalCalories += workout.calories;
        break;
      }
    }

    this.#rendorStats();
  }

  #displayCalorieTotal() {
    document.getElementById("calories-total").innerText = this.#totalCalories;
  }

  #displayCalorieLimit() {
    document.getElementById("calories-limit").innerText = this.#calorieLimit;
  }

  #displayCaloriesConsumed() {
    document.getElementById("calories-consumed").innerText = this.#meals
      .map((m) => m.calories)
      .reduce((p, c) => p + c, 0);
  }

  #displayCaloriesBurned() {
    document.getElementById("calories-burned").innerText = this.#workouts
      .map((m) => m.calories)
      .reduce((p, c) => p + c, 0);
  }

  #displayCaloriesRemaining() {
    const remaining = this.#calorieLimit - this.#totalCalories;
    const caloriesRemainingEl = document.getElementById("calories-remaining");
    caloriesRemainingEl.innerText = remaining;
    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        "bg-danger"
      );
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.add("bg-light");
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
    }
  }

  #displayCaloriesProgress() {
    const progressEl = document.getElementById("calorie-progress");

    let percentage = 0;

    if (this.#totalCalories < this.#calorieLimit) {
      percentage = Math.round((this.#totalCalories / this.#calorieLimit) * 100);
      progressEl.classList.remove("bg-danger");
    } else {
      percentage = 100;
      progressEl.classList.add("bg-danger");
    }

    progressEl.style.width = `${percentage}%`;
  }

  #displayNewMeal(meal) {
    const mealItems = document.getElementById("meal-items");

    const mealEl = document.createElement("div");
    mealEl.classList.add("card");
    mealEl.classList.add("my-2");
    mealEl.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${meal.name}</h4>
        <div
          class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
        >
          ${meal.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    `;

    mealItems.appendChild(mealEl);
  }

  #displayWorkout(workout) {
    const workoutItems = document.getElementById("workout-items");

    const workoutEl = document.createElement("div");
    workoutEl.classList.add("card");
    workoutEl.classList.add("my-2");
    workoutEl.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${workout.name}</h4>
        <div
          class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
        >
          ${workout.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    `;

    workoutItems.appendChild(workoutEl);
  }

  #rendorStats() {
    this.#displayCalorieTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemaining();
    this.#displayCaloriesProgress();
  }
}

/* const tracker = new CalorieTracker();

const run = new Workout("Morning run", 320);
tracker.addWorkout(run);

const breakfast = new Meal("Breakfast", 400);
tracker.addMeal(breakfast);

const superSize = new Meal("Super Size", 1920);
tracker.addMeal(superSize); */

class App {
  #tracker;

  constructor() {
    this.#tracker = new CalorieTracker();

    document.getElementById("meal-form").addEventListener("submit", (event) => {
      this.#newItem(event, "meal");
    });

    document
      .getElementById("workout-form")
      .addEventListener("submit", (event) => {
        this.#newItem(event, "workout");
      });
  }

  #newItem(e, type) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    // validate inputs
    if (name.value.trim() === "" || calories.value === "") {
      alert("Please fill in all fields");
      return;
    }

    if (type === "meal") {
      const meal = new Meal(name.value.trim(), Number(calories.value));
      this.#tracker.addMeal(meal);
    } else if (type === "workout") {
      const workout = new Workout(name.value.trim(), Number(calories.value));
      this.#tracker.addWorkout(workout);
    }

    name.value = "";
    calories.value = "";

    const collpaseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collpaseItem, {
      toggle: true,
    });
  }

  #removeItem() {}

  #filterItems() {}

  #reset() {}

  #setLimit() {}
}

const app = new App();

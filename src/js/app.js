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
    this.#calorieLimit = Storage.getCalorieLimit();
    this.#totalCalories = Storage.getTotalCalories(0);
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
    Storage.setTotalCalories(this.#totalCalories);

    this.#displayNewMeal(meal);
    this.#rendorStats();
  }

  removeMeal(id) {
    const index = this.#meals.findIndex((meal) => meal.id === id);
    if (index !== -1) {
      const meal = this.#meals[index];
      this.#totalCalories -= meal.calories;
      Storage.setTotalCalories(this.#totalCalories);
      this.#meals.splice(index, 1);

      const mealEl = document.querySelector(`[data-id="${id}"]`);
      mealEl.remove();
      this.#rendorStats();
    }
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
    Storage.setTotalCalories(this.#totalCalories);

    this.#displayNewWorkout(workout);
    this.#rendorStats();
  }

  removeWorkout(id) {
    const index = this.#workouts.findIndex((workout) => workout.id === id);
    if (index !== -1) {
      const workout = this.#workouts[index];
      this.#totalCalories += workout.calories;
      Storage.setTotalCalories(this.#totalCalories);
      this.#workouts.splice(index, 1);

      const workoutEl = document.querySelector(`[data-id="${id}"]`);
      workoutEl.remove();
      this.#rendorStats();
    }
  }

  resetDay() {
    this.#totalCalories = 0;
    Storage.setTotalCalories(this.#totalCalories);
    this.#meals = [];
    this.#workouts = [];
    this.#rendorStats();
  }

  setLimit(calorieLimit) {
    this.#calorieLimit = calorieLimit;
    Storage.setCalorieLimit(calorieLimit);

    this.#displayCalorieLimit();
    this.#rendorStats();
  }

  loadItems(type, input) {
    if (type === "meal") {
      let searchResults;
      if (input) {
        searchResults = this.#meals.filter((m) =>
          m.name.toLowerCase().includes(input.toLowerCase())
        );
      } else {
        searchResults = this.#meals;
      }

      const mealItems = document.getElementById("meal-items");
      mealItems.innerHTML = "";

      for (const meal of searchResults) {
        this.#displayNewMeal(meal);
      }
    } else if (type === "workout") {
      let searchResults;
      if (input) {
        searchResults = this.#workouts.filter((m) =>
          m.name.toLowerCase().includes(input.toLowerCase())
        );
      } else {
        searchResults = this.#workouts;
      }

      const workoutItems = document.getElementById("workout-items");
      workoutItems.innerHTML = "";

      for (const meal of searchResults) {
        this.#displayNewWorkout(meal);
      }
    }
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
      percentage = Math.max(
        0,
        Math.round((this.#totalCalories / this.#calorieLimit) * 100)
      );
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
    mealEl.classList.add("card", "my-2");
    mealEl.setAttribute("data-id", meal.id);
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

  #displayNewWorkout(workout) {
    const workoutItems = document.getElementById("workout-items");

    const workoutEl = document.createElement("div");
    workoutEl.classList.add("card", "my-2");
    workoutEl.setAttribute("data-id", workout.id);
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

class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    return localStorage.getItem("calorieLimit") !== null
      ? Number(localStorage.getItem("calorieLimit"))
      : defaultLimit;
  }

  static setCalorieLimit(limit) {
    localStorage.setItem("calorieLimit", limit);
  }

  static getTotalCalories(defaultTotal = 0) {
    return localStorage.getItem("totalCalories") !== null
      ? Number(localStorage.getItem("totalCalories"))
      : defaultTotal;
  }

  static setTotalCalories(total) {
    localStorage.setItem("totalCalories", total);
  }
}

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

    document.getElementById("meal-items").addEventListener("click", (evt) => {
      this.#removeItem(evt, "meal");
    });

    document
      .getElementById("workout-items")
      .addEventListener("click", (evt) => {
        this.#removeItem(evt, "workout");
      });

    document.getElementById("filter-meals").addEventListener("input", (evt) => {
      this.#filterItems("meal", evt);
    });

    document
      .getElementById("filter-workouts")
      .addEventListener("input", (evt) => {
        this.#filterItems("workout", evt);
      });

    document
      .getElementById("reset")
      .addEventListener("click", this.#reset.bind(this));

    document
      .getElementById("limit-form")
      .addEventListener("submit", this.#setLimit.bind(this));
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

  #removeItem(e, type) {
    if (
      e.target.classList.contains("delete") ||
      e.target.parentElement.classList.contains("delete")
    ) {
      if (confirm("Are you sure?")) {
        const id = e.target.closest(".card").dataset.id;

        if (type === "meal") {
          this.#tracker.removeMeal(id);
        } else if (type === "workout") {
          this.#tracker.removeWorkout(id);
        }
      }
    }
  }

  #filterItems(type, e) {
    const text = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll(`#${type}-items .card`);
    items.forEach((item) => {
      const name =
        item.firstElementChild.firstElementChild.firstElementChild.innerText.trim();

      if (name.toLowerCase().includes(text)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // this.#tracker.loadItems(type, text);
  }

  #reset() {
    this.#tracker.resetDay();

    const mealItems = document.getElementById("meal-items");
    mealItems.innerHTML = "";

    const workoutItems = document.getElementById("workout-items");
    workoutItems.innerHTML = "";

    const filterMeals = document.getElementById("filter-meals");
    filterMeals.value = "";

    const filterWorkouts = document.getElementById("filter-workouts");
    filterWorkouts.value = "";
  }

  #setLimit(evt) {
    evt.preventDefault();

    const modal = bootstrap.Modal.getInstance("#limit-modal");
    const limit = document.getElementById("limit");

    if (limit.value === "" || isNaN(limit.value) || Number(limit.value) <= 0) {
      alert("Please add a valid limit");
      return;
    }

    this.#tracker.setLimit(Number(limit.value));

    limit.value = "";
    modal.hide();
  }
}

const app = new App();

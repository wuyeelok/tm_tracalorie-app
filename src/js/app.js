const { c } = require("vite/dist/node/types.d-aGj9QkWt");

console.log("Tracalorie!");

class Meal {
  #id;
  #name;
  #calories;

  constructor(id, name, calories) {
    this.#id = id;
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
}

class Workout {
  #id;
  #name;
  #calories;

  constructor(id, name, calories) {
    this.#id = id;
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
}

class CalorieTracker {
  #calorieLimit;
  #totalCalories;
  #meals;
  #workouts;

  constructor(calorieLimit) {
    this.#calorieLimit = calorieLimit;
    this.#totalCalories = 0;
    this.#meals = [];
    this.#workouts = [];
  }

  addMeal(name, calories) {
    const id = this.#meals.length;
    const meal = new Meal(id, name, calories);
    this.#meals.push(meal);
    this.#totalCalories += calories;
  }

  removeMeal(id) {
    const meal = this.#meals[id];
    this.#meals.splice(id, 1);
    this.#totalCalories -= meal.calories;
  }

  addWorkout(name, calories) {
    const id = this.#workouts.length;
    const workout = new Workout(id, name, calories);
    this.#workouts.push(workout);
    this.#totalCalories -= calories;
  }

  removeWorkout(id) {
    const workout = this.#workouts.length;
    this.#workouts.splice(id, 1);
    this.#totalCalories += workout.calories;
  }
}

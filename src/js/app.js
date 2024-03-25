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
    this.#displayProgressBar();
  }

  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;

    this.#rendorStats();
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
    const caloriesRemaining = this.#calorieLimit - this.#totalCalories;
    const calRemainEle = document.getElementById("calories-remaining");
    calRemainEle.innerText = caloriesRemaining;
    if (caloriesRemaining < 0) {
      calRemainEle.parentElement.parentElement.classList.remove("bg-light");
      calRemainEle.parentElement.parentElement.classList.add("bg-danger");
    } else {
      calRemainEle.parentElement.parentElement.classList.add("bg-light");
      calRemainEle.parentElement.parentElement.classList.remove("bg-danger");
    }
  }

  #displayProgressBar() {
    const progressEle = document.getElementById("calorie-progress");

    let progress = 0;

    if (this.#totalCalories <= this.#calorieLimit) {
      progress = Math.round((this.#totalCalories / this.#calorieLimit) * 100);
      progressEle.classList.remove("bg-danger");
    } else {
      progress = 100;
      progressEle.classList.add("bg-danger");
    }

    progressEle.style.width = `${progress}%`;
  }

  #rendorStats() {
    this.#displayCalorieTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemaining();
    this.#displayProgressBar();
  }
}

const tracker = new CalorieTracker();

const run = new Workout("Morning run", 320);
tracker.addWorkout(run);

const breakfast = new Meal("Breakfast", 400);
tracker.addMeal(breakfast);

const superSize = new Meal("Super Size", 3000);
tracker.addMeal(superSize);

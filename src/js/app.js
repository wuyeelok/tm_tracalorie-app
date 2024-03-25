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

import { task } from "./task.js";

class section {
    #tasks = [];
    #name = [];

    constructor(name) {
        this.#name = name;
    }

    addTask(title, description, date, priority) {
        this.#tasks.push(new task(title, description, date, priority));
    }

    removeTask(index) {
        this.#tasks.splice(index, 1);
    }

    get tasks() { return this.#tasks; };
    get name() { return this.#name; };
}

export { section };
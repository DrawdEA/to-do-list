import { task } from "./task.js";

class section {
    #tasks = [];

    constructor(name) {
        this.name = name;
    }

    addTask() {
        this.#tasks.push(new task("Test Task", "This is a test task.", new Date(), 1));
    }

    removeTask(index) {
        this.#tasks.splice(index, 1);
    }
}

export { section };
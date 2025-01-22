import { format } from "date-fns";

class task {
    #title;
    #description;
    #dueDate;
    #priority;

    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = format(dueDate, "MM-dd-yyyy"); // Format date to a string
        this.#priority = priority;
    }

    get title() { return this.#title; };
    set title(newTitle) { this.#title = newTitle; };

    get description() { return this.#description; };
    set description(newDescription) { this.#description = newDescription; };

    get dueDate() { return this.#dueDate; };
    set dueDate(newDue) { this.#dueDate = format(newDue, "MM-dd-yyyy"); };

    get priority() { return this.#priority; };
    set priority(newPriority) { this.#priority = newPriority; };
}

export { task };
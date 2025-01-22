import { section } from "./section.js";

let manager = (function() {
    const parent = document.querySelector("#content");
    const createTask = document.querySelector("#create-task");
    const createSection = document.querySelector("#create-section");

    const taskForm = document.querySelector("#task-form");
    const sectionForm = document.querySelector("#section-form");



    let sections = [];

    function displayTask(section, taskName, taskDescription, taskDate, taskPriority) {
        // Create the task container div.
        const task = document.createElement('div');
        task.classList.add('task');
    
        // Create the main detail container div.
        const mainDetail = document.createElement('div');
        mainDetail.classList.add('main-detail');
    
        // Create the check-storage container and button.
        const checkStorage = document.createElement('div');
        checkStorage.classList.add('check-storage');
        const checkButton = document.createElement('button');
        checkButton.classList.add('check');
        checkStorage.appendChild(checkButton);
    
        // Create the title and description section.
        const title = document.createElement('div');
        title.classList.add('title');
        const taskTitle = document.createElement('h3');
        taskTitle.classList.add('title');
        taskTitle.textContent = taskName; // The task title.
        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = taskDescription; // The description.
    
        // Create the misc buttons and information.
        const miscs = document.createElement('div');
        miscs.classList.add('miscs');
        const viewButton = document.createElement('button');
        viewButton.classList.add('view');
        viewButton.textContent = 'View'; // The view button.
        const due = document.createElement('div');
        due.classList.add('due');
        due.textContent = `Due on ${taskDate}`; // The due date.
        const priority = document.createElement('div');
        priority.classList.add('priority');
        priority.textContent = `Priority ${taskPriority}`; // The priority level.
    
        // Append the components to their respective parents
        miscs.appendChild(viewButton);
        miscs.appendChild(due);
        miscs.appendChild(priority);
        title.appendChild(taskTitle);
        title.appendChild(description);
        title.appendChild(miscs);
        mainDetail.appendChild(checkStorage);
        mainDetail.appendChild(title);
        task.appendChild(mainDetail);
    
        // Append the task to the provided parent
        section.appendChild(task);
    }

    function displaySection(name) {
        // Create a new div element with the class "section"
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section';
    
        // Create and add the header element
        const header = document.createElement('h3');
        header.className = 'section-header';
        header.textContent = name;
        sectionDiv.appendChild(header);
    
        // Append the new section to the parent element
        parent.appendChild(sectionDiv);
        
        return sectionDiv;
    }

    function refreshDisplay() {
        parent.replaceChildren();

        // Loop through each section.
        for (let i = 0; i < sections.length; i++) {
            let section = displaySection(sections[i].name);

            // Loop through tasks.
            for (let j = 0; j < sections[i].tasks.length; j++) {
                const taskValues = sections[i].tasks[j];
                displayTask(
                    section, 
                    taskValues.title, 
                    taskValues.description, 
                    taskValues.dueDate, 
                    taskValues.priority
                );
            }

            const taskButton = document.createElement('button');
            taskButton.className = 'add-task';
            taskButton.textContent = 'Add Task';

            // Add event listener for modal.
            taskButton.addEventListener("click", () => {
                if (createTask.open) {
                    createTask.close()
                } else {
                    createTask.showModal();
                }

                // Set hidden value to the index of the section.
                taskForm.index.value = i;
            })

            section.appendChild(taskButton);
        }

        const sectionButton = document.createElement('button');
        sectionButton.className = 'add-section';
        sectionButton.textContent = 'Add Section';

        // Add event listener for modal.
        sectionButton.addEventListener("click", () => {
            if (createSection.open) {
                createSection.close();
            } else {
                createSection.showModal();
            }
        })

        parent.appendChild(sectionButton);
    }

    function initialize() {
        sections.push(new section("General"));
        refreshDisplay();
    }

    // Handles opening and closing the dialogs.
    createTask.addEventListener("click", (event) => {
        if (createTask.open && !createTask.contains(event.target)) {
            createTask.close();
        }
    })

    createSection.addEventListener("click", (event) => {
        if (createSection.open && !createSection.contains(event.target)) {
            createSection.close();
        }
    })

    // Handling form submissions for both creating a task and section.
    taskForm.addEventListener("submit", () => {
        sections[taskForm.index.value].addTask(
            taskForm.name.value, 
            taskForm.description.value, 
            taskForm.date.value, 
            taskForm.priority.value
        )
        refreshDisplay();
        taskForm.reset();
    })

    sectionForm.addEventListener("submit", () => {
        sections.push(new section(sectionForm.name.value));
        sectionForm.reset();
        refreshDisplay();
        
    })

    return { initialize }
})();

export { manager };
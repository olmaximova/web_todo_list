const HEADERS = ["Mark Done", "Task", "Date", "Status", "Actions"];
const STATUS_OPTIONS = [
    { value: "all", text: "All" },
    { value: "pending", text: "Pending" },
    { value: "completed", text: "Completed" },
];

const createHeader = (header) => {
    const th = document.createElement("th");
    th.textContent = header;
    if (header == "Status") {
        const select = document.createElement("select");
        select.className = "selectFilter";
        STATUS_OPTIONS.forEach((opt) => {
            const option = document.createElement("option");
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
        });
        select.addEventListener("change", filterTasks);
        th.append(select);
    }

    if (header === "Date") {
        th.className = "sortable-header";
        th.addEventListener("click", () => {
            handleDateHeaderClick();
        });
    }
    return th;
};

const loadElements = () => {
    const main = document.createElement("main");
    const body = document.querySelector("body");

    const section = document.createElement("section");
    section.className = "taskSection";

    const sidebar = createSidebar();

    const h1 = document.createElement("h1");
    h1.textContent = "To Do List";

    let curDateTime = new Date().toDateString();
    const dateContainer = document.createElement("span");
    dateContainer.textContent = curDateTime;

    const form = document.createElement("form");
    form.style.display = "none";

    const table = document.createElement("table");
    table.setAttribute("id", "todo-table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const tbody = document.createElement("tbody");
    tbody.setAttribute("id", "todo-tbody");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        addTask();
    });

    HEADERS.forEach((header) => headerRow.append(createHeader(header)));

    body.append(main, sidebar);
    main.appendChild(section);
    section.append(h1, dateContainer, form, table);
    table.append(thead, tbody);
    thead.appendChild(headerRow);
};

const filterTasks = (event) => {
    const status = event.target.value;
    const tasksTable = document.getElementById("todo-tbody");
    const allRows = tasksTable.querySelectorAll(".todo-items");

    allRows.forEach((row) => {
        const statusLabel = row.querySelector(".task-status label");
        const isCompleted = statusLabel.textContent.toLowerCase() === "completed";

        switch (status) {
            case "completed":
                row.style.display = isCompleted ? "" : "none";
                break;
            case "pending":
                row.style.display = isCompleted ? "none" : "";
                break;
            default:
                row.style.display = "";
                break;
        }
    });
};

const createIconButton = (className, iconSrc, clickHandler) => {
    const button = document.createElement("button");
    button.className = className;
    const img = document.createElement("img");
    img.src = iconSrc;
    button.appendChild(img);
    button.addEventListener("click", clickHandler);
    return button;
};

const createTasks = (element) => {
    const taskId = element.id;

    const row = document.createElement("tr");
    row.className = "todo-items";
    row.dataset.id = element.id;
    row.draggable = true;

    const taskText = document.createElement("td");
    taskText.className = "task-text";
    taskText.setAttribute("for", taskId);

    const textArea = document.createElement("textarea");
    textArea.className = "task-area";
    textArea.disabled = true;
    textArea.textContent = element.task;
    textArea.dataset.id = taskId;

    if (element.completed) {
        textArea.style.textDecoration = "solid line-through black 2px";
        textArea.style.color = "grey";
    }

    const taskDate = document.createElement("td");
    taskDate.className = "task-date";
    taskDate.setAttribute("for", taskId);
    taskDate.textContent = element.date;
    taskDate.dataset.id = taskId;

    const taskStatus = document.createElement("td");
    taskStatus.className = "task-status";

    const statusLabel = document.createElement("label");
    statusLabel.setAttribute("for", taskId);
    statusLabel.textContent = element.completed ? "Completed" : "Pending";

    const taskActions = document.createElement("td");
    taskActions.className = "task-actions";

    const deleteIcon = createIconButton("task-delete", "images/delete.png", () =>
        deleteTask(element.id)
    );
    const editIcon = createIconButton("task-edit", "images/edit.png", () =>
        editTaskDate(element.id)
    );

    const taskDoneTable = document.createElement("td");
    taskDoneTable.className = "task-done";

    const inputCheckBox = document.createElement("input");
    inputCheckBox.setAttribute("type", "checkbox");
    inputCheckBox.setAttribute("id", taskId);
    inputCheckBox.className = "checkbox";
    inputCheckBox.checked = element.completed;
    inputCheckBox.style.display = "none";

    inputCheckBox.addEventListener("change", () => taskDone(element.id));

    const doneIcon = document.createElement("label");
    doneIcon.setAttribute("for", taskId);
    const doneImg = document.createElement("img");
    doneIcon.className = "check-done";
    doneImg.src = "images/done.png";
    doneImg.className = "done-icon";

    if (element.completed) {
        statusLabel.classList.add('completed');
    }

    if (element.completed) {
        doneIcon.classList.add('completed');
        doneImg.style.display = "block";
    } else {
        doneIcon.classList.remove('completed');
        doneImg.style.display = "none";
    }

    taskText.appendChild(textArea);
    taskStatus.appendChild(statusLabel);
    doneIcon.appendChild(doneImg);
    taskDoneTable.append(inputCheckBox, doneIcon);
    taskActions.append(editIcon, deleteIcon);

    row.append(taskDoneTable, taskText, taskDate, taskStatus, taskActions);

    return row;
};

const displayTasks = () => {
    const tasksTable = document.querySelector("#todo-tbody");

    // иначе некоторые задачи дублируются после того, как нажать на кнопку добавить
    while (tasksTable.firstChild) {
        tasksTable.removeChild(tasksTable.firstChild);
    }

    taskLocalList.forEach((element) => {
        const row = createTasks(element);
        tasksTable.append(row);
    });

    dragAndDrop();
    mobileDragAndDrop();
};

const deleteTask = (taskId) => {
    taskLocalList = taskLocalList.filter((task) => task.id !== taskId);
    localStorage.setItem("taskLocalList", JSON.stringify(taskLocalList));
    displayTasks();
};

const editTaskDate = (taskId) => {
    const taskIndex = taskLocalList.findIndex((task) => task.id === taskId);

    const textToChange = document.querySelector(
        `.task-area[data-id="${taskId}"]`
    );
    const dateToChange = document.querySelector(
        `.task-date[data-id="${taskId}"]`
    );

    if (textToChange.disabled) {
        textToChange.disabled = false;
        textToChange.focus();

        const currentDate = dateToChange.textContent;
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.value = currentDate;
        dateInput.className = "date-to-edit";
        dateInput.dataset.id = taskId;
        dateToChange.replaceChildren(dateInput);
    } else {
        textToChange.disabled = true;
        taskLocalList[taskIndex].task = textToChange.value.trim();

        const dateInput = dateToChange.querySelector(".date-to-edit");
        if (dateInput) {
            taskLocalList[taskIndex].date = dateInput.value;
            dateTextValue = document.createTextNode(dateInput.value);
            dateToChange.replaceChildren(dateTextValue);
        }

        localStorage.setItem("taskLocalList", JSON.stringify(taskLocalList));
        saveCurrentOrder();
    }
};

const taskDone = (taskId) => {
    const taskIndex = taskLocalList.findIndex((task) => task.id === taskId);
    if (taskLocalList[taskIndex].completed == false) {
        taskLocalList[taskIndex].completed = true;
    } else {
        taskLocalList[taskIndex].completed = false;
    }
    localStorage.setItem("taskLocalList", JSON.stringify(taskLocalList));
    displayTasks();
};

function sortDates(asc = true) {
    const tbody = document.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll(".todo-items"));

    const sortedRows = rows.sort((a, b) => {
        const aDate = a.querySelector(".task-date").textContent;
        const bDate = b.querySelector(".task-date").textContent;

        const aDateObj = new Date(aDate);
        const bDateObj = new Date(bDate);

        if (aDateObj < bDateObj) return asc ? -1 : 1;
        if (aDateObj > bDateObj) return asc ? 1 : -1;
    });

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    sortedRows.forEach((row) => {
        tbody.appendChild(row);
    });

    const table = document.querySelector("table");
    table
        .querySelectorAll("th")
        .forEach((th) => th.classList.remove("th-sort-acs", "th-sort-desc"));
    table
        .querySelector(`th:nth-child(${3})`)
        .classList.toggle("th-sort-asc", asc);
    table
        .querySelector(`th:nth-child(${3})`)
        .classList.toggle("th-sort-desc", !asc);
}

let currentSortDirection = true;

function handleDateHeaderClick() {
    currentSortDirection = !currentSortDirection;
    sortDates(currentSortDirection);
}

function saveCurrentOrder() {
    const tbody = document.querySelector("#todo-tbody");
    const rows = tbody.querySelectorAll(".todo-items");
    const currentOrder = Array.from(rows).map((row) => row.dataset.id);
    const orderedTasks = [];
    currentOrder.forEach((taskId) => {
        const task = taskLocalList.find((t) => t.id === taskId);
        if (task) orderedTasks.push(task);
    });

    taskLocalList = orderedTasks;
    localStorage.setItem("taskLocalList", JSON.stringify(taskLocalList));
}

const dragAndDrop = () => {
    let draggedItem = null;

    const taskRows = document.querySelectorAll("tr.todo-items");

    taskRows.forEach((row) => {
        row.setAttribute("draggable", "true");

        row.addEventListener("dragstart", (e) => {
            draggedItem = row;
            row.style.opacity = "0.5";
            e.dataTransfer.effectAllowed = "move";
        });

        row.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            row.style.backgroundColor = "#D3D3D3";
        });

        row.addEventListener("dragleave", () => {
            row.style.backgroundColor = "";
        });

        row.addEventListener("drop", (e) => {
            e.preventDefault();

            if (draggedItem && draggedItem !== row) {
                row.style.backgroundColor = "";
                const temp = document.createElement("tr");
                row.parentNode.insertBefore(temp, row);
                row.parentNode.insertBefore(row, draggedItem);
                row.parentNode.insertBefore(draggedItem, temp);
                row.parentNode.removeChild(temp);

                updateTasksOrder();
            }
        });

        row.addEventListener("dragend", () => {
            if (draggedItem) {
                draggedItem.style.opacity = "";
            }
            draggedItem = null;
        });
    });
};

const mobileDragAndDrop = () => {
    let draggedItem = null;
    let targetRow = null;
    let dragStartTime = 0;
    const LONG_PRESS_DURATION = 500;

    const resetDragState = () => {
        document.querySelectorAll("tr.todo-items").forEach((row) => {
            row.style.backgroundColor = "";
        });
        if (draggedItem) {
            draggedItem.style.opacity = "";
            draggedItem = null;
        }
        targetRow = null;
    };

    const taskRows = document.querySelectorAll("tr.todo-items");

    taskRows.forEach((row) => {
        let longPressTimer;

        row.addEventListener("touchstart", (e) => {
            if (e.target.closest('.task-actions, .task-done, .check-done, .task-edit, .task-delete')) {
                return;
            }

            dragStartTime = Date.now();
            longPressTimer = setTimeout(() => {
                draggedItem = row;
                row.style.opacity = '0.7';
            }, LONG_PRESS_DURATION);

        });

        row.addEventListener("touchmove", (e) => {
            if (longPressTimer && Date.now() - dragStartTime < LONG_PRESS_DURATION) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
                return;
            }
            const touch = e.touches[0];
            const elementUnder = document.elementFromPoint(
                touch.clientX,
                touch.clientY
            );
            const newTargetRow = elementUnder?.closest("tr.todo-items");

            if (targetRow && targetRow !== newTargetRow) {
                targetRow.style.backgroundColor = "";
            }

            if (newTargetRow && newTargetRow !== draggedItem) {
                targetRow = newTargetRow;

                const container = draggedItem.parentNode;
                container.insertBefore(draggedItem, newTargetRow);
            } else if (!newTargetRow) {
                const container = draggedItem.parentNode;
                const allRows = container.querySelectorAll("tr.todo-items");
                const lastRow = allRows[allRows.length - 1];

                if (draggedItem !== lastRow) {
                    container.appendChild(draggedItem);
                }
            }
        });

        row.addEventListener("touchend", () => {
            clearTimeout(longPressTimer);
            if (Date.now() - dragStartTime < LONG_PRESS_DURATION) {
                return;
            }

            if (draggedItem) {
                clearTimeout(longPressTimer);
                updateTasksOrder();
                resetDragState();
            }
        });

        row.addEventListener("touchcancel", resetDragState);
    });
};

const updateTasksOrder = () => {
    const table = document.querySelector("#todo-tbody");
    const rows = table.querySelectorAll("tr.todo-items");

    const newOrder = [];
    rows.forEach((row) => {
        const taskId = row.dataset.id;
        const task = taskLocalList.find((t) => t.id === taskId);
        if (task) {
            newOrder.push(task);
        }
    });

    taskLocalList.splice(0, taskLocalList.length, ...newOrder);
    saveCurrentOrder();
};

document.addEventListener("DOMContentLoaded", () => {
    loadElements();
    displayTasks();
});

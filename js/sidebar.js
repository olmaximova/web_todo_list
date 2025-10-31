const createSidebar = () => {
    const nav = document.createElement("nav");
    nav.className = "sidebar";

    const header = document.createElement("header");
    header.className = "sidebarHeader";

    const logo = document.createElement("div");
    logo.className = "sidebarLogo";

    const logoText = document.createElement("div");
    logoText.textContent = "ToDo List";

    const logoImg = document.createElement("img");
    logoImg.src = "images/favicon.png";

    logo.append(logoImg, logoText);
    header.appendChild(logo);

    const menuBar = document.createElement("div");
    menuBar.className = "sidebarMenu";

    MENU_ITEMS.forEach((item) => menuBar.appendChild(createMenuItem(item)));

    nav.append(header, menuBar);
    createMenuToggle();
    return nav;
};

const createMenuItem = (element) => {
    const menuItem = document.createElement("div");
    menuItem.className = "sidebarMenuItem";
    menuItem.id = element.id;

    const menuIcon = document.createElement("img");
    menuIcon.className = "menuIcon";
    menuIcon.src = element.icon;

    const menuText = document.createElement("span");
    menuText.className = "menuText";
    menuText.textContent = element.text;

    menuItem.append(menuIcon, menuText);
    menuItem.addEventListener("click", () => handleMenuItemClick(element));

    return menuItem;
};

const handleMenuItemClick = (item) => {
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
    item.action();
};

const createMenuToggle = () => {
    const menuToggle = document.createElement("button");
    menuToggle.className = "menu-toggle";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); // попробовала вставить svg вместо png
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("height", "24px");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("width", "24px");
    svg.setAttribute("fill", "#000000");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
        "d",
        "M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
    );

    svg.appendChild(path);
    menuToggle.appendChild(svg);

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    document.body.prepend(overlay, menuToggle);

    menuToggle.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", closeSidebar);
};

const closeSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
};

const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
};

const createForm = () => {
    const taskForm = document.createElement("form");
    taskForm.id = "task-form";

    const taskInputGroup = document.createElement("div");
    taskInputGroup.className = "formElements";

    const taskLabel = document.createElement("label");
    taskLabel.setAttribute("for", "inputTask");
    taskLabel.textContent = "Enter a task:";

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.id = "inputTask";
    taskInput.setAttribute("autocomplete", "off");
    taskInput.setAttribute("required", "true");
    taskInput.placeholder = "Enter your task here";

    taskInputGroup.append(taskLabel, taskInput);

    const dateGroup = document.createElement("div");
    dateGroup.className = "formElements";

    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "inputDate");
    dateLabel.textContent = "Due Date:";

    const inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.id = "inputDate";
    inputDate.name = "task-date";
    inputDate.required = true;
    inputDate.setAttribute("autocomplete", "off");

    dateGroup.append(dateLabel, inputDate);

    const formButtons = document.createElement("div");
    formButtons.className = "form-buttons";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "btn-primary";
    submitButton.textContent = "Add Task";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "btn-secondary";
    cancelButton.textContent = "Cancel";

    formButtons.append(submitButton, cancelButton);
    taskForm.append(taskInputGroup, dateGroup, formButtons);

    cancelButton.addEventListener("click", closeModal);
    taskForm.addEventListener("submit", handleTaskSubmit);

    return taskForm;
};

const closeModal = () => {
    const modal = document.getElementById("add-task-modal");
    modal.style.display = "none";
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
};

const handleTaskSubmit = (event) => {
    event.preventDefault();
    addTask();
    closeModal();
};

const openAddTaskModal = () => {
    const modal = document.createElement("div");
    modal.className = "addTaskModal";
    modal.id = "add-task-modal";

    const modalInner = document.createElement("div");
    modalInner.className = "modalInner";

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Add New Task";

    const taskForm = createForm();
    modalInner.append(modalTitle, taskForm);
    modal.appendChild(modalInner);

    const body = document.querySelector("body");
    body.appendChild(modal);

    modal.style.display = "block";
};

let taskLocalList = JSON.parse(localStorage.getItem("taskLocalList")) || [];

const addTask = () => {
    const task = document.querySelector("#inputTask").value.trim();
    const date = document.querySelector("#inputDate").value;

    taskLocalList.push({
        id: Date.now().toString(),
        task: task,
        date: date,
        completed: false,
    });

    localStorage.setItem("taskLocalList", JSON.stringify(taskLocalList));
    displayTasks();
    document.querySelector("form").reset();
};

let searchVisible = JSON.parse(localStorage.getItem("searchVisible")) || false;

const createSearchModal = () => {
    const inputDiv = document.createElement("div");
    inputDiv.className = "inputGroup";

    const inputSearch = document.createElement("input");
    inputSearch.className = "searchTask";
    inputSearch.type = "search";
    inputSearch.placeholder = "Search Your Task Here";

    const cancelIcon = document.createElement("img");
    cancelIcon.src = "images/cancel.png";

    const table = document.querySelector("table");

    table.parentNode.insertBefore(inputDiv, table);
    inputDiv.append(inputSearch, cancelIcon);

    inputSearch.addEventListener("input", (e) => searchTasks(e.target.value));
    cancelIcon.addEventListener("click", closeSearchModal);
};

const closeSearchModal = () => {
    const inputDiv = document.querySelector(".inputGroup");
    inputDiv.remove();
    searchVisible = false;
    localStorage.setItem("searchVisible", JSON.stringify(searchVisible));
    displayTasks();
};

const openSearchModal = () => {
    const existingSearch = document.querySelector(".inputGroup");
    if (existingSearch) {
        existingSearch.remove();
        searchVisible = false;
        localStorage.setItem("searchVisible", JSON.stringify(searchVisible));
        return;
    }

    createSearchModal();

    searchVisible = true;
    localStorage.setItem("searchVisible", JSON.stringify(searchVisible));
};

function searchTasks(searchInpt) {
    const tableRows = document.querySelectorAll("tbody tr");

    tableRows.forEach((row) => {
        const taskArea = row.querySelector(".task-area");
        if (taskArea) {
            const rowText = taskArea.textContent.toLowerCase();
            const searchText = searchInpt.toLowerCase();
            row.classList.toggle("hide", rowText.indexOf(searchText) < 0);
        }
    });
}

// чтобы окно с поиском оставалось видимым после перезагрузки страницы (из localstorage подгружается статус)
const restoreSearchState = () => {
    if (searchVisible) {
        openSearchModal();
    }
};

const filterTasksByDate = (filterType) => {
    const tasksTable = document.getElementById("todo-tbody");
    const allRows = tasksTable.querySelectorAll(".todo-items");
    const today = new Date();
    today.setHours(0, 0, 0, 0); // тут устанавливаем время на полночь, чтобы сравнивать только сами даты

    allRows.forEach((row) => {
        const dateCell = row.querySelector(".task-date");
        const taskDate = new Date(dateCell.textContent);
        taskDate.setHours(0, 0, 0, 0); // тут тоже

        let shouldShow = false;

        switch (filterType) {
            case "view-all":
                shouldShow = true; // надо показать все
                break;
            case "view-expired":
                shouldShow = taskDate < today; // expired значит показывам уже прошедшие даты
                break;
            case "view-due-today":
                shouldShow = taskDate.getTime() === today.getTime(); // due-today значит показываем задачи на сегодня
                break;
            case "view-upcoming":
                shouldShow = taskDate > today; // upcoming значит показываем задания последующих дат
                break;
        }
        row.style.display = shouldShow ? "" : "none"; // делаем так чтобы показыались только необходимые таски
    });
};

const MENU_ITEMS = [
    {
        id: "add-task",
        text: "add task",
        icon: "images/add.png",
        action: openAddTaskModal,
    },
    {
        id: "search-task",
        text: "search for tasks",
        icon: "images/search.png",
        action: openSearchModal,
    },
    {
        id: "view-all",
        text: "all tasks",
        icon: "images/list.png",
        action: () => filterTasksByDate("view-all"),
    },
    {
        id: "view-due-today",
        text: "tasks due today",
        icon: "images/calendar_clock.png",
        action: () => filterTasksByDate("view-due-today"),
    },
    {
        id: "view-upcoming",
        text: "upcoming tasks",
        icon: "images/calendar_month.png",
        action: () => filterTasksByDate("view-upcoming"),
    },
    {
        id: "view-expired",
        text: "expired tasks",
        icon: "images/timer_off.png",
        action: () => filterTasksByDate("view-expired"),
    },
];

document.addEventListener("DOMContentLoaded", restoreSearchState);

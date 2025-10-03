const loadElements = () => {
    const main = document.createElement('main');
    document.querySelector('body').append(main);

    const section = document.createElement('section');
    main.append(section);

    const h1 = document.createElement('h1');
    h1.textContent = 'To Do List';
    section.append(h1);

    const form = document.createElement('form');
    section.append(form);

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'inputTask');
    input.setAttribute('placeholder', 'Enter a task');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('required', 'true');

    const inputDate = document.createElement('input');
    inputDate.setAttribute('type', 'date');
    inputDate.setAttribute('id', 'inputDate');
    inputDate.setAttribute('placeholder', 'Choose date');
    inputDate.setAttribute('autocomplete', 'off');
    inputDate.setAttribute('required', 'true');

    form.append(input);
    form.append(inputDate);

    const addButton = document.createElement('button');
    addButton.setAttribute('id', 'add-button');
    addButton.setAttribute('type', 'submit');
    
    const addImg = document.createElement('img');
    addImg.src = 'images/add.png';

    form.append(addButton);
    addButton.append(addImg);

    const table = document.createElement('table');
    table.setAttribute('id', 'todo-table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headers = ['№', 'Task', 'Date', 'Status', 'Actions', 'Mark Done'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.append(th);
    });

    thead.append(headerRow);
    table.append(thead);

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'todo-tbody');
    table.append(tbody);

    section.append(table);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addTask();
    });

}

let taskLocalList = JSON.parse(localStorage.getItem('taskLocalList')) || [];

const addTask = () => {
    const task = document.querySelector('#inputTask').value.trim();
    const date = document.querySelector('#inputDate').value;

    taskLocalList.push({
        id: Date.now().toString(),
        task: task,
        date: date,
        completed: false
    });

    localStorage.setItem('taskLocalList', JSON.stringify(taskLocalList));
    displayTasks();
    document.querySelector("form").reset();
}


const displayTasks = () => {
    const tasksTable = document.querySelector('#todo-tbody');

    // иначе некоторые задачи дублируются после того, как нажать на кнопку добавить
    while (tasksTable.firstChild) {
        tasksTable.removeChild(tasksTable.firstChild);
    }

    taskLocalList.forEach((element, index) => {

        const taskId = element.id;

        const row = document.createElement('tr');
        row.className = 'todo-items';
        row.dataset.id = element.id;

        const taskNumber = document.createElement('td');
        taskNumber.className = 'task-number';
        taskNumber.textContent = index + 1;

        const taskText = document.createElement('td');
        taskText.className = 'task-text';
        taskText.setAttribute('for', taskId)

        const textArea = document.createElement('textarea');
        textArea.className = 'task-area';
        textArea.disabled = true
        textArea.textContent = element.task;

        if (element.completed) {
            textArea.style.textDecoration = 'line-through';
        } 

        taskText.append(textArea);

        const taskDate = document.createElement('td');
        taskDate.className = 'task-date';
        taskDate.setAttribute('for', taskId)
        taskDate.textContent = element.date;

        const taskStatus = document.createElement('td');
        taskStatus.className = 'task-status';

        const statusLabel = document.createElement('label');
        statusLabel.setAttribute('for', taskId);
        statusLabel.textContent = element.completed ? 'Completed' : 'Pending'

        taskStatus.append(statusLabel);

        const taskActions = document.createElement('td');
        taskActions.className = 'task-actions';

        const deleteIcon = document.createElement('button');
        const deleteImg = document.createElement('img');
        deleteIcon.className = 'task-delete';
        deleteImg.src = 'images/delete.png';
        deleteIcon.append(deleteImg)

        deleteIcon.addEventListener('click', () => deleteTask(element.id));

        const editIcon = document.createElement('button');
        const editImg = document.createElement('img');
        editIcon.className = 'task-edit';
        editImg.src = 'images/edit.png';
        editIcon.append(editImg)

        const taskDoneTable = document.createElement('td');
        taskDoneTable.className = 'task-done';

        const inputCheckBox = document.createElement('input');
        inputCheckBox.setAttribute('type', 'checkbox')
        inputCheckBox.setAttribute('id', taskId);
        inputCheckBox.className = 'checkbox';
        inputCheckBox.checked = element.completed;

        inputCheckBox.addEventListener('change', () => taskDone(element.id))

        const doneIcon = document.createElement('label');
        doneIcon.setAttribute('for', taskId);
        const doneImg = document.createElement('img');
        doneIcon.className = 'check-done';
        doneImg.src = 'images/done.png';
        doneIcon.append(doneImg)

        taskDoneTable.append(inputCheckBox);
        taskDoneTable.append(doneIcon);

        taskActions.append(editIcon);
        taskActions.append(deleteIcon);

        row.append(taskNumber);
        row.append(taskText);
        row.append(taskDate);
        row.append(taskStatus);
        row.append(taskActions);
        row.append(taskDoneTable);

        tasksTable.append(row);
    });
}

const deleteTask = (taskId) => {
    taskLocalList = taskLocalList.filter(task => task.id !== taskId);
    localStorage.setItem('taskLocalList', JSON.stringify(taskLocalList));
    displayTasks();
}

const taskDone = (taskId) => {
    const taskIndex = taskLocalList.findIndex(task => task.id === taskId);
    if (taskLocalList[taskIndex].completed == false){
        taskLocalList[taskIndex].completed = true;
    } else{
        taskLocalList[taskIndex].completed = false;
    }
    localStorage.setItem('taskLocalList', JSON.stringify(taskLocalList));
    displayTasks();
}

document.addEventListener('DOMContentLoaded', () => {
    loadElements();
    displayTasks(); 
});
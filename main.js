const loadElements = () => {
    const main = document.createElement('main');
    const body = document.querySelector('body');

    const section = document.createElement('section');
    section.className = 'taskSection';

    const sidebar = createSidebar();

    const h1 = document.createElement('h1');
    h1.textContent = 'To Do List';
    
    let curDateTime = new Date().toDateString();
    const dateContainer = document.createElement('span');
    dateContainer.textContent = curDateTime;
    
    const form = document.createElement('form');
    form.style.display = 'none';

    const table = document.createElement('table');
    table.setAttribute('id', 'todo-table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'todo-tbody');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addTask();
    });

    body.append(main);
    body.append(sidebar);
    main.append(section);
    section.append(h1);
    section.append(dateContainer);
    section.append(form);
    section.append(table); 
    table.append(thead);
    thead.append(headerRow);
    const headers = ['№', 'Task', 'Date', 'Status', 'Actions', 'Mark Done'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        styleTableHeaders(th);
        headerRow.append(th);
    });
    table.append(tbody); 

    styleMain(main);
    styleBody(document.body);
    styleSection(section);
    styleH1(h1);
    styleDateSpan(dateContainer);
    styleForm(form);
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
        textArea.disabled = true;
        textArea.textContent = element.task;
        textArea.dataset.id = taskId;

        if (element.completed) {
            textArea.style.textDecoration = 'line-through';
        } 
        
        const taskDate = document.createElement('td');
        taskDate.className = 'task-date';
        taskDate.setAttribute('for', taskId)
        taskDate.textContent = element.date;
        taskDate.dataset.id = taskId;

        const taskStatus = document.createElement('td');
        taskStatus.className = 'task-status';

        const statusLabel = document.createElement('label');
        statusLabel.setAttribute('for', taskId);
        statusLabel.textContent = element.completed ? 'Completed' : 'Pending'

        const taskActions = document.createElement('td');
        taskActions.className = 'task-actions';

        const deleteIcon = document.createElement('button');
        const deleteImg = document.createElement('img');
        deleteIcon.className = 'task-delete';
        deleteImg.src = 'images/delete.png';
        
        deleteIcon.addEventListener('click', () => deleteTask(element.id));

        const editIcon = document.createElement('button');
        const editImg = document.createElement('img');
        editIcon.className = 'task-edit';
        editImg.src = 'images/edit.png';
        
        editIcon.addEventListener('click', () => editTaskDate(element.id));

        const taskDoneTable = document.createElement('td');
        taskDoneTable.className = 'task-done';

        const inputCheckBox = document.createElement('input');
        inputCheckBox.setAttribute('type', 'checkbox')
        inputCheckBox.setAttribute('id', taskId);
        inputCheckBox.className = 'checkbox';
        inputCheckBox.checked = element.completed;
        inputCheckBox.style.display = 'none'; 

        inputCheckBox.addEventListener('change', () => taskDone(element.id))

        const doneIcon = document.createElement('label');
        doneIcon.setAttribute('for', taskId);
        const doneImg = document.createElement('img');
        doneIcon.className = 'check-done';
        doneImg.src = 'images/done.png';

        if (!element.completed) {
            doneImg.style.display = 'none';
        } 

        taskText.append(textArea);
        taskStatus.append(statusLabel);
        deleteIcon.append(deleteImg);
        editIcon.append(editImg);
        doneIcon.append(doneImg);
        taskDoneTable.append(inputCheckBox, doneIcon);
        taskActions.append(editIcon, deleteIcon);
        row.append(taskNumber, taskText, taskDate, taskStatus,taskActions, taskDoneTable);
        tasksTable.append(row);

        [taskNumber, taskText, taskDate, taskStatus, taskActions, taskDoneTable].forEach(td => {
            styleTableCell(td);
        });
        styleActionsBtn(deleteIcon);
        styleActionsBtn(editIcon);
        styleCheckboxIcon(doneIcon, element.completed);
        styleStatusLabel(statusLabel, element.completed);
        styleTextArea(textArea);
    });
}

const deleteTask = (taskId) => {
    taskLocalList = taskLocalList.filter(task => task.id !== taskId);
    localStorage.setItem('taskLocalList', JSON.stringify(taskLocalList));
    displayTasks();
}


const editTaskDate = (taskId) => {
    const taskIndex = taskLocalList.findIndex(task => task.id === taskId);
    
    const textToChange = document.querySelector(`.task-area[data-id="${taskId}"]`);
    const dateToChange = document.querySelector(`.task-date[data-id="${taskId}"]`);
    
    if (textToChange.disabled) {
        textToChange.disabled = false;
        textToChange.focus();

        const currentDate = dateToChange.textContent;
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.value = currentDate;
        dateInput.className = 'date-to-edit';
        dateInput.dataset.id = taskId;
        dateToChange.replaceChildren(dateInput);
    } else {
        textToChange.disabled = true;
        taskLocalList[taskIndex].task = textToChange.value.trim();
        
        const dateInput = dateToChange.querySelector('.date-to-edit');
        if (dateInput) {
            taskLocalList[taskIndex].date = dateInput.value;
            dateTextValue = document.createTextNode(dateInput.value);
            dateToChange.replaceChildren(dateTextValue); 
        }
        
        localStorage.setItem('taskLocalList', JSON.stringify(taskLocalList));
        displayTasks();
    }
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
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
    
    const addImg = document.createElement('img');
    addImg.src = 'images/add.png';

    form.append(addButton);
    addButton.append(addImg);

    const ul = document.createElement('ul');
    ul.setAttribute('id', 'todo-list');
    section.append(ul);

    addButton.addEventListener('click', addTask);

}

const taskLocalList = JSON.parse(localStorage.getItem('taskLocalList')) || [];

const addTask = () => {
    const task = document.querySelector('#inputTask').value.trim();
    const date = document.querySelector('#inputDate').value;

    taskLocalList.push({
        task: task,
        date: date,
        completed: false
    });

    localStorage.setItem('taskLocalList', JSON.stringify(taskLocalList));
}


const displayTasks = () => {
    const taskList = document.querySelector('#todo-list');
    taskLocalList.forEach(element => {

        const taskId = Date.now().toString();

        const li = document.createElement('li');
        li.classList = 'todo-items';

        const inputCheckBox = document.createElement('input');
        inputCheckBox.setAttribute('type', 'checkbox')
        inputCheckBox.setAttribute('id', taskId);
        inputCheckBox.classList = 'checkbox';

        const doneIcon = document.createElement('label');
        const doneImg = document.createElement('img');
        doneIcon.classList = 'check-done';
        doneImg.src = 'images/done.png';
        doneIcon.append(doneImg)

        const taskText = document.createElement('label');
        taskText.classList = 'task-text';
        taskText.setAttribute('for', taskId)
        taskText.textContent = element.task;

        const taskDate = document.createElement('label');
        taskDate.classList = 'task-date';
        taskDate.setAttribute('for', taskId)
        taskDate.textContent = element.date;

        const deleteIcon = document.createElement('button');
        const deleteImg = document.createElement('img');
        deleteIcon.classList = 'task-delete';
        deleteImg.src = 'images/delete.png';
        deleteIcon.append(deleteImg)

        const editIcon = document.createElement('button');
        const editImg = document.createElement('img');
        editIcon.classList = 'task-edit';
        editImg.src = 'images/edit.png';
        editIcon.append(editImg)

        li.append(inputCheckBox, doneIcon, taskText, taskDate, editIcon, deleteIcon);
        taskList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadElements();
    displayTasks(); 
});
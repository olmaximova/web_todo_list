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

    const ul = document.createElement('ul');
    ul.setAttribute('id', 'todo-list');
    section.append(ul);

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
    const taskList = document.querySelector('#todo-list');

    // иначе некоторые задачи дублируются после того, как нажать на кнопку добавить
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    taskLocalList.forEach(element => {

        const taskId = element.id;;

        const li = document.createElement('li');
        li.className = 'todo-items';
        li.dataset.id = element.id;

        const inputCheckBox = document.createElement('input');
        inputCheckBox.setAttribute('type', 'checkbox')
        inputCheckBox.setAttribute('id', taskId);
        inputCheckBox.className = 'checkbox';

        inputCheckBox.addEventListener('change', () => taskDone(element.id))

        const doneIcon = document.createElement('label');
        const doneImg = document.createElement('img');
        doneIcon.className = 'check-done';
        doneImg.src = 'images/done.png';
        doneIcon.append(doneImg)

        const taskText = document.createElement('label');
        taskText.className = 'task-text';
        taskText.setAttribute('for', taskId)

        const textArea = document.createElement('textarea');
        textArea.className = 'task-area';
        textArea.disabled = true
        textArea.textContent = element.task;

        taskText.append(textArea);

        const taskDate = document.createElement('label');
        taskDate.className = 'task-date';
        taskDate.setAttribute('for', taskId)
        taskDate.textContent = element.date;

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

        li.append(inputCheckBox, doneIcon, taskText, taskDate, editIcon, deleteIcon);
        taskList.appendChild(li);
    });
}

const deleteTask = (taskId) => {
    taskLocalList = taskLocalList.filter(task => task.id !== taskId);
    localStorage.setItem('taskLocalList', JSON.stringify(taskLocalList));
    document.querySelector(`li[data-id="${taskId}"]`).remove();
}

const taskDone = (taskId) => {
    const taskIndex = taskLocalList.findIndex(task => task.id === taskId);
    if (taskLocalList[taskIndex].completed == false){
        taskLocalList[taskIndex].completed = true;
    } else{
        taskLocalList[taskIndex].completed = false;
    }
    localStorage.setItem('taskLocalList', JSON.stringify(taskLocalList));
}

document.addEventListener('DOMContentLoaded', () => {
    loadElements();
    displayTasks(); 
});
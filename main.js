const loadElements = () => {
    const main = document.createElement('main');
    document.querySelector('body').append(main);

    const section = document.createElement('section');
    document.querySelector('main').append(section);

    const h1 = document.createElement('h1');
    h1.textContent = 'To Do List';
    document.querySelector('section').append(h1);

    const form = document.createElement('form');
    document.querySelector('section').append(form);

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'inputTask');
    input.setAttribute('placeholder', 'Enter a task');
    input.setAttribute('autocomplete', 'off');

    const inputDate = document.createElement('input');
    inputDate.setAttribute('type', 'date');
    inputDate.setAttribute('id', 'inputDate');
    inputDate.setAttribute('placeholder', 'Choose date');
    inputDate.setAttribute('autocomplete', 'off');

    document.querySelector('form').append(input);
    document.querySelector('form').append(inputDate);

    const addButton = document.createElement('button');
    addButton.setAttribute('id', 'add-button');
    
    const addImg = document.createElement('img');
    addImg.src = 'images/add.png';

    document.querySelector('form').append(addButton);
    document.querySelector('#add-button').append(addImg);

    const ul = document.createElement('ul');
    ul.setAttribute('id', 'todo-list');
    document.querySelector('section').append(ul);

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

document.addEventListener('DOMContentLoaded', loadElements)
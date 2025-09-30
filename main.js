const loadElements = () => {
    const section = document.createElement('section');
    document.querySelector('body').append(section);

    const h1 = document.createElement('h1');
    h1.textContent = 'To Do List';
    document.querySelector('section').append(h1);

    const form = document.createElement('form');
    document.querySelector('section').append(form);

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Write anything you want to do');
    input.setAttribute('autocomplete', 'off');
    document.querySelector('form').append(input);

    const addButton = document.createElement('button');
    addButton.setAttribute('id', 'add-button');
    
    const addImg = document.createElement('img');
    addImg.src = 'images/add.png';

    document.querySelector('form').append(addButton);
    document.querySelector('#add-button').append(addImg);
}

document.addEventListener('DOMContentLoaded', loadElements)
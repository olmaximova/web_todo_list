const createSidebar = () => {
    const nav = document.createElement('nav');
    nav.className = 'sidebar';

    const header = document.createElement('header');
    header.className = 'sidebarHeader'

    const logo = document.createElement('div');
    logo.className = 'sidebarLogo'

    const logoText = document.createElement('div');
    logoText.textContent = 'ToDo List';

    const logoImg = document.createElement('img');
    logoImg.src = 'images/favicon.png';

    logo.append(logoImg, logoText);

    header.append(logo);

    const menuBar = document.createElement('div');
    menuBar.className = 'sidebarMenu';

    const menuItems = [
        { id: 'add-task', text: 'add task', icon: 'images/add.png'},
        { id: 'search-task', text: 'search task', icon: 'images/search.png' },
        { id: 'view-due-today', text: 'due today', icon: 'images/calendar_clock.png' },
        { id: 'view-upcoming', text: 'upcoming', icon: 'images/calendar_month.png' }, 
    ];

    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'sidebarMenuItem';
        menuItem.id = item.id;
        
        const menuIcon = document.createElement('img');
        menuIcon.className = 'menuIcon';
        menuIcon.src = item.icon;
        
        const menuText = document.createElement('span');
        menuText.className = 'menuText';
        menuText.textContent = item.text;
        
        menuItem.append(menuIcon, menuText);
        menuBar.append(menuItem);

        addMenuItemEventListeners(menuItem, item.id);
    });

    nav.append(header, menuBar);

    styleSidebar(nav);
    styleSidebarHeader(header);
    styleSidebarLogo(logo);
    styleSideBarImg(logoImg);
    styleSidebarMenu(menuBar);
    const menuItemElements = nav.querySelectorAll('.sidebarMenuItem');
    styleSidebarMenuItem(menuItemElements);
    return nav;
}

function addMenuItemEventListeners(menuItem, itemID){
    menuItem.addEventListener('click', () => {
        switch(itemID) {
            case 'add-task':
                openAddTaskModal();
                break;
            case 'search-task':
                openSearchModal();
                break;
            case 'view-due-today':
                showDueTodayTasks();
                break;
            case 'view-upcoming':
                showUpcomingTasks();
                break;
        }
    })
}

const openAddTaskModal = () => {
    const modal = document.createElement('div');
    modal.className = 'addTaskModal';
    modal.id = 'add-task-modal';
    
    const modalInner = document.createElement('div');
    modalInner.className = 'modalInner';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Add New Task';

    const taskForm = document.createElement('form');
    taskForm.id = 'task-form';
    
    const taskInputGroup = document.createElement('div');
    taskInputGroup.className = 'formElements';
    
    const taskLabel = document.createElement('label');
    taskLabel.setAttribute('for', 'inputTask');
    taskLabel.textContent = 'Enter a task:';
    
    const taskInput = document.createElement('input'); 
    taskInput.type = 'text';
    taskInput.id = 'inputTask';
    taskInput.setAttribute('autocomplete', 'off');
    taskInput.setAttribute('required', 'true');
    taskInput.placeholder = 'Enter your task here';
    
    taskInputGroup.append(taskLabel, taskInput);
    
    const dateGroup = document.createElement('div');
    dateGroup.className = 'formElements';
    
    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'inputDate');
    dateLabel.textContent = 'Due Date:';
    
    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    inputDate.id = 'inputDate';
    inputDate.name = 'task-date';
    inputDate.required = true;
    inputDate.setAttribute('autocomplete', 'off');
    
    dateGroup.append(dateLabel, inputDate);    

    const formButtons = document.createElement('div');
    formButtons.className = 'form-buttons';
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn-primary';
    submitButton.textContent = 'Add Task';
    
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'btn-secondary';
    cancelButton.id = 'cancel-btn';
    cancelButton.textContent = 'Cancel';
    
    formButtons.append(submitButton, cancelButton);
    taskForm.append(taskInputGroup, dateGroup, formButtons);
    modalInner.append(modalTitle, taskForm);
    modal.append(modalInner);

    const body = document.querySelector('body');
    body.append(modal);
    
    styleModal(modal);
    
    modal.style.display = 'block';
    
    cancelButton.addEventListener('click', closeModal);
    
    taskForm.addEventListener('submit', handleTaskSubmit);
    
    function closeModal(){
        modal.style.display = 'none';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }}, 300);
    }
    
    function handleTaskSubmit(event){
        event.preventDefault();
        addTask();
        closeModal();
    }
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

const openSearchModal = () =>{
    const inputDiv = document.createElement('div');
    inputDiv.className = 'inputGroup';

    const inputSearch = document.createElement('input');
    inputSearch.className = 'searchTask';
    inputSearch.type = 'search';
    inputSearch.placeholder = 'Search Your Task Here';

    const searchIcon = document.createElement('img');
    searchIcon.src = 'images/search.png';
    
    const table = document.querySelector('table');

    table.parentNode.insertBefore(inputDiv, table);
    inputDiv.append(inputSearch, searchIcon);

    inputSearch.addEventListener('input', function() {
        searchTasks(this.value);
    });
}

function searchTasks(searchInpt) {
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach((row) => {
        const taskArea = row.querySelector('.task-area');
        if (taskArea) {
            const rowText = taskArea.textContent.toLowerCase();
            const searchText = searchInpt.toLowerCase();
            row.classList.toggle('hide', rowText.indexOf(searchText) < 0);
        }
    });
}
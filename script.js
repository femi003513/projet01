document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const categoryInput = document.getElementById('categoryInput');
    const priorityInput = document.getElementById('priorityInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const searchInput = document.getElementById('searchInput');
    const searchTaskBtn = document.getElementById('searchTaskBtn');
    const taskList = document.getElementById('taskList');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close');
    const editInput = document.getElementById('editInput');
    const editCategoryInput = document.getElementById('editCategoryInput');
    const editPriorityInput = document.getElementById('editPriorityInput');
    const editDueDateInput = document.getElementById('editDueDateInput');
    const saveEditBtn = document.getElementById('saveEditBtn');

    let currentTask = null;

    addTaskBtn.addEventListener('click', addTask);
    searchTaskBtn.addEventListener('click', searchTasks);
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    saveEditBtn.addEventListener('click', saveEdit);

    function addTask() {
        const taskText = taskInput.value.trim();
        const categoryText = categoryInput.value.trim();
        const priorityText = priorityInput.value;
        const dueDateText = dueDateInput.value;

        if (taskText === '') {
            showError('Veuillez entrer une tâche valide.');
            return;
        }
        clearError();

        const taskItem = document.createElement('li');
        taskItem.className = 'task';

        const taskDetails = document.createElement('div');
        taskDetails.className = 'details';
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = `Tâche: ${taskText}`;
        const categorySpan = document.createElement('span');
        categorySpan.textContent = `Catégorie: ${categoryText}`;
        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = `Priorité: ${priorityText}`;
        const dueDateSpan = document.createElement('span');
        dueDateSpan.textContent = `Date Limite: ${dueDateText}`;
        
        taskDetails.appendChild(taskTextSpan);
        taskDetails.appendChild(categorySpan);
        taskDetails.appendChild(prioritySpan);
        taskDetails.appendChild(dueDateSpan);

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Compléter';
        completeBtn.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            completeBtn.style.display = 'none';
            alert('Tâche complétée');
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Modifier';
        editBtn.addEventListener('click', () => {
            currentTask = taskItem;
            editInput.value = taskText;
            editCategoryInput.value = categoryText;
            editPriorityInput.value = priorityText;
            editDueDateInput.value = dueDateText;
            modal.style.display = 'block';
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(taskDetails);
        taskItem.appendChild(completeBtn);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        taskInput.value = '';
        categoryInput.value = '';
        priorityInput.value = 'low';
        dueDateInput.value = '';
    }

    function searchTasks() {
        const searchText = searchInput.value.toLowerCase().trim();
        const tasks = document.querySelectorAll('.task');

        tasks.forEach(task => {
            const taskText = task.querySelector('.details span').textContent.toLowerCase();
            if (taskText.includes(searchText)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    }

    function saveEdit() {
        if (currentTask) {
            const taskDetails = currentTask.querySelector('.details');
            taskDetails.children[0].textContent = `Tâche: ${editInput.value}`;
            taskDetails.children[1].textContent = `Catégorie: ${editCategoryInput.value}`;
            taskDetails.children[2].textContent = `Priorité: ${editPriorityInput.value}`;
            taskDetails.children[3].textContent = `Date Limite: ${editDueDateInput.value}`;
            modal.style.display = 'none';
        }
    }

    function showError(message) {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = message;
    }

    function clearError() {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = '';
    }
    
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

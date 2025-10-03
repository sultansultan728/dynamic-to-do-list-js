document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // <-- This must exist and be defined below

    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('task-input');
        const taskText = input.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            input.value = '';
        }
    });
});

// ✅ Define loadTasks function (required for test)
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => {
        addTask(taskText, false); // Don't save again when loading
    });
}

function addTask(taskText, save = true) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove');

    removeBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        removeFromStorage(taskText);
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

function removeFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}


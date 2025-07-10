
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', addTask);

    function loadTasks() {
        chrome.storage.sync.get('tasks', function(data) {
            if (data.tasks) {
                data.tasks.forEach(task => {
                    addTaskToDOM(task);
                });
            }
        });
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            saveTask(task);
            taskInput.value = '';
        }
    }

    function addTaskToDOM(taskObj) {
        let task, done;
        if (typeof taskObj === "string") {
            task = taskObj;
            done = false;
        } else {
            task = taskObj.text;
            done = !!taskObj.done;
        }

        const listItem = document.createElement('li');
        listItem.style.display = 'flex';
        listItem.style.alignItems = 'center';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = done;
        checkbox.style.marginRight = '18px';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task;
        if (done) taskSpan.style.textDecoration = 'line-through';

        const removeButton = document.createElement('button');
        removeButton.textContent = '✖';
        removeButton.className = 'remove-task';
        removeButton.style.display = done ? 'inline-block' : 'none';
        removeButton.addEventListener('click', function() {
            removeTask(listItem, task);
        });

        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                taskSpan.style.textDecoration = 'line-through';
                removeButton.style.display = 'inline-block';
            } else {
                taskSpan.style.textDecoration = '';
                removeButton.style.display = 'none';
            }
            updateTaskDone(task, checkbox.checked);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    function saveTask(task) {
        chrome.storage.sync.get('tasks', function(data) {
            const tasks = data.tasks || [];
            tasks.push({ text: task, done: false });
            chrome.storage.sync.set({ tasks: tasks });
        });
    }

    function updateTaskDone(taskText, done) {
        chrome.storage.sync.get('tasks', function(data) {
            let tasks = data.tasks || [];
            tasks = tasks.map(t =>
                (typeof t === "string")
                    ? { text: t, done: done && t === taskText }
                    : (t.text === taskText ? { ...t, done } : t)
            );
            chrome.storage.sync.set({ tasks });
        });
    }

    function removeTask(listItem, taskText) {
        listItem.remove();
        chrome.storage.sync.get('tasks', function(data) {
            let tasks = data.tasks || [];
            tasks = tasks.filter(t => (typeof t === "string" ? t !== taskText : t.text !== taskText));
            chrome.storage.sync.set({ tasks });
        });
    }
});
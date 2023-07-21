// Fetch tasks from the server and display them
function getTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskTableElement = document.getElementById('task-table');
            taskTableElement.innerHTML = '';
            tasks.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.due_date}</td>
                    <td>
                        <select data-task-id="${task.id}" class="status-select">
                            <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="in progress" ${task.status === 'in progress' ? 'selected' : ''}>In Progress</option>
                            <option value="complete" ${task.status === 'complete' ? 'selected' : ''}>Complete</option>
                        </select>
                    </td>
                    <td>
                        <button class="delete-button" data-task-id="${task.id}">Delete</button>
                    </td>
                `;
                taskTableElement.append(row);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

// Add a new task
function addTask(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const newTask = {
        title,
        description,
        due_date: dueDate
    };
    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    })
        .then(response => getTasks())
        .catch(error => console.error('Error adding task:', error));
}

// Update a task
function updateTask(id, updatedTask) {
    fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
    })
        .then(response => getTasks())
        .catch(error => console.error('Error updating task:', error));
}

// Delete a task
function deleteTask(id) {
    fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    })
        .then(response => getTasks())
        .catch(error => console.error('Error deleting task:', error));
}

// Event listeners
document.querySelector('#task-form').addEventListener('submit', addTask);
document.querySelector('#task-table').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        deleteTask(event.target.dataset.taskId);
    }
});
document.querySelector('#task-table').addEventListener('change', function(event) {
    if (event.target.classList.contains('status-select')) {
        const id = event.target.dataset.taskId;
        const updatedTask = { status: event.target.value };
        updateTask(id, updatedTask);
    }
});

// Initial fetch of tasks
getTasks();

// handle fetching and displaying tasks from the backend server.
function getTasks() {
    // use the fetch() function to send a GET request to the /api/tasks endpoint on your backend server.
    fetch('/api/tasks')
    // Chain a .then() method to the fetch() function to handle the response from the server. Inside the .then() callback function, access the response data using the response.json() method and work with the retrieved tasks data.
    .then(response => response.json())
    // Use JavaScript DOM manipulation methods to dynamically generate HTML elements representing the task list and append them to the appropriate section in your HTML.
    .then(tasks => {
        const taskListElement = document.getElementById('task-list');   // get the task list element from the DOM
        
        // clear the existing task list
        taskListElement.innerHTML = '';
        // loop through the tasks array and create an HTML element for each task
        tasks.forEach(task => {
            // create a tr element
            const row = document.createElement('tr');   // tr element represents a row in an HTML table
            // create the date inside the row (title, description, due_date, status{pending, in progress, complete}) and delete button
            row.innerHTML = `
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.due_date}</td>
                <td>
                    <select data-task-id="${task.id}"> class="status-select">
                        <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="in progress" ${task.status === 'in progress' ? 'selected' : ''}>In Progress</option>
                        <option value="complete" ${task.status === 'complete' ? 'selected' : ''}>Complete</option>
                    </select>
                </td>
                <td>
                    <button class="delete-button" data-task-id="${task.id}">Delete</button>
                </td>
            `;
            taskListElement.append(row);    // append the row to the task list element
        });
    })
    // Chain a .catch() method to the fetch() function to handle any errors that occur during the request.
    .catch(error => {
        console.error('Error fatching tasks:', error);
    });
    
}

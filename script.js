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

// This function will handle the form submission event when a user adds a new task.
function addTask(event) {
    // Add an event listener to the form element in your HTML, listening for the submit event and calling the addTask() function when the event occurs.
    // Prevent the default form submission behavior using event.preventDefault().
    event.preventDefault();
    // Get the values from the form input elements using the .value property.
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    // Create a new task object using the values from the form.
    const newTask = {
        title,
        description,
        due_date: dueDate
    };
    // Use the fetch() function to send a POST request to the /api/tasks endpoint on your backend server. Pass the new task object as the second argument to the fetch() function.
    fetch('/api/tasks', {
        // The method is set to POST instead of GET because POST is used to create new resources on the server. while GET is used to retrieve existing resources.
        method: 'POST', // set the request method to POST (instead of the default GET). This tells the server that we are sending a new task to be created.
        headers: {  // set the request headers
            'Content-Type': 'application/json'  // tell the server that the request body is JSON
        },
        body: JSON.stringify(newTask)  // convert the new task object to JSON
    })
    // Chain a .then() method to the fetch() function to handle the response from the server. Inside the .then() callback function, call the getTasks() function to refresh the task list.
    .then(response => {
        getTasks();
    })
    // Chain a .catch() method to the fetch() function to handle any errors that occur during the request.
    .catch(error => {
        console.error('Error adding task:', error);
    });

}

// Add event listeners
document.querySelector('#task-form').addEventListener('submit', addTask);
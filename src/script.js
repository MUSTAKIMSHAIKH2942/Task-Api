document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
  
    // Function to fetch tasks from the backend and display them
    function fetchTasks() {
      fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
          taskList.innerHTML = '';
          tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <strong>${task.title}</strong> - ${task.description} (Priority: ${task.priority}, Due Date: ${task.due_date})
              <button class="delete-btn" data-id="${task.id}">Delete</button>
            `;
            taskList.appendChild(listItem);
          });
        });
    }
  
    // Initial fetch tasks
    fetchTasks();
  
    // Function to handle form submission
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = new FormData(taskForm);
      const title = formData.get('title');
      const description = formData.get('description');
      const priority = formData.get('priority');
      const due_date = formData.get('due_date');
  
      fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          due_date
        })
      })
      .then(response => response.json())
      .then(newTask => {
        fetchTasks();
        taskForm.reset();
      });
    });
  
    // Event listener to handle task deletion
    taskList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-btn')) {
        const taskId = event.target.getAttribute('data-id');
        fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE'
        })
        .then(() => fetchTasks());
      }
    });
  });
  
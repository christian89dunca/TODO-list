const taskInput = document.getElementById('task-input');
      const addTaskBtn = document.getElementById('add-task-btn');
      const taskList = document.getElementById('task-list');
      const footer = document.getElementById('footer-id');
      const modalPlaceholder = document.getElementById('insert-modal');


      let tasks = [];
      let id = 1;
      let confirmationValue = '';
      // Render tasks
      function renderTasks() {
        if (JSON.parse(localStorage.getItem('tasks'))?.length){
          tasks = JSON.parse(localStorage.getItem('tasks'));
        } else {
          tasks = [];
          id = 0;
        }
        if(tasks.length >= 2) {
          footer.innerHTML = `
          <div class="footer-container">
            <button class="remove-all-btn" onclick="removeAllTasks()">
              <span class="material-symbols-outlined">delete_forever</span>
            </button>
          </div>`
        } else {
          footer.innerHTML = ''
        }
        let taskItems = '';
        for (let i = 0; i < tasks.length; i++) {
          let task = tasks[i];
          taskItems += `
            <li>
              <span style="text-decoration: ${task.done ? 'line-through' : ''};text-decoration-thickness: 3px;">${task.text}</span>
              <button class="${task.done ? 'resume-btn' : 'done-btn'}" onclick="markTaskAsDone(${i})">${task.done ? 'Resume' : 'Done'}</button>
              <button class="edit-btn" onclick="editTask(${i})">
                <span class="size-edit-btn material-symbols-outlined">edit</span>
              </button>
              <button class="remove-btn" onclick="removeTask(${i})">
                <span class="size-remove-btn material-symbols-outlined">delete</span>
              </button>
            </li>
          `;
        }
        taskList.innerHTML = taskItems;
      }

      // function passModalValue(value) {
      //   if (value === 'yes'){
      //     modalPlaceholder.innerHTML = '';
      //     return true;
      //   }
      //   if (value === 'no'){
      //     modalPlaceholder.innerHTML = '';
      //     return false;
      //   }
      // };

      function confirmModal(text, value) {
        if(value === undefined){
          modalPlaceholder.innerHTML = `
          <div class="modal-background">
            <div class="modal-container">
              <div class="confirm-textarea">
                <h3>${text}?</h3>
              </div>
              <div class="confirm-btns">
                <button class="no-btn" onclick="confirmModal('',false)">No</button>
                <button class="yes-btn" onclick="confirmModal('',true)">Yes</button>
              </div>
            </div>
          </div>
          `
        } else {
          modalPlaceholder.innerHTML = ''
          return value;
        }
      }

      // Add task
      function addTask(event) {
        event.preventDefault();
        const text = taskInput.value.trim();
        id++;
        if (text !== '') {
          tasks.push({id: id, text: text, done: false});
          console.log(tasks)
          taskInput.value = '';
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        }
      }

      // Mark task as done
      function markTaskAsDone(index) {
        tasks[index].done = !tasks[index].done;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      }

      // Edit task
      function editTask(index) {
        const text = prompt('Edit task', tasks[index].text);
        if (text !== null) {
          tasks[index].text = text.trim();
          tasks[index].done = false;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        }
      }

      // Remove task
      function removeTask(index) {
        //adding a confirmation before deleting
        let doDelete = confirm('Are you sure you want to delete this task?');
        console.log(doDelete);
        if (doDelete) {
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        }
      }

      function removeAllTasks() {
        //adding a confirmation before deleting
        let firstConfirmationDeleteAll = confirm('Do you want to delete all tasks?')
        if (firstConfirmationDeleteAll) {
        let secondConfirmationDeleteAll = confirm('This action is irreversible \n Are you sure you want to DELETE ALL tasks?')
          if (secondConfirmationDeleteAll) {
            localStorage.clear();
            renderTasks();
          }
        }
      }
      // Add task event listener
      addTaskBtn.addEventListener('click', addTask);

      // Render initial tasks
      renderTasks();
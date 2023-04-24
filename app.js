
const taskInput = document.querySelector('.todo-add__task');
const addButton = document.querySelector('.todo-add__btn');
const incompleteTaskHolder = document.querySelector('.todo__list');
const completedTaskHolder = document.querySelector('.todo-completed__list');

const createNewTaskElement = (taskString) => {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');
  
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editButton.innerText = 'Edit';
  deleteButtonImg.src = './remove.svg';
  
  label.innerText = taskString;
  label.className = 'todo__item-label label';
  editInput.className = 'todo__item-input input task';
  editButton.className = 'todo__item-btn edit btn';
  deleteButton.className = 'todo__item-btn delete btn';
  deleteButton.appendChild(deleteButtonImg);
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
};

addButton.addEventListener('click', () => {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);
  taskInput.value = '';
});

const removeTask = (taskListItem) => {
  incompleteTaskHolder.removeChild(taskListItem);
};

const bindDeleteButton = (deleteButton) => {
  deleteButton.addEventListener('click', () => {
    const listItem = deleteButton.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
  });
};

const taskCompleted = (taskListItem) => {
  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  checkBox.checked = true;
  completedTaskHolder.appendChild(taskListItem);
};

const bindTaskEvents = (taskListItem) => {
  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const deleteButton = taskListItem.querySelector('.delete');
  const editButton = taskListItem.querySelector('.edit');
  const label = taskListItem.querySelector('.label');
  const editInput = taskListItem.querySelector('.input');
  
  checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
      taskCompleted(taskListItem);
    } else {
      incompleteTaskHolder.appendChild(taskListItem);
    }
  });
  
  deleteButton.addEventListener('click', () => {
    removeTask(taskListItem);
  });
  
  editButton.addEventListener('click', () => {
    if (editButton.innerText === 'Edit') {
      editInput.value = label.innerText;
      label.style.display = 'none';
      editInput.style.display = 'block';
      editButton.innerText = 'Save';
    } else {
      label.innerText = editInput.value;
      label.style.display = 'block';
      editInput.style.display = 'none';
      editButton.innerText = 'Edit';
    }
  });
  
  editInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      editButton.click();
    }
  });
};
  
  for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i]);
  }
  
  for (let i = 0; i < completedTaskHolder.children.length; i++) {
    bindTaskEvents(completedTaskHolder.children[i]);
  }
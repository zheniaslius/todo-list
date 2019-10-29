import {
  form, title, description, priority, hideForm,
} from './form';

/* eslint-disable linebreak-style */
(() => {
  let todos = [
    {
      id: 1,
      title: 'one',
      description: 'opa',
      done: false,
    },
  ];

  const updateTodoFields = (todo) => {
    const selectedTodoId = todo.getAttribute('id');
    const todoToUpdateIdx = todos.findIndex((todo) => todo.id === selectedTodoId);
    todos[todoToUpdateIdx] = {
      id: selectedTodoId,
      title: title.value,
      description: description.value,
      priority: priority.value,
    };
    todo.querySelector('.todo__title').textContent = title.value;
    todo.querySelector('.todo__description').textContent = description.value;
    todo.querySelector('.todo__priority').textContent = priority.value;
  };

  const todoAdd = (e) => {
    const selectedTodo = document.querySelector('.js-todo.selected');
    if (selectedTodo) {
      updateTodoFields(selectedTodo);
      selectedTodo.classList.remove('selected');
      hideForm(e);
      return;
    }
    if (title === '' || description === '' || priority === '') {
      alert('All fields are required');
      e.preventDefault();
      return;
    }

    const todo = {
      id: Date.now(),
      title: title.value,
      description: description.value,
      priority: priority.value,
      done: false,
    };
    todos.push(todo);

    const container = document.querySelector('.todos-container');
    container.insertAdjacentHTML('beforeend', `
      <div class="todos-container__todo js-todo" id=${todo.id}>
        <span class="todo__title">${title.value}</span>
        <span class="todo__description">${description.value}</span>
        <span class="todo__priority">${priority.value}</span>
        <div class="todo__action">...
          <ul class="actions-container">
            <li class="action" action="done">done</li>
            <li class="action" action="edit">edit</li>
            <li class="action" action="delete">delete</li>
          </ul>
        </div>
      </div>
    `);

    hideForm(e);
  };

  const todoDelete = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
    document.querySelector(`.js-todo[id="${id}"]`).remove();
  };

  const todoEdit = (id) => {
    form.classList.add('visible');
    document.querySelector(`.js-todo[id="${id}"]`).classList.add('selected');
    const selectedTodo = todos.find((item) => item.id === id);
    title.value = selectedTodo.title;
    description.value = selectedTodo.description;
    priority.value = selectedTodo.priority;
  };

  const todoDone = (id) => {
    const idx = todos.findIndex((item) => item.id === id);
    todos[idx].done = !todos[idx].done;
    todos.push(todos.splice(idx, 1)[0]);
    document.querySelector(`.js-todo[id="${id}"]`).classList.toggle('done');
  };

  const renderTodos = (todos) => {
    const container = document.querySelector('.todos-container');
    let result = '';
    todos.forEach((todo) => {
      result += `
      <div class="todos-container__todo js-todo" id=${todo.id}>
        <span class="todo__title">${todo.title}</span>
        <span class="todo__description">${todo.description}</span>
        <span class="todo__priority">${todo.priority}</span>
        <div class="todo__action">...
          <ul class="actions-container">
            <li class="action" action="done">done</li>
            <li class="action" action="edit">edit</li>
            <li class="action" action="delete">delete</li>
          </ul>
        </div>
      </div>`;
    });
    container.innerHTML = result;
  };

  const filterByTitle = (title) => todos.filter((todo) => todo.title.includes(title.toLowerCase()));
  const filterByActive = (active) => todos.filter((todo) => todo.done === (active === 'done'));
  const filterByPriority = (priority) => todos.filter((todo) => todo.priority === priority);

  const updateFilteredTodos = (valueName, value) => {
    const todos = {
      title: filterByTitle,
      type: filterByActive,
      priority: filterByPriority,
    }[valueName](value);
    renderTodos(todos);
  };

  document.querySelector('#filter-by-title').addEventListener('input', (e) => updateFilteredTodos('title', e.target.value));
  document.querySelector('#filter-by-type').addEventListener('change', (e) => updateFilteredTodos('type', e.target.value));
  document.querySelector('#filter-by-priority').addEventListener('change', (e) => updateFilteredTodos('priority', e.target.value));

  document.addEventListener('click', (e) => {
    const { target } = e;
    if (target.classList.contains('actions-container') || target.parentElement.classList.contains('actions-container')) {
      const action = target.getAttribute('action');
      const { id } = target.closest('.js-todo');

      // Function call depends on action type
      (() => ({
        done: todoDone,
        edit: todoEdit,
        delete: todoDelete,
      })[action](+id)
      )();
    }
  });

  form.addEventListener('submit', todoAdd);
})();

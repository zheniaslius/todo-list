import {
  form, title, description, priority, hideForm, showForm,
} from './form';
import { getTodoHTML } from './templates';

/* eslint-disable linebreak-style */
(() => {
  let todos = [];

  const renderTodos = (todos) => {
    const filtereByDone = todos.sort((a, b) => {
      if (a.done === b.done) return 0;
      if (a.done) return 1;
      return -1;
    });

    let result = '';
    filtereByDone.forEach((todo) => {
      const {
        id, title, description, priority, done,
      } = todo;
      result += getTodoHTML({
        id, title, description, priority, done,
      });
    });
    const container = document.querySelector('.todos-container');
    container.innerHTML = result;
  };

  const updateTodoFields = (todo) => {
    const selectedTodoId = todo.getAttribute('id');
    todos = todos.map((todo) => (todo.id === +selectedTodoId ? {
      ...todo,
      title: title.value,
      description: description.value,
      priority: priority.value,
    } : todo));
    renderTodos(todos);
  };

  const todoAdd = (e) => {
    const selectedTodo = document.querySelector('.js-todo.selected');
    if (selectedTodo) {
      updateTodoFields(selectedTodo);
      selectedTodo.classList.remove('selected');
      hideForm(e);
      return;
    }
    if (title.value === '' || priority.value === '') {
      alert('Title and priority are required');
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

    renderTodos(todos);
    hideForm(e);
  };

  const todoDelete = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
    document.querySelector(`.js-todo[id="${id}"]`).remove();
  };

  const todoEdit = (id) => {
    showForm();
    document.querySelector(`.js-todo[id="${id}"]`).classList.add('selected');
    const selectedTodo = todos.find((item) => item.id === id);
    title.value = selectedTodo.title;
    description.value = selectedTodo.description;
    priority.value = selectedTodo.priority;
  };

  const todoDone = (id) => {
    const idx = todos.findIndex((item) => item.id === id);
    todos[idx].done = !todos[idx].done;
    renderTodos(todos);
  };

  const filterTitle = document.querySelector('#filter-by-title');
  const filterType = document.querySelector('#filter-by-type');
  const filterPriority = document.querySelector('#filter-by-priority');

  const filterByTitle = (todo) => todo.title.includes(filterTitle.value.toLowerCase());
  const filterByActive = (todo) => {
    if (filterType.value === 'all') return true;
    return todo.done === (filterType.value === 'done');
  };
  const filterByPriority = (todo) => {
    if (filterPriority.value === 'all') return true;
    return todo.priority === filterPriority.value;
  };

  const filterTodos = () => {
    const result = todos
      .filter(filterByTitle)
      .filter(filterByActive)
      .filter(filterByPriority);
    renderTodos(result);
  };

  filterTitle.addEventListener('input', filterTodos);
  filterType.addEventListener('change', filterTodos);
  filterPriority.addEventListener('change', filterTodos);

  document.querySelector('.todos-container').addEventListener('click', (e) => {
    const { target } = e;
    if (target.classList.contains('actions-container') || target.parentElement.classList.contains('actions-container')) {
      target.closest('.actions-container').classList.remove('active');
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

    if (target.classList.contains('js-action')) {
      target.querySelector('.actions-container').classList.toggle('active');
    }
  });

  form.addEventListener('submit', todoAdd);
})();

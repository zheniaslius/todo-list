const getTodoHTML = ({
  id, title, description, priority, done,
}) => `
  <div class="todos-container__todo js-todo ${done ? 'done' : ''}" id=${id}>
    <span class="todo__tick ${done ? 'visible' : ''}">&#10004;</span>
    <span class="todo__title">${title}</span>
    <span class="todo__description">${description}</span>
    <div class="todo__footer">
        <span class="todo__priority">${priority}</span>
        <div class="todo__action js-action">...
          <ul class="actions-container">
            <li class="action" action="done">done</li>
            <li class="action" action="edit">edit</li>
            <li class="action" action="delete">delete</li>
          </ul>
        </div>
      </div>
  </div>
`;

export {
  getTodoHTML,
};

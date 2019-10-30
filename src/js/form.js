const form = document.querySelector('.js-form');
const title = form.querySelector('#title');
const description = form.querySelector('#description');
const priority = form.querySelector('#priority');
const background = document.querySelector('.background');
const clearFields = () => { [title, description, priority].forEach((field) => { field.value = ''; }); };

const showForm = () => {
  form.classList.add('visible');
  background.classList.add('active');
  clearFields();
};

const hideForm = (e) => {
  e.preventDefault();
  form.classList.remove('visible');
  background.classList.remove('active');
  clearFields();
};

document.querySelector('.js-create').addEventListener('click', showForm);
document.querySelector('.js-cancel').addEventListener('click', hideForm);

export {
  form,
  title,
  description,
  priority,
  hideForm,
  showForm,
};

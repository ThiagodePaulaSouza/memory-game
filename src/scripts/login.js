const input = document.querySelector(".login-input");
const button = document.querySelector(".login-button");
const form = document.querySelector('.login-form');

const validarInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute("disabled");
    return;
  }

  button.setAttribute("disabled", "");
};

input.addEventListener("input", validarInput);

const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem('player', input.value)
    window.location = '/src/pages/game.html'
}

form.addEventListener('submit', handleSubmit);
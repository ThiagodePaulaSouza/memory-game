const input = document.querySelector(".login-input");
const button = document.querySelector(".login-button");
const form = document.querySelector(".login-form");
const checkbox = document.querySelector("#checkbox");
const body = document.querySelector("body");
const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// switch system toggle dark/light theme
if (dark) {
  checkbox.checked = true;
  body.classList.add("dark");
  input.classList.add("dark");
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function (e) {
    const colorScheme = e.matches ? "dark" : "light";
    console.log(colorScheme);

    if (colorScheme === "dark") {
      checkbox.checked = true;
      body.classList.add("dark");
      input.classList.add("dark");
    } else {
      checkbox.checked = false;
      body.classList.remove("dark");
      input.classList.remove("dark");
    }
  });

// switch button toggle dark/light theme
checkbox.addEventListener("change", () => {
  body.classList.toggle("dark");
  input.classList.toggle("dark");
});

const validarInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute("disabled");
    return;
  }

  button.setAttribute("disabled", "");
};

input.addEventListener("input", validarInput);

const handleSubmit = (event) => {
  event.preventDefault();
  localStorage.setItem("player", input.value);
  window.location = "./src/pages/game.html";
};

form.addEventListener("submit", handleSubmit);

const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const body = document.querySelector("body");
const main = document.querySelector("main");

const characters = [
  "bmo",
  "death",
  "finn",
  "flameQueen",
  "gunter",
  "iceKing",
  "Jake",
  "lich",
  "marceline",
  "princessBubblegum",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");
  const modalEndGame = createElement("div", "modal");
  const modalEndGameTitle = createElement("div", "modal-title");
  const modalEndGameContent = createElement("div", "modal-content");
  const spanMenu = createElement("i", "fa-solid fa-house fa-2xl");
  const spanRestart = createElement(
    "i",
    "fa-solid fa-arrow-rotate-right fa-2xl"
  );
  const spanCredits = createElement("i", "fa-brands fa-github fa-2xl");
  const menu = document.createElement("a");
  const restart = document.createElement("a");
  const credits = document.createElement("a");
  menu.setAttribute("href", "../../index.html");
  menu.appendChild(spanMenu);
  restart.appendChild(spanRestart);
  credits.setAttribute("href", "https://github.com/thiagodepaulasouza/memory-game");
  credits.setAttribute("target", "_blank");
  credits.appendChild(spanCredits);

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    const FinishTime = timer.innerHTML;
    setTimeout(() => {
      body.insertBefore(modalEndGame, main);
      modalEndGame.appendChild(modalEndGameTitle);
      modalEndGame.appendChild(modalEndGameContent);
      modalEndGameTitle.innerHTML = `<span>Congratulations </span><span>${localStorage.getItem(
        "player"
      )} </span><span>You win in ${FinishTime}s</span>`;
      modalEndGameContent.appendChild(menu);
      modalEndGameContent
        .appendChild(restart)
        .addEventListener("click", () => location.reload());
      modalEndGameContent.appendChild(credits);
    }, 400);
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (
    target.parentNode.className.includes("reveal-card") ||
    target.parentNode.className.includes("grid")
  ) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);
  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  const playerName = localStorage.getItem("player");
  spanPlayer.innerHTML = playerName;
  startTimer();
  loadGame();
};

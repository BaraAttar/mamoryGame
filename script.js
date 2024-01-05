let cardsContainer = document.querySelector(".cards-container");
let notificationCard = document.querySelector(".notification-container");
let winningState = document.querySelector(".winning-state");
let start = document.getElementById("start");
let restart = document.getElementById("restart");
let cards = Array.from(cardsContainer.children);

let firstCard = null,
  secondCard = null,
  canClick = true,
  gameStarted = false,
  winScore = 0,
  tries = 0,
  seconds = 60,
  WinningState = null;

// Shuffle the cards
cardsRange = Array.from(Array(cards.length).keys());

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// timer
let isRunning = false;

function timer() {
  if (isRunning) {
    setTimeout(() => {
      let time = document.querySelector(".time");
      seconds--;
      time.innerHTML = seconds + "s";
      if (seconds === 0) {
        winningState.innerHTML = " نفذ الوقت";
        notificationCard.style.display = "block";
        isRunning = false;
      }
    }, 1000);

    setTimeout(() => {
      timer();
    }, 1000);
  }
}

// start the game

start.addEventListener("click", () => {
  notificationCard.style.display = "none";
  // if (!gameStarted) {
  (tries = 0), (seconds = 60), (isRunning = true), (winScore = 0);
  timer();
  gameStarted = true;
  setTimeout(() => {
    startGameFungtions();
  }, 500);
  cards.forEach((card) => {
    card.classList.remove("is-fipped");
  }); // }
});

// restart the game
restart.addEventListener("click", () => {
  // if (gameStarted == true) {
  (tries = 0), (seconds = 60), (winScore = 0);
  // to avoid cards flickering
  setTimeout(() => {
    startGameFungtions();
  }, 500);
  cards.forEach((card) => {
    card.classList.remove("is-fipped");
  });
  start.innerHTML = " اعادة اللعبة";
  // }
});

let startGameFungtions = () => {
  // Shuffle the cards
  shuffle(cardsRange);
  cards.forEach((card, index) => {
    card.style.order = cardsRange[index];
  });

  // first look flip

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.add("is-fipped");
      setTimeout(() => {
        card.classList.remove("is-fipped");
      }, 2000);
    });
  }, 500);

  // card clicked
  let trye = document.querySelector(".tries");
  trye.innerHTML = tries;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cardCliked(card);
    });
  });

  function cardCliked(card) {
    if (card.classList.contains("is-fipped")) return;
    if (!canClick) return;

    card.classList.add("is-fipped");

    if (!firstCard) {
      firstCard = card;
    } else if (!secondCard) {
      secondCard = card;
      tries++;
      trye.innerHTML = tries;
      canClick = false;

      if (firstCard.dataset.technology === secondCard.dataset.technology) {
        winScore++;
        console.log(winScore);
        firstCard = null;
        secondCard = null;
        setTimeout(() => {
          canClick = true;
        }, 1000);
      } else {
        setTimeout(() => {
          firstCard.classList.remove("is-fipped");
          secondCard.classList.remove("is-fipped");
          firstCard = null;
          secondCard = null;
          canClick = true;
        }, 1000);
      }

      // if all card filped
      if (winScore == 8) {
        isRunning = false;
        setTimeout(() => {
          winningState.innerHTML = " لعد ربحت ";
          notificationCard.style.display = "block";
        }, 1000);
      }
    }
  }
};

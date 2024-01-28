const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

let difficulty = "medium"; // Default difficulty level
let numCards = 16; // Default number of cards for medium difficulty

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == numCards / 2) {
      setTimeout(() => {
        displayWinMessage();
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  }
}

function displayWinMessage() {
  const message = document.createElement("div");
  message.innerText = "You Win!";
  message.classList.add("win-message");
  document.body.appendChild(message);
}
function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [];
  for (let i = 1; i <= numCards / 2; i++) {
    arr.push(i, i);
  }
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);
  cards.forEach((card, i) => {
    if (i < arr.length) {
      card.classList.remove("flip");
      let imgTag = card.querySelector(".back-view img");
      let cardIndex = (arr[i] - 1) % 8 + 1; // Adjust card index
      imgTag.src = `images/img-${cardIndex}.png`;
      card.addEventListener("click", flipCard);
      card.style.display = "block"; // Show the card
    } else {
      card.style.display = "none"; // Hide unused cards
    }
  });
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

function setDifficulty(selectedDifficulty) {
  difficulty = selectedDifficulty;
  if (difficulty === "easy") {
    numCards = 12;
  } else if (difficulty === "medium") {
    numCards = 16;
  } else if (difficulty === "hard") {
    numCards = 20;
  }
  shuffleCard();
}
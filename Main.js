const box = document.querySelectorAll(".tile");
const die1 = document.querySelector("#die1");
const die2 = document.querySelector("#die2");
const roll = document.querySelector("#roll");
const both = document.querySelector("#both");
const one = document.querySelector("#one");
const end = document.querySelector("#end");
const again = document.querySelector("#again");
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");

let choice = false;
let dice1 = new Dice();
let dice2 = new Dice();
let flipped = [];
let num = 0;

roll.addEventListener("click", rollBoth);
both.addEventListener("click", rollBoth);

function rollBoth() {
  shuffle(); // visual for dice roll

  // need two instances of Dice() so that they aren't sharing faces in
  // case result1 == result2
  const result1 = dice1.roll();
  const result2 = dice2.roll();

  console.log(result1 + 1, result2 + 1);

  num = result1 + result2 + 2;

  die1.replaceChildren(...dice1.faces[result1]);
  die2.replaceChildren(...dice2.faces[result2]);

  // force tile clicks
  roll.disabled = true;
  one.disabled = true;
  both.disabled = true;

  renderTiles();
}

one.addEventListener("click", () => {
  die2.style.display = "none";

  num = dice1.roll() + 1;
  die1.replaceChildren(...dice1.faces[num - 1]);

  one.disabled = true;
  both.disabled = true;

  renderTiles();
});

box.forEach((tile) =>
  tile.addEventListener("click", () => {
    num -= tile.id;
    tile.classList.add("flipped");
    tile.disabled = true;
    flipped.push(Number(tile.id));

    if (num === 0) {
      box.forEach((tile) => {
        if (!tile.classList.contains("flipped")) tile.disabled = true;
      });
      checkWin();

      if (!choice) checkChoice();

      roll.disabled = false;
      if (choice) {
        one.disabled = false;
        both.disabled = false;
        die2.style.display = "grid";
      }
    } else {
      renderTiles();
    }
  })
);

again.addEventListener("click", () => {
  die1.replaceChildren();
  die2.replaceChildren();

  roll.disabled = false;

  for (let i = 0; i < 9; i++) {
    box[i].classList.remove("flipped");
    box[i].disabled = false;
  }

  popup.style.display = "none";
  overlay.style.display = "none";
  one.style.display = "none";
  both.style.display = "none";
  roll.style.display = "inline";
  die2.style.display = "grid";

  num = 0;
  choice = false;
  flipped = [];
});

const renderTiles = () => {
  let useable = []; // tiles that aren't flipped
  let clickable = []; // tiles that can be used to equal num
  for (let i = 0; i < 9; i++) {
    if (!box[i].classList.contains("flipped")) {
      box[i].disabled = true; // assume tile won't work to start
      useable.push(box[i]);
    }
  }

  // enable viable tiles
  for (let i = 0; i < useable.length; i++) {
    let iID = parseInt(useable[i].id);
    if (iID === num) {
      useable[i].disabled = false;
      clickable.push(useable[i]);
    } else {
      // check for tiles to add to num
      let activate = numMatch(useable, num);
      for (let i = 0; i < useable.length; i++) {
        if (activate.includes(parseInt(useable[i].id))) {
          useable[i].disabled = false;
          clickable.push(useable[i]);
        }
      }
    }
  }

  if (!choice) checkChoice();

  if (clickable.length < 1) setTimeout(() => gameOver(), 500);
};

const checkChoice = () => {
  if (flipped.includes(9) && flipped.includes(8) && flipped.includes(7)) {
    choice = true;
    roll.style.display = "none";
    one.style.display = "inline";
    both.style.display = "inline";
  }
};

const shuffle = () => {
  let faces1 = [];
  let faces2 = [];

  for (let i = 0; i < 5; i++) {
    faces1.push(Math.floor(Math.random() * 6));
    faces2.push(Math.floor(Math.random() * 6));
  }

  for (let i = 0; i < 5; i++) {
    die1.replaceChildren(...dice1.faces[faces1[i]]);
    die2.replaceChildren(...dice2.faces[faces2[i]]);
  }
};

const gameOver = () => {
  overlay.style.display = "block";
  end.textContent = "Game Over";
  end.style.color = "var(--red)";
  popup.style.display = "block";
};

const checkWin = () => {
  for (let i = 0; i < 9; i++) {
    if (!box[i].classList.contains("flipped")) {
      return;
    }
  }
  win();
};

const win = () => {
  overlay.style.display = "block";
  end.textContent = "You Win!";
  end.style.color = "var(--green)";
  popup.style.display = "block";
};

const numMatch = (list, sum) => {
  let viable = [];
  for (let i = list.length - 1; i >= 0; i--) {
    let id = parseInt(list[i].id);
    if (id === sum) viable.push(id);
    else if (id < sum) {
      let tmp = numMatch(list.slice(0, i), sum - id);
      if (tmp.length > 0) {
        viable.push(id);
        viable.push(...tmp);
      }
    }
  }
  return viable;
};

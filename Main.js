const box = document.querySelectorAll(".tile");
const die1 = document.querySelector("#die1");
const die2 = document.querySelector("#die2");
const roll = document.querySelector("#roll");
const end = document.querySelector("#end");
const again = document.querySelector("#again");

let dice1 = new Dice();
let dice2 = new Dice();
let num = 0;

roll.addEventListener("click", () => {
    // need two instances of Dice() so that they aren't sharing faces in
    // case result1 == result2
    let result1 = dice1.roll();
    let result2 = dice2.roll();

    console.log(result1 +1, result2 +1);

    num = result1 + result2 + 2;

    die1.replaceChildren(...dice1.faces[result1]);
    die2.replaceChildren(...dice2.faces[result2]);

    // force tile clicks
    roll.disabled = true;

    renderTiles();

});


box.forEach((tile) => tile.addEventListener("click", () => {
    num -= tile.id;
    tile.classList.add("flipped");
    tile.disabled = true;

    if (num === 0) {
        for (let i = 0; i < 9; i++) {
            if (!box[i].classList.contains("flipped")) {
                box[i].disabled = false;
            }
        }

        roll.disabled = false;
    }
    else {
        renderTiles();
    }
}));

again.addEventListener("click", () => {
    die1.replaceChildren();
    die2.replaceChildren();

    roll.disabled = false;

    for (let i = 0; i < 9; i++) {
        box[i].classList.remove("flipped");
        box[i].disabled = false;
    }

    end.classList.add("clear");
    end.classList.remove("end");

    num = 0;
});

const renderTiles = () => {
    let useable = [];    // tiles that aren't flipped
    let clickable = [];  // tiles that can be used to equal num
    for (let i = 0; i < 9; i++) {
        if (!box[i].classList.contains("flipped")) {
            box[i].disabled = true;  // assume tile won't work to start
            useable.push(box[i]);
        }
    }

    // enable viable tiles
    for (let i = 0; i < useable.length; i++) {
        let iID = parseInt(useable[i].id);
        if (iID === num) {
            useable[i].disabled = false;
            clickable.push(useable[i]);
        }
        else {  // check for tiles to add to num
            for (let j = 0; j < useable.length; j++) {
                let jID = parseInt(useable[j].id);

                if (iID + jID === num) {
                    clickable.push(useable[i]);
                    clickable.push(useable[j]);
                    useable[i].disabled = false;
                    useable[j].disabled = false;
                }
            }
        }
    }

    if (clickable.length < 1)
        gameOver();
}

const gameOver = () => {
    // turn into pop-up in future
    end.classList.remove("clear");
    end.classList.add("end");
}
const box = document.querySelectorAll(".tile");
const die1 = document.querySelector("#die1");
const die2 = document.querySelector("#die2");
const roll = document.querySelector("#roll");

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

});


box.forEach((tile) => tile.addEventListener("click", () => {
    
}));
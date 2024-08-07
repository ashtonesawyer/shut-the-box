# shut-the-box
This is a web version of the single player variation of [Shut the Box](https://en.wikipedia.org/wiki/Shut_the_box).

## Rules
If 7, 8, and 9 are all flipped, the player may choose between rolling one or two dice. Otherwise, they must roll both.

Once the dice are rolled, total the value and then "shut" any of the open numbers that sum to the total value. For example, if the total is 8:
- 8
- 7, 1
- 6, 2
- 5, 3
- 5, 2 ,1
- 4, 3, 1

Re-roll until either it's not possible to reach the total (losing the game) or all of the tiles are flipped (winning the game)

## To-Do
- ~~Impliment single die choice~~
- Design:
    - Color (background, elements)
    - Animation (dice)
    - Contrast (button/tile states)
    - Proportions (size of dice box)
- How-to pop-up

## Possible Expansion
I would like to add an option to play against a bot. This would involve:
- Adding a scoring system to name a winner if neither shut the box
- Changing the UI
    - Option to switch between the multi/single player modes
    - For 2-player mode: make room for a second set of tiles
- Writing a bot algorithm

## Use
The site it hosted at <https://ashtonesawyer.github.io/shut-the-box>

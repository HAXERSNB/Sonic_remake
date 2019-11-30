let firstButton = document.getElementById('first-button');
let firstScreen = document.getElementById('first-screen');
let secondButton = document.getElementById('second-button');
let secondScreen = document.getElementById('second-screen');
let startGameButton = document.getElementById('start-game-button');
let gameScreen = document.getElementById('game-screen');

function hideSecondAndThird() {
  secondScreen.style.display = 'none';
  gameScreen.style.display = 'none'
}

firstButton.onclick = () => {
  secondScreen.style.display = '';
  firstScreen.style.display = 'none';
}

secondButton.onclick = () => {
  secondScreen.style.display = 'none';
  gameScreen.style.display = ''
}

startGameButton.onclick = () => {
  game.startGame();
  startGameButton.disabled = 'true'
}

// firstButton.onclick = () => {
//   firstScreen.style.display = 'none';
//   for (let i = 0; i < gameScreen.length; i++) {
//     gameScreen[i].style.display = 'block'
//   }
// }

let game = new Sonic1P(canvas, sonicBg);
// game.startGame();
//
//
//
// l
//
// let singleP = document.getElementById('single-player');
//
// homeScreen.onClick = () => {
//   hideHomeScreen()
// };
//
// function hideHomeScreen() {
//   homeScreen.style.display = 'none';
// }
//
// singleP.onclick = () => {
//   game.startGame();
//   hideButton()
// }
//
// function hideButton() {
//   singleP.style.display = 'none';
// }

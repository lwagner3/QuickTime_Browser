let timeLeft = 3;
let timer = document.getElementById('timer');
let timerInterval = setInterval(countdown, 1000);


timer.innerHTML = timeLeft;

// function countdown() {
//   timeLeft--;
//   if (timeLeft==0) {
//     clearInterval(timerInterval);

//     // timer.innerHTML = "YOU LOSE";

//   let removing = browser.windows.remove(
//     browser.windows.WINDOW_ID_CURRENT
//   );

//   } else {
//     timer.innerHTML = timeLeft;
//   }
// }

// document.getElementById("stopID").addEventListener("click", function() {
// 	clearInterval(timerInterval);
//   window.close();
// });

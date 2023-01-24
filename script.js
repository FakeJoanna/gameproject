//timer function
let timeLeft = 30;
let timer = document.getElementById("actualTime");
let timerId
let fired = false;

document.onkeydown = function () {
    if (fired === false) {
        document.getElementById("timer").innerText = "Timer:";
        timerId = setInterval(timerCountdown, 1000);
        fired = true;
    }
}

function timerCountdown() {
    if (timeLeft == -1) {
        clearInterval(timerId);
        //game over splash screen
    }

    else {
        timer.innerHTML = timeLeft.toString() + "s";
        timeLeft--;
    }
}

/* speed functionality
standard speed 3 - 10
*/

let speedMultiplier = 1;
document.getElementById("speedMult").defaultValue = 1;
document.getElementById("speedMult").addEventListener("change", updateValue)

function updateValue() {
    speedMultiplier = 1/document.getElementById("speedMult").value;
    reroll();
}

function randomSpeed() {
    return (((Math.random() * 7) + 3) * speedMultiplier);
}

//get array of nodes with .crabTop class and iterate over them applying a random speed
let crabsDownwards = [...document.querySelectorAll(".crabTop")];

function rerollCrabsDownwards() {
    crabsDownwards.forEach(i => i.style.animationDuration = randomSpeed().toString() + "s");
    return;
}

let crabsUpwards = [...document.querySelectorAll(".crabBottom")];

function rerollCrabsUpwards() {
    crabsUpwards.forEach(i => i.style.animationDuration = randomSpeed().toString() + "s");
    return;
}

//reroll button functionality
function reroll () {
    rerollCrabsDownwards();
    rerollCrabsUpwards();
    clearInterval(timerId);
    fired = false;
    timeLeft = 30;
}

document.getElementById("reroll").onclick = reroll;

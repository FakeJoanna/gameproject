//timer and game state initial flags

let timeLeft = 30;
let timer = document.getElementById("timer");
let timerId
let fired = false;

//this function flags game start

document.onkeydown = function gameStart () {
    if (fired === false) {
        timerId = setInterval(timerCountdown, 1000);
        fired = true;
    }
}

//this function controls the timer

function timerCountdown() {
    if (timeLeft == -1) {
        clearInterval(timerId);
        //game over splash screen
    }

    else {
        timer.innerHTML = `Timer: ${timeLeft}s`
        timeLeft--;
    }
}

//ship code



let ship = document.getElementById("ship");

ship.style.top

let shipPosition = {
    x: ship.getBoundingClientRect().x,
    y: ship.getBoundingClientRect().y,
}
let moveRate = 10;

function updatePostion(offset) {
    shipPosition.x += offset;
    shipPosition.y += offset;
}




//this function calculates a random speed/animation duration between 3 and 10 seconds

function randomSpeed() {
    return (((Math.random() * 7) + 3) * speedMultiplier);
}

//this function handles speed mutiplier for randomSpeed

let speedMultiplier = 1;
document.getElementById("speedMult").defaultValue = 1;
document.getElementById("speedMult").addEventListener("change", updateValue)

function updateValue() {
    speedMultiplier = 1/document.getElementById("speedMult").value;
    reroll();
}

/*this function queries all elements with animation classes
and randomises them calling on randomSpeed*/

let crabsDownwards = [...document.querySelectorAll(".animateDownwards")];
let crabsUpwards = [...document.querySelectorAll(".animateUpwards")];

function reCalculateAnimationDuration () {
    crabsDownwards.forEach(i => i.style.animationDuration = randomSpeed().toString() + "s");
    crabsUpwards.forEach(i => i.style.animationDuration = randomSpeed().toString() + "s");
}


//this function calls on reCalculateAnimationDuration and resets the timer

function reroll () {
    reCalculateAnimationDuration();
    timer.innerHTML = "Press any key"
    clearInterval(timerId);
    fired = false;
    timeLeft = 30;
    alert(1);
}

document.getElementById("reroll").onclick = reroll; //<---- weird bug

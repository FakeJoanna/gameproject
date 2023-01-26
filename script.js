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



let ship = document.querySelector("#ship");

let shipPosition = {
    x: 0,
    y: -3,
}
document.addEventListener("keydown", (keypress) => {

    console.log(shipPosition)

    switch (keypress.key) {
        case "ArrowUp":
            shipPosition.y -= 3;
            break;
        case "ArrowDown":
            shipPosition.y += 3;
            break;
        case "ArrowLeft":
            shipPosition.x -= 10;
            break;
        case "ArrowRight":
            shipPosition.x += 10;
            break;
    }

    console.log(shipPosition)
    
    if (shipPosition.x > 90) {
        shipPosition.x -= 10;
        return;
    }

    else if (shipPosition.x < 0) {
        shipPosition.x += 10;
        return;
    }

    else if (shipPosition.y > 57) {
        shipPosition.y -= 3;
    }

    else if (shipPosition.y < -3) {
        shipPosition.y += 3;
    }
    
    ship.style.top = `${shipPosition.y}vh`;
    ship.style.left = `${shipPosition.x}%`
});




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

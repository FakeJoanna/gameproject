//timer and game state initial flags

let timeLeft = 30;
let timer = document.getElementById("timer");
let timerId
let fired = false;

//this function flags game start

document.onkeydown = function gameStart () {
    if (fired === false) {
        reCalculateAnimationDuration();
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
    switch (keypress.key) {
        case "ArrowUp":
            shipPosition.y -= 1.5;
            break;
        case "ArrowDown":
            shipPosition.y += 1.5;
            break;
        case "ArrowLeft":
            shipPosition.x -= 10;
            break;
        case "ArrowRight":
            shipPosition.x += 10;
            break;
    }

//hack boundary code

    if (shipPosition.x > 90) {
        shipPosition.x -= 10;
    }

    else if (shipPosition.x < 0) {
        shipPosition.x += 10;
    }

    else if (shipPosition.y > 57) {
        shipPosition.y -= 1.5;
    }

    else if (shipPosition.y < -3) {
        shipPosition.y += 1.5;
    }
    
    ship.style.top = `${shipPosition.y}vh`;  
    ship.style.left = `${shipPosition.x}%`
});

 
//code for spawning 3 projectiles where ship is located

let bomb1 = document.createElement("img");
bomb1.setAttribute("src", "/images/placerholderbomb.png");
bomb1.classList.add("bomb");
let bomb1Fired = false;

let bomb2 = document.createElement("img");
bomb2.setAttribute("src", "/images/placerholderbomb.png");
bomb2.classList.add("bomb");
let bomb2Fired = false;

let bomb3 = document.createElement("img");
bomb3.setAttribute("src", "/images/placerholderbomb.png");
bomb3.classList.add("bomb");
let bomb3Fired = false;

document.addEventListener("keyup", (keypress) => {
    if (keypress.key === " ") {
        if (bomb1Fired === false) {
            bomb1Fired = true
            bomb1.style.top = `${shipPosition.y}vh`;
            bomb1.style.left = `${shipPosition.x}%`;
            document.getElementById("gameTable").appendChild(bomb1);
            bomb1.addEventListener("animationend", () => {
            bomb1.remove();
            bomb1Fired = false;
            })
        }
        
        else if (bomb2Fired === false) {
            bomb2Fired = true
            bomb2.style.top = `${shipPosition.y}vh`;
            bomb2.style.left = `${shipPosition.x}%`;
            document.getElementById("gameTable").appendChild(bomb2);
            bomb2.addEventListener("animationend", () => {
            bomb2.remove();
            bomb2Fired = false;
            })
        }

        else if (bomb3Fired === false) {
            bomb3Fired = true
            bomb3.style.top = `${shipPosition.y}vh`;
            bomb3.style.left = `${shipPosition.x}%`;
            document.getElementById("gameTable").appendChild(bomb3);
            bomb3.addEventListener("animationend", () => {
            bomb3.remove();
            bomb3Fired = false;
            })
        }
    }
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

function reCalculateAnimationDuration() {
    crabsDownwards.forEach(i => i.style.animationDuration = randomSpeed().toString() + "s");
    crabsUpwards.forEach(i => i.style.animationDuration = randomSpeed().toString() + "s");
}


//this function calls on reCalculateAnimationDuration and resets the timer

function reroll() {
    /*
    reCalculateAnimationDuration();
    timer.innerHTML = "Press any key"
    clearInterval(timerId);
    fired = false;
    timeLeft = 30; 
    */
    location.reload();
}

let rerollButton = document.getElementById("reroll")
rerollButton.addEventListener("click", () => {
    rerollButton.blur();
    reroll();
})
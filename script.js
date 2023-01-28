//timer and game state initial flags

let timeLeft = 100;
let timer = document.getElementById("timer");
let timerId
let fired = false;
let crabsDownwards = [...document.querySelectorAll(".animateDownwards")];
let crabsUpwards = [...document.querySelectorAll(".animateUpwards")];

//this function flags game start

document.onkeydown = function gameStart () {
    if (fired === false) {
        crabsDownwards.forEach(i => i.style.animationDelay = "1s");
        crabsUpwards.forEach(i => i.style.animationDelay = "1s")
        reCalculateAnimationDuration();
        timerId = setInterval(timerCountdown, 1000);
        fired = true;
    }
}

//game over fuction

function gameOver() {
    document.getElementById("lose").innerHTML = "Game Over";
    document.getElementById("lose").classList.add("loseScreen")
}

//this function controls the timer

function timerCountdown() {
    if (timeLeft == -1) {
        clearInterval(timerId);
        gameOver();
    }

    else {
        timer.innerHTML = `Timer: ${timeLeft}s`
        timeLeft--;
    }
}

//game win

let crabs = [...document.getElementsByClassName("crabBottom")].concat([...document.getElementsByClassName("crabTop")])

setInterval(WinCheck, 500);

function WinCheck() {
    let crabs = [...document.getElementsByClassName("crabBottom")].concat([...document.getElementsByClassName("crabTop")])
    if (crabs.length === 0) {
        document.getElementById("win").innerHTML = "You win!";
        document.getElementById("win").classList.add("winScreen");
        clearInterval(timerId);
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
bomb1.setAttribute("src", "./images/bomb.png");
bomb1.classList.add("bomb");
let bomb1Fired = false;

let bomb2 = document.createElement("img");
bomb2.setAttribute("src", "./images/bomb.png");
bomb2.classList.add("bomb");
let bomb2Fired = false;

let bomb3 = document.createElement("img");
bomb3.setAttribute("src", "./images/bomb.png");
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


//overlap function - collision

bomb1.addEventListener("animationstart", () => {
    let bomb1Bound = bomb1.getBoundingClientRect();
    setTimeout(() => {
        for (let i = 0; i < crabs.length; i++) {
            let crabBound = crabs[i].getBoundingClientRect();
            if (bomb1Bound.right > crabBound.left && bomb1Bound.left < crabBound.right && bomb1Bound.bottom > crabBound.top && bomb1Bound.top < crabBound.bottom === true) {
                crabs[i].remove();
                return;
            }                       
        }
    }, 1000);
})

bomb2.addEventListener("animationstart", () => {
    let bomb2Bound = bomb2.getBoundingClientRect();
    setTimeout(() => {
        for (let i = 0; i < crabs.length; i++) {
            let crabBound = crabs[i].getBoundingClientRect();
            if (bomb2Bound.right > crabBound.left && bomb2Bound.left < crabBound.right && bomb2Bound.bottom > crabBound.top && bomb2Bound.top < crabBound.bottom === true) {
                crabs[i].remove()
                return;
            }                       
        }
    }, 2500);
})

bomb3.addEventListener("animationstart", () => {
    let bomb3Bound = bomb3.getBoundingClientRect();
    setTimeout(() => {
        for (let i = 0; i < crabs.length; i++) {
            let crabBound = crabs[i].getBoundingClientRect();
            if (bomb3Bound.right > crabBound.left && bomb3Bound.left < crabBound.right && bomb3Bound.bottom > crabBound.top && bomb3Bound.top < crabBound.bottom === true) {
                crabs[i].remove();
                return;
            }                       
        }
    }, 1000);
})


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
    reCalculateAnimationDuration();
}

/*this function queries all elements with animation classes
and randomises them calling on randomSpeed*/

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
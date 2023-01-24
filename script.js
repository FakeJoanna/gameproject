/* Standard speed of the crabs shall be 3 - 10 */
function randomSpeed() {
    return (((Math.random() * 7) + 3));
}

//get array of nodes with .crabTop class and iterate over them applying a random speed
let crabsDownwards = [...document.querySelectorAll(".crabTop")];
crabsDownwards.forEach(i => i.style.animationDuration = randomSpeed().toString() + "s");

let crabsUpwards = [...document.querySelectorAll(".crabBottom")];
crabsUpwards.forEach(i => i.style.animationDuration = randomSpeed().toString() + "s");


import TicTacToe from './dist/tic-tac-toe';

function my_reset() {
    alert("Reset Button!");
    document.querySelectorAll('.my-button').forEach(
        t => {
    
            t.style.background = "none";
            t.disabled= false;
            t.onmouseenter = function () { t.style.backgroundColor = "#eaeaea";};
            t.onmouseleave = function () { t.style.background = "none";};
        });

    //reset match
}

function addImage (button, image, size) {
    button.style.background = `url(${image})`;
    button.style.backgroundSize = size;
    button.style.backgroundRepeat = "no-repeat";
    button.style.backgroundPosition = "center";
    button.disabled = true;
}
 
function putX(button) {
    addImage(button, "./images/X.png", "50% 80%");
}

function putO (button) {
    addImage(button, "./images/O.png", "70% 90%");
}

function addBtnList (func) {
    document.querySelectorAll('.my-button').forEach(
        it => {
            if(!it.disabled)
                it.addEventListener("click", () => func(it))
        }
        
   )
}

//MAIN LOOP

function loop () {
    //console.log(`counter = ${counter}`);
    if(tic_tac_toe.player()) {
        addBtnList(putX);
    }
    else {
        addBtnList(putO);
    }
    counter++;
}

//INIT

//var counter = 0;
var tic_tac_toe = new TicTacToe();

document.addEventListener('DOMContentLoaded', 
() => {
        document.querySelectorAll('.my-button').forEach(
            it => it.addEventListener("click", loop)
        );
        loop();
    }
);

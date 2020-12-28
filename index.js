import TicTacToe from './dist/tic-tac-toe.js';

function my_reset() {
    alert("Reset Button!");
    document.querySelectorAll('.my-button').forEach(
        t => {
    
            t.style.background = "none";
            t.disabled= false;
            t.onmouseenter = function () { t.style.backgroundColor = "#eaeaea";};
            t.onmouseleave = function () { t.style.background = "none";};
        });

        tic_tac_toe = new TicTacToe();
}

function my_hint () {
}


function addImage (button, image, size) {
    button.style.background = `url(${image})`;
    button.style.backgroundSize = size;
    button.style.backgroundRepeat = "no-repeat";
    button.style.backgroundPosition = "center";
    button.disabled = true;
    tic_tac_toe.put(parseInt(button.id, 10));
}
 
function putX(button) {
    addImage(button, "./images/X.png", "50% 80%");
}

function putO (button) {
    addImage(button, "./images/O.png", "70% 90%");
}

const my_func = (func, x) => () => func(x);


function addBtnList (func) {
    document.querySelectorAll('.my-button').forEach(
        it => {
            if(!it.disabled)
                it.addEventListener("click", my_func(func, it));
        }
        
   )
}

function rmvBtnList(func) {
    document.querySelectorAll('.my-button').forEach(
        it => {
            if(!it.disabled)
                it.removeEventListener("click", my_func(func, it));
        }      
   )
}

//MAIN LOOP

function loop () {
    if(!tic_tac_toe.is_over()) {
        if(tic_tac_toe.player() === 0) {
            addBtnList(putX);
        }
        else {
            addBtnList(putO);
        }
    }
    else {
        let t = tic_tac_toe.util(tic_tac_toe.winner()) === 1 ? "X" : "O";
        alert(`Player ${t} has won the game!`);
        rmvBtnList(t === "X" ? putX: putO);
    }
}

//INIT


var tic_tac_toe = new TicTacToe();

document.addEventListener('DOMContentLoaded', 
() => {
    document.getElementById('rst-btn').onclick = my_reset;
    document.getElementById('hnt-btn').onclick = my_hint;
        let i = 0;
        document.querySelectorAll('.my-button').forEach(
            it => {
                it.addEventListener("click", loop);
                it.id = i++;
            }
        );
        loop();
    }
);

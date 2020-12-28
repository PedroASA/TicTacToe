import TicTacToe from './dist/tic-tac-toe.js';

function my_reset() {
    alert("Reset Button!");
    $(' .my-button').each(
        function() {
            this.style.background = "none";
            this.disabled= false;
            $( this ).on("mouseenter", function () { this.style.backgroundColor = "#eaeaea";});
            $( this ).on("mouseleave",function () { this.style.background = "none"; });
            //$( this ).off(onclick);
        }
    )
        
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

    if(!tic_tac_toe.is_over()) {
        let t = tic_tac_toe.util(tic_tac_toe.winner()) === 1 ? "X" : "O";
        alert(`Player ${t} has won the game!`);
        rmvBtnList();
    }
}
 
function putX() {
    addImage(this, "./images/X.png", "50% 80%");
    addBtnList(putO);

}

function putO () {
    addImage(this, "./images/O.png", "70% 90%");
    addBtnList(putX);
}

function inv(f) {
    if(f === "putO") 
        putX;
    else
        putO;
}

function addBtnList (func) {
    $('.my-button').each(
        function () {
            $( this ).off("click", inv(`${func}`));
            if(!this.disabled)
                $( this ).on("click", func);
        }
        
   )
}


function rmvBtnList() {
    $('.my-button').each(
        function () {
            if(!this.disabled) {
                $( this ).off();
                this.disabled = true;
            }
        }      
    )
}

//INIT


var tic_tac_toe = new TicTacToe();


document.addEventListener('DOMContentLoaded', 
() => {
    document.getElementById('rst-btn').onclick = my_reset;
    document.getElementById('hnt-btn').onclick = my_hint;
        let i = 0;
        $('.my-button').each(
            function () {
                $( this ).id = i++;
            }
        );

        addBtnList(putX);
    }
);

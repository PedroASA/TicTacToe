import Board from './dist/board.js';

function my_reset() {
    alert("Reset Button!");
    $(' .my-button').each(
        function() {
            this.style.background = "none";
            this.disabled= false;
            $( this ).on("mouseenter", function () { this.style.backgroundColor = "#eaeaea";});
            $( this ).on("mouseleave",function () { this.style.background = "none"; });
        }
    )
        
    init();
    board = new Board();
    // addBtnList(putX);
}

function my_hint () {
}


function addImage (button, image, size) {
    button.style.background = `url(${image})`;
    button.style.backgroundSize = size;
    button.style.backgroundRepeat = "no-repeat";
    button.style.backgroundPosition = "center";
    button.disabled = true;
}

function finish_game() {
    let t;
    switch(board.winner()) {
        case 1:
            t = `Player X has won the game!`;
            break;
        case -1:
            t = `Player O has won the game!`;
            break;
        default:
            t =  `Tie Game!`
    }
    alert(t);
    rmvBtnList();
}
 
function putX() {
    addImage(this, "./images/X.png", "50% 80%");
    board.put([parseInt(this.id, 10), 1]);
    if(board.is_over()) finish_game();
    addBtnList(putO);

}

function putO () {
    addImage(this, "./images/O.png", "70% 90%");
    board.put([parseInt(this.id, 10), -1]);
    if(board.is_over()) finish_game();
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

var board = new Board();

function init() {
    addBtnList(putX);
}

document.addEventListener('DOMContentLoaded', 
() => {
    document.getElementById('rst-btn').onclick = my_reset;
    document.getElementById('hnt-btn').onclick = my_hint;
        let i = 0;
        $('.my-button').each(
            function () {
                this.id = i++;
            }
        );
        
        init();
    }
);

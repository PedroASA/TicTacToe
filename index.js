import Board from './dist/board.js';
import minmax from './dist/tic-tac-toe.js';

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
    board = new Board();
    addBtnList();
}

function my_hint () {
    alert("No Hint Implemented!");
}


function addImage (button, image, size) {

    button.style.background = `url(${image})`;
    button.style.backgroundSize = size;
    button.style.backgroundRepeat = "no-repeat";
    button.style.backgroundPosition =  "center";
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
            t =  `Tie Game!`;
    }
    alert(t);
    rmvBtnList();
}
 
function putX(button) {
    addImage(button, "./images/X.png", "50% 80%");
    board.put([parseInt(button.id, 10), 1]);
    if(board.is_over()) finish_game();

}
//call putO after putX is finished
function putO () {
    let play = minmax(board);
    if(play === null) alert("Play is Null");
    else {
        addImage($(`#${play[0]}`)[0], "./images/O.png", "70% 90%");
        board.put(play);
    }
    if(board.is_over()) finish_game();
}

function addBtnList () {

    $('.my-button').off("click");
    $('.my-button').each(
        function () {

            $( this )
            .on("click", function () {
                $.when(putX( $( this )[0] ))
                .then(() => {
                    if(!board.is_over())  
                        putO()
                });
            });
        }
    )
}


function rmvBtnList() {
    $('.my-button').off()
}

//INIT

var board = new Board();

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
        addBtnList();
    }
);

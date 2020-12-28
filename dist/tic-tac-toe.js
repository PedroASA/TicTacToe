var FIELD;
(function (FIELD) {
    FIELD[FIELD["X"] = 0] = "X";
    FIELD[FIELD["O"] = 1] = "O";
    FIELD[FIELD["_"] = 2] = "_";
})(FIELD || (FIELD = {}));
export default class TicTacToe {
    constructor() {
        this.counter = 0;
        this.board = [FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._];
    }
    player() {
        return this.counter % 2 === 0 ? FIELD.X : FIELD.O;
    }
    ;
    put(btn_num) {
        if (this.board[btn_num] === FIELD._) {
            this.board[btn_num] = this.player();
            this.counter++;
            console.log(this.board);
        }
    }
    ;
    check(k) {
        return k[0] !== FIELD._ && k.every((val, i, arr) => val === arr[0]);
    }
    util(val) {
        switch (val) {
            case FIELD._:
                return 0;
            case FIELD.X:
                return 1;
            case FIELD.O:
                return -1;
        }
    }
    winner() {
        //check rows
        for (let t = 0; t < 9; t += 3) {
            if (this.check(this.board.slice(t, t + 3)))
                return this.board[t];
        }
        //check columns
        for (let t = 0; t < 3; t++) {
            if (this.check([this.board[t], this.board[t + 3], this.board[t + 6]]))
                return this.board[t];
        }
        //check diagonals
        if (this.check([this.board[0], this.board[4], this.board[8]])) {
            return this.board[0];
        }
        if (this.check([this.board[2], this.board[4], this.board[6]])) {
            return this.board[0];
        }
        return FIELD._;
    }
    is_over() {
        if (this.winner() === FIELD._) {
            return this.board.every((val, i, arr) => val !== FIELD._);
        }
        return true;
    }
}
TicTacToe.FIELD = FIELD;

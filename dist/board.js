var FIELD;
(function (FIELD) {
    FIELD[FIELD["X"] = 0] = "X";
    FIELD[FIELD["O"] = 1] = "O";
    FIELD[FIELD["_"] = 2] = "_";
})(FIELD || (FIELD = {}));
export default class Board {
    constructor() {
        this.board = [FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._];
    }
    player() {
        return this.util(this.find_player());
    }
    ;
    put(play) {
        let btn_num = play[0], player = play[1];
        if (this.board[btn_num] === FIELD._) {
            this.board[btn_num] = this.field(player);
        }
    }
    ;
    winner() {
        return this.util(this.find_winner());
    }
    is_over() {
        if (this.find_winner() === FIELD._) {
            return this.board.every((val, i, arr) => val !== FIELD._);
        }
        return true;
    }
    empty_cells() {
        let res = [];
        for (let i = 0; i < this.board.length; i++)
            if (this.board[i] === FIELD._)
                res.push(i);
        return res;
    }
    undo(cell) {
        if (this.board[cell] !== FIELD._)
            this.board[cell] = FIELD._;
    }
    field(val) {
        switch (val) {
            case 0:
                return FIELD._;
            case 1:
                return FIELD.X;
            default:
                return FIELD.O;
        }
    }
    find_player() {
        let cntX = 0, cntO = 0;
        for (let t = 0; t < this.board.length; t++) {
            switch (this.board[t]) {
                case FIELD._:
                    continue;
                case FIELD.X:
                    cntX++;
                    break;
                default:
                    cntO++;
            }
        }
        return cntX === cntO ? FIELD.X : FIELD.O;
    }
    util(val) {
        switch (val) {
            case FIELD._:
                return 0;
            case FIELD.X:
                return 1;
            default:
                return -1;
        }
    }
    check(k) {
        return k[0] !== FIELD._ && k.every((val, i, arr) => val === arr[0]);
    }
    find_winner() {
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
}
Board.FIELD = FIELD;

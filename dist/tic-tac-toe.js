var FIELD;
(function (FIELD) {
    FIELD[FIELD["X"] = 0] = "X";
    FIELD[FIELD["O"] = 1] = "O";
    FIELD[FIELD["_"] = 2] = "_";
})(FIELD || (FIELD = {}));
var TicTacToe = (function () {
    function TicTacToe() {
        this.counter = 0;
        this.board = [FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._];
    }
    TicTacToe.prototype.player = function () {
        return this.counter % 2 == 0 ? FIELD.X : FIELD.O;
    };
    ;
    TicTacToe.prototype.put = function (btn_num) {
        if (this.board[btn_num] === FIELD._)
            this.board[btn_num] = this.player();
    };
    ;
    TicTacToe.prototype.check = function (k) {
        return k[0] !== FIELD._ && k.every(function (val, i, arr) { return val === arr[0]; });
    };
    TicTacToe.prototype.util = function (val) {
        switch (val) {
            case FIELD._:
                return 0;
            case FIELD.X:
                return 1;
            case FIELD.O:
                return -1;
        }
    };
    TicTacToe.prototype.winner = function () {
        for (var t = 0; t < 9; t += 3) {
            if (this.check(this.board.slice(t, t + 3)))
                return this.board[t];
        }
        for (var t = 0; t < 3; t++) {
            if (this.check([this.board[t], this.board[t + 3], this.board[t + 6]]))
                return this.board[t];
        }
        if (this.check([this.board[0], this.board[4], this.board[8]])) {
            return this.board[0];
        }
        if (this.check([this.board[2], this.board[4], this.board[6]])) {
            return this.board[0];
        }
        return FIELD._;
    };
    TicTacToe.prototype.is_over = function () {
        if (this.winner() === FIELD._) {
            return this.board.every(function (val, i, arr) { return val !== FIELD._; });
        }
        return true;
    };
    TicTacToe.FIELD = FIELD;
    return TicTacToe;
})();
exports.default = TicTacToe;
//# sourceMappingURL=tic-tac-toe.js.map
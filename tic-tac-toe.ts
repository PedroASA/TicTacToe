enum FIELD {
    X,
    O,
    _,
}

export default class TicTacToe {

    static FIELD = FIELD;
    private counter = 0;
    private board: FIELD[] = [FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._];

    player(): FIELD {
        return this.counter % 2 == 0 ? FIELD.X : FIELD.O;
    };

    put(btn_num: number): void {
        if(this.board[btn_num] === FIELD._)
            this.board[btn_num] = this.player();
    }; 

    private check(k:FIELD[]): boolean {
        return k[0] !== FIELD._ && k.every( (val, i, arr) => val === arr[0] );
    }

    winner(): FIELD {
        //check rows
        for(let t=0; t< 9; t+=3) {
            if(this.check(this.board.slice(t, t+3)))
                return this.board[t];
        }
        //check columns
        for(let t=0; t< 3; t++) {
            if(this.check([this.board[t], this.board[t+3], this.board[t+6]]))
            return this.board[t];
        }
        //check diagonals
        if(this.check([this.board[0], this.board[4], this.board[8]])) {
            return this.board[0];
        }
        if(this.check([this.board[2], this.board[4], this.board[6]])) {
            return this.board[0];
        }
        return FIELD._;

    }
    
    is_over(): boolean {
        if(this.winner() === FIELD._) {
            return this.board.every( (val, i, arr) => val !== FIELD._ );
        }
        return true;
    }

}
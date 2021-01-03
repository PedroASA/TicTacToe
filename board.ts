
enum FIELD {
    X,
    O,
    _,
}

export default class Board {

    private static FIELD = FIELD;
    private board: FIELD[] = [FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._, FIELD._];
    
    player(): number {
        return this.util(this.find_player());
    };

    put(play:[number, number]): void {
        let btn_num = play[0], player = this.field(play[1]);
        if(this.board[btn_num] === FIELD._) {
            this.board[btn_num] = player;
        }
    }; 

    winner(): number {
        return this.util(this.find_winner());
    }
    
    is_over(): boolean {
        if(this.find_winner() === FIELD._) {
            return this.board.every( (val, i, arr) => val !== FIELD._ );
        }
        return true;
    }

    empty_cells(): number[] {
        let res = [];
        for(let i=0; i< this.board.length; i++) 
            if(this.board[i] === FIELD._)
                res.push(i);
        return res;
    }

    undo(cell: number): void {
        if(this.board[cell] !== FIELD._)
            this.board[cell] = FIELD._;
    }

    private field(val: number): FIELD {
        switch(val) {
            case 0:
                return FIELD._;
            case 1:
                return FIELD.X;
            default:
                return FIELD.O;   
        }
    }

    private find_player(): FIELD {
        let cntX = 0, cntO = 0;
        for(let t= 0; t < this.board.length; t++) {
            switch(this.board[t]) {
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

    private util(val: FIELD): number {
        switch(val) {
            case FIELD._:
                return 0;
            case FIELD.X:
                return 1;
            default:
                return -1;   
        }
    }

    private check(k:FIELD[]): boolean {
        return k[0] !== FIELD._ && k.every( (val, i, arr) => val === arr[0] );
    }

    private find_winner(): FIELD {
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
            return this.board[2];
        }
        return FIELD._;

    }
}
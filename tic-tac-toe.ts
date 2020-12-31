import Board from './board';

export default class TicTacToe {

    private util(board: Board): number {

    }


    //returns best play given a board
    //maximize O play and minimize X play
    minmax(board: Board) {

        const max = () => {
            let max_util = 0, best_play = null;
            for(let cell of board.empty_cells()) {
                let play:[number, number] = [cell, -1];
                board.put(play);
                min();
                let t = this.util(board);
                if(t > max_util) {
                    max_util = t;
                    best_play = play;
                }
                board.undo(cell);
            }
        }

        const min = () => {
            let min_util = 0, best_play = null;
            for(let cell of board.empty_cells()) {
                let play:[number, number] = [cell, 1];
                board.put(play);
                min();
                let t = this.util(board);
                if(t < min_util) {
                    min_util = t;
                    best_play = play;
                }
                board.undo(cell);
            }
        }

        if(board.is_over()) {
            return null;
        }

        let res = 
            board.player() === 1 ? 
                min() : max();

        return res;
    }

}

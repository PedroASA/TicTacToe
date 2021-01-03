import Board from './board.js';

type Play = [number, number];

//returns best play given a board
//maximize O play and minimize X play
export default function  minmax(board: Board): Play | null {

    const util = (val: number): number => {
        return -val;
    }

    /*Backtrack:
        - put play in board
        - call min with changed board
        - remove play from board
    Change board to avoid making a copy every call.
    */

    //let best_play = null;

    //Maximize O
    const max = () : [number, Play| null] => {

        //base case
        if(board.is_over()) {
            return [util(board.winner()), null];
        }

        let max_util = -2, best_play = null;
        for(let cell of board.empty_cells()) {
            let play: Play = [cell, -1];
            board.put(play);
            let t = min();
            if(t > max_util) {
                max_util = t;
                best_play = play;
            }
            board.undo(cell);
            if(max_util === 1) break;
        }
        return [max_util, best_play];
    }

    const min = (): number => {

        //base case
        if(board.is_over()) {
            return util(board.winner());
        }

        let min_util = 2;
        for(let cell of board.empty_cells()) {
            let play: Play = [cell, 1];
            board.put(play);
            let t = max()[0];
            if(t < min_util) {
                min_util = t;
            }
            board.undo(cell);
            if(min_util === -1) break;
        }
        return min_util;
    }

    if(board.is_over()) {
        return null;
    }

    return max()[1];
}
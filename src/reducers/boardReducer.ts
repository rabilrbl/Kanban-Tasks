import { BoardType } from "../types/boards";
import { BoardAction } from "./actions/boardActions";

// Ignore this for now
// TODO: Add reducer for board

export const BoardReducer = (state: BoardType[], action: BoardAction) => {
    switch (action.type) {
        case "SET_BOARDS":
            return action.payload;
        case "EDIT_BOARD":
            return state.map(board => {
                if (board.id === action.payload.id) {
                    return action.payload;
                }
                return board;
            });
        case "ADD_BOARD":
            return [...state, action.payload];
        case "DELETE_BOARD":
            return state.filter(board => board.id !== action.id);
        default:
            return state;
    }
}
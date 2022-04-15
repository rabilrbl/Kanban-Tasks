import {BoardType} from "../../types/boards"

type NewBoard = Omit<BoardType, "id">;

type SetBoardList = {
    type: "SET_BOARDS";
    payload: BoardType[];
}

type EditBoard = {
    type: "EDIT_BOARD";
    payload: BoardType;
}


type AddBoard = {
    type: "ADD_BOARD";
    payload: NewBoard;
}

type DeleteBoard = {
    type: "DELETE_BOARD";
    id: number;
}

export type BoardAction = SetBoardList | EditBoard | AddBoard | DeleteBoard;

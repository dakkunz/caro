import { GAME_ACTIONS } from "@/constants/actionTypes";
import Config from "../constants/configs";

export default function handleGame(state = Config.initialState, action) {
  switch (action.type) {
    case GAME_ACTIONS.CLICK:
      return {
        ...state,
        data: {
          ...state.data,
          history: action.history,
          stepNumber: action.history.length - 1,
          nextMove: action.nextMove,
          winCells: action.winCells,
        },
      };

    case GAME_ACTIONS.REFRESH_GAME:
      return {
        ...state,
        isFetching: false,
        message: null,
        data: {
          history: [
            {
              x: null,
              y: null,
              squares: Array(Config.brdSize)
                .fill(null)
                .map(() => {
                  return Array(Config.brdSize).fill(null);
                }),
            },
          ],
          chatHistory: [],
          nextMove: action.nextMove,
          stepNumber: 0,
          winCells: null,
          isSaveGame: false,
        },
      };

    case GAME_ACTIONS.CHAT:
      return {
        ...state,
        data: {
          ...state.data,
          chatHistory: [...state.data.chatHistory, action.message],
        },
      };

    case GAME_ACTIONS.SAVE_GAME:
      return {
        ...state,
        data: {
          ...state.data,
          isSaveGame: true,
        },
      };

    case GAME_ACTIONS.REQUEST:
      return {
        ...state,
        isFetching: action.isRequesting,
        message: action.message,
      };

    case GAME_ACTIONS.REFRESH:
      return Config.initialState;

    default:
      return state;
  }
}

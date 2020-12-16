import ActionType from '../constants/actionTypes';
import Config from '../constants/configs';

export default function handleGame(state = Config.initialState, action) {
    switch (action.type) {
        case ActionType.CLICK:
            return {
                ...state,
                data: {
                    ...state.data,
                    history: action.history,
                    stepNumber: action.history.length - 1,
                    nextMove: action.nextMove,
                    winCells: action.winCells
                }
            }
        
        case ActionType.RESET_GAME:
            return {
                ...state,
                message: null,
                data: {
                    history: [{
                        x: null,
                        y: null,
                        squares: Array(Config.brdSize).fill(null).map(() => {
                            return Array(Config.brdSize).fill(null)
                        })
                    }],
                    nextMove: action.nextMove,
                    stepNumber: 0,
                    winCells: null,
                }
            };
        
        case ActionType.REFRESH:
            return Config.initialState;
        
        default:
            return state;
    }
}
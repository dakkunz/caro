import { combineReducers } from 'redux';
import gameReducers from './gameReducers';
import roomReducers from './roomReducers';

const rootReducers = combineReducers({
    gameReducers,
    roomReducers
});

export default rootReducers;
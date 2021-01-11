import { Component } from 'react';

class Config extends Component {
    
    static brdSize = 20;

    static xPlayer = 'X';

    static oPlayer = 'O';

    static plColor = {
        X: 'red',
        O: 'blue'
    };

    static defaultAvatar = "https://simpleicon.com/wp-content/uploads/account.png";

    static initialState = {
        message: null,
        isFetching: false,
        roomInfo: null,
        chatHistoryAll: [],

        data: {
            history: [{
                x: null,
                y: null,
                squares: Array(Config.brdSize).fill(null).map(() => {
                    return Array(Config.brdSize).fill(null)
                })
            }],
            chatHistory: [],
            nextMove: Config.xPlayer,
            stepNumber: 0,
            winCells: null,
            isSaveGame: false,
        }
    };
}

export default Config;
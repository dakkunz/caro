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

    static makeTwoDigits(src) {
        return (src < 10 ? `0${ src }` : src)
    }

    static initialState = {

        message: null,
        roomInfo: null,
        chatHistory: [],

        // This section is for game play
        data: {
            history: [{
                x: null,
                y: null,
                squares: Array(Config.brdSize).fill(null).map(() => {
                    return Array(Config.brdSize).fill(null)
                })
            }],
            nextMove: Config.xPlayer,
            stepNumber: 0,
            winCells: null,
        }
    };
}

export default Config;
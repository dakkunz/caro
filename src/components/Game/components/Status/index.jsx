import React from 'react';
import Config from '@/constants/configs';

const Status = (props) => {
    const { winCells } = props;
    const { rivalName } = props;
    const { winner } = props;
    const {isPlayerX} = props;
    const { messages } = props;
    const {isOverTime} = props;
    
    let message;

    if (rivalName === 'DISCONNECTED') {
        message = 'Đối thủ đã thoát, bạn đã thắng  !';
    }
    else if (messages) {
        message = messages;
    }else if(isOverTime){
        message = `Đối thủ quá giờ, bạn đã thắng !`;

        if ((isPlayerX && winner === Config.oPlayer) || (!isPlayerX && winner === Config.xPlayer)) {
            message = `Hết thời gian, bạn đã thua !`;
        }
    }
    else if (winCells) {
        message = `Chúc mừng, bạn đã thắng !`;

        if ((isPlayerX && winner === Config.oPlayer) || (!isPlayerX && winner === Config.xPlayer)) {
            message = `Rất tiếc, bạn đã thua !`;
        }
    }
    else {
        const player = props.nextMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;

        if ((isPlayerX && player === Config.oPlayer) || (!isPlayerX && player === Config.xPlayer)) {
            message = `Tới lượt bạn!`;
        }else{
            message = `Tới lượt đối thủ`;
        }
    }
    return (
        <div className='status'><b>{message}</b></div>
    )
}

export default Status;


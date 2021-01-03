import React from 'react';
import Config from '@/constants/configs';

const Status = (props) => {
    const { winCells } = props;
    const { rivalname } = props;
    const { isPlayerX } = props;
    const { messages } = props;
    
    let message;

    if (rivalname === 'DISCONNECTED') {
        message = 'Đối thủ đã thoát, tạm ngưng trận đấu  !';
    }
    else if (messages) {
        message = messages;
    }
    else if (winCells) {
        const winner = props.nextMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
        message = `Chúc mừng, bạn đã thắng !`;

        if ((isPlayerX && winner === Config.oPlayer) || (!isPlayerX && winner === Config.xPlayer)) {
            message = `Rất tiếc, bạn đã thua !`;
        }
    }
    else {
        message = `Lượt kế tiếp: ${  props.nextMove}`;
    }
    return (
        <div className='status'><b>{message}</b></div>
    )
}

export default Status;
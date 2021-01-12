import QuickPlayModal from "@/pages/Home/QuickPlayModal";
import RoomModal from "@/pages/Home/RoomModal";
import { PlusCircleTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
// import useSocket from "@/hooks/useSocket";
import "./style.scss";

const RoomActions = (props) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showQuickPlay, setShowQuickPlay] = useState(false);

  // const socket = useSocket();

  // const findRival = () => {
  //   // socket.emit("join-room-quick");
  // };

  const handleQuickPlay = () => {
    // findRival();
    setShowQuickPlay(true);
  };

  const cancelFinRival = () => {
    setShowQuickPlay(false)
    // socket.emit("cancel-join-room-quick", props.user);
  }

  return (
    <div className="room-actions-wrapper">
      <Button onClick={() => handleQuickPlay()}>
        <SmileTwoTone />
        Quick Play
      </Button>
      <Button onClick={() => setShowCreate(true)}>
        <PlusCircleTwoTone />
        Create Room
      </Button>

      <RoomModal show={showCreate} hide={() => setShowCreate(false)} />
      <QuickPlayModal
        show={showQuickPlay}
        hide={() => cancelFinRival()}
      />
    </div>
  );
};
export default RoomActions;

import { selectRoom } from "@/actions/roomList";
import { SOCKET_TYPES } from "@/constants/socketTypes";
import useSocket from "@/hooks/useSocket";
import PasswordModal from "@/pages/Home/PasswordModal";
import { columns } from "@/pages/Home/RoomList/tableCols";
import { Table, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

const checkMatchSearch = (room, value) => {
	const { id, roomName, host } = room;
	const v = value.toLowerCase();
	return (
		id.toString().toLowerCase().includes(v) ||
		roomName.toLowerCase().includes(v) ||
		host.toLowerCase().includes(v)
	);
};

const RoomList = () => {
	const { list } = useSelector((state) => state.roomList);
	const [filteredList, setFilteredList] = useState(list);
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const socket = useSocket();

	useEffect(() => {
		setFilteredList(list);
	}, [list]);

	return (
		<div className="room-list-wrapper">
			<div className="title">
				<h2>Game Rooms</h2>
				<Input.Search
					onSearch={(value) =>
						setFilteredList(
							list.filter((room) => checkMatchSearch(room, value))
						)
					}
					className="search-input"
				/>
			</div>
			<Table
				size="small"
				bordered
				columns={columns}
				dataSource={filteredList}
				pagination={{ pageSize: 5 }}
				rowKey={(room) => room.id}
				onRow={(room) => ({
					onClick: () => {
						dispatch(selectRoom(room));
						if (room.password) {
							setShow(true);
						} else socket.emit(SOCKET_TYPES.JOIN_ROOM_REQUEST, room.id);
					},
				})}
			/>
			<PasswordModal show={show} hide={() => setShow(false)} />
		</div>
	);
};
export default RoomList;

import RoomName from "@/pages/Home/RoomName";
import RoomStatus from "@/pages/Home/RoomStatus";

const roomStatusMapping = {
	0: {
		label: "Playing",
		color: "green",
	},
	1: {
		label: "Waiting Player",
		color: "blue",
	},
	2: {
		label: "Pending Start",
		color: "magenta",
	},
};

export const columns = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",

		width: "10%",
	},
	{
		title: "Room Name",
		dataIndex: "roomName",
		key: "roomName",
		render: (roomName, { hasPassword }) => (
			<RoomName roomName={roomName} hasPassword={hasPassword} />
		),
	},
	{
		title: "Host",
		dataIndex: "host",
		key: "host",
		width: "25%",
	},
	{
		title: "Players",
		dataIndex: "players",
		key: "player",
		width: "8%",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		width: "15%",
		render: (status) => <RoomStatus status={status} />,
		filters: Object.entries(
			roomStatusMapping
		).map(([statusCode, { label }]) => ({ text: label, value: statusCode })),
		onFilter: (value, record) => value.includes(record.status),
	},
];

import RoomName from "@/pages/Home/RoomName";
import RoomStatus from "@/pages/Home/RoomStatus";

const roomStatusMapping = {
	0: {
		label: "Playing",
		color: "magenta",
	},
	1: {
		label: "Pending",
		color: "green",
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
		render: (roomName, { password }) => (
			<RoomName roomName={roomName} hasPassword={password ? true : false} />
		),
	},
	{
		title: "Host",
		dataIndex: "host",
		key: "host",
		width: "25%",
		render: ({ displayName }) => <span>{displayName}</span>,
	},
	{
		title: "Players",
		dataIndex: "players",
		key: "player",
		width: "8%",
		render: ({ X, O }) => {
			let count = 0;
			if (X) count += 1;
			if (O) count += 1;
			return <span>{count}/2</span>;
		},
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

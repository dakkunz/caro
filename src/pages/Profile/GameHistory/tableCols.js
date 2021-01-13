import moment from "moment";

export const columns = ({ user }) => [
	{
		title: "STT",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "Đối thủ",
		key: "rival",
		render: ({ xPlayer, oPlayer }) =>
			xPlayer.sub === user.sub ? xPlayer.displayName : oPlayer.displayName,
	},
	{
		title: "Kết quả",
		key: "result",
		render: ({ isDraw, winner }) =>
			isDraw ? "Hòa" : winner.sub === user.sub ? "Thắng" : "Thua",
	},
	{
		title: "Điểm",
		dataIndex: "point",
		key: "point",
		render: (point) => point,
	},
	{
		title: "Ngày",
		dataIndex: "date",
		key: "date",
		render: (date) => moment(new Date(date)).fromNow(),
	},
];

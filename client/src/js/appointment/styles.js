import { additionalFloatingActionStyles } from '../helpers/util';

export default function getStyles() {
		return {
			paper: {
				margin: '30px auto 0px auto',
				padding: '0',
				width: '70%%',
				maxWidth: '800px',
				minWidth: '300px',
				minHeight: '200px',
				overflow: 'auto'
			},
			divider: {
				width: '100%'
			},
			header: {
				width: '100%',
				height: '30px',
				display: 'flex'
			},
			headerCell: {
				width: '110px',
				display: 'inline-block',
				verticalAlign: 'middle',
				textAlign: 'center',
				borderRight: 'rgb(224, 224, 224)',
				borderRightWidth: 'thin',
				borderRightStyle: 'solid',
				padding: '5px'
			},
			rowHourCell: {
				width: '50px',
				display: 'inline-block',
				verticalAlign: 'middle',
				textAlign: 'center',
				borderRight: 'rgb(224, 224, 224)',
				borderRightWidth: 'thin',
				borderRightStyle: 'solid'
			},
			row: {
				width: 'auto',
				minHeight: '30px',
				borderBottom: 'rgb(224, 224, 224)',
				borderBottomWidth: 'thin',
				borderBottomStyle: 'solid',
				display: 'flex'
			},
			cell: {
				width: '110px',
				display: 'inline-block',
				borderRight: 'rgb(224, 224, 224)',
				borderRightWidth: 'thin',
				borderRightStyle: 'solid',
				padding: '5px'
			},
			eventItem: {
				backgroundColor: 'rgb(0, 188, 212)',
				borderRadius: '6px',
				padding: '5px'
			},
			nextWeekAction: additionalFloatingActionStyles(),
			previousWeekAction: { ...additionalFloatingActionStyles(), right: '10px' },
			filterAppointments: { ...additionalFloatingActionStyles(), right: '40px' }
		};
}
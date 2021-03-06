import { additionalFloatingActionStyles } from '../styles/actions';

function getBorderStyle(side) {
	return {
		[`border${side}`]: 'rgb(224, 224, 224)',
		[`border${side}Width`]: 'thin',
		[`border${side}Style`]: 'solid'
	};
}

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
				width: '130px',
				minWidth: '130px',
				display: 'inline-block',
				verticalAlign: 'middle',
				textAlign: 'center',
				...getBorderStyle('Right'),
				...getBorderStyle('Bottom'),
				padding: '5px'
			},
			rowHourCell: {
				width: '60px',
				minWidth: '60px',
				display: 'inline-block',
				verticalAlign: 'middle',
				textAlign: 'center',
				...getBorderStyle('Right'),
				...getBorderStyle('Bottom'),
			},
			row: {
				width: 'auto',
				minHeight: '30px',
				display: 'flex'
			},
			cell: {
				width: '130px',
				minWidth: '130px',
				display: 'inline-block',
				...getBorderStyle('Right'),
				...getBorderStyle('Bottom'),
				padding: '5px'
			},
			eventItem: {
				backgroundColor: 'rgb(0, 188, 212)',
				borderRadius: '6px',
				padding: '5px',
				marginBottom: '5px',
				wordWrap: 'break-word'
			},
			nextWeekAction: additionalFloatingActionStyles(),
			previousWeekAction: { ...additionalFloatingActionStyles(), right: '76px' },
			filterAppointments: { ...additionalFloatingActionStyles(), right: '150px' }
		};
}
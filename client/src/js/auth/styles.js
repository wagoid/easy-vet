
export default function getStyles(hasOpenMessage) {
	return {
		paper: {
			padding: window.screen.width > 400? '14px 24px 24px' : '14px 5px 24px 5px',
			margin: '100px auto 0 auto',
			width: '50%',
			minWidth: '250px',
			maxWidth: '450px'
		}
	};
}
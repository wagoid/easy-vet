const SNACKBAR_HEIGHT = 48;
const FLOATING_BUTTON_BOTTOM = 20;

export function floatingActionStyles(hasOpenMessage) {
	return {
		position: 'fixed',
		right: 20,
		bottom: hasOpenMessage && window.screen.width < 768? SNACKBAR_HEIGHT + 10 : FLOATING_BUTTON_BOTTOM,
		zIndex: 100
	};
}

export function additionalFloatingActionStyles() {
	return {
		position: 'absolute',
		top: '30px',
		right: '15px',
		width: '56px',
		height: '56px',
		boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 2px 3px, rgba(0, 0, 0, 0.227451) 0px 2px 3px'
	};
}
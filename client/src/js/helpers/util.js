export const SNACKBAR_HEIGHT = 48;
export const FLOATING_BUTTON_BOTTOM = 20;

export function floatingActionStyles(hasOpenMessage) {
	return {
		position: 'fixed',
		right: 20,
		bottom: hasOpenMessage && window.screen.width < 768? SNACKBAR_HEIGHT + 10 : FLOATING_BUTTON_BOTTOM,
		zIndex: 100
	};
}
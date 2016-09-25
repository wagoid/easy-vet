export const OPEN = 'dialog/SHOW';
export function openDialog(payload) {
	return {
		type: OPEN,
		payload
	};
}

export const CLOSE = 'dialog/CLOSE';
export function closeDialog(props, component) {
	return {
		type: CLOSE,
		payload: { props, component }
	};
}
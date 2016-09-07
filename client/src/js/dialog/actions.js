export const OPEN = 'dialog/SHOW';
export function openDialog(type, component) {
	return {
		type: OPEN,
		payload: { type, component }
	};
}

export const CLOSE = 'dialog/CLOSE';
export function closeDialog(props, component) {
	return {
		type: CLOSE,
		payload: { props, component }
	};
}
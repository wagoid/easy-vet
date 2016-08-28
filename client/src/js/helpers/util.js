export function dateFormat(date, type) {
	date = new Date(date);
	let formattedDate = date.toString();
	switch (type) {
		case 'date':
			formattedDate = date.toLocaleDateString();
			break;
	
		default:
			formattedDate = date.toLocaleDateString();
			break;
	}

	return formattedDate;
}
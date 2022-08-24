export function getFormattedDate(date) {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDateMinusDays(date, days) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() - days);
	return newDate;
}

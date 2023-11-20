function dateToTime(date:Date | null = null): string{
	date = date ? new Date(date) : new Date;
	const minutes = date.getMinutes().toString();
	const hours = date.getHours().toString();
	return `${hours.padStart(2,'0')}:${minutes.padStart(2,'0')}`;
}

export default dateToTime;

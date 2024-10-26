import { differenceInMinutes } from 'date-fns';

export default function getDifference(data) {
	const value = differenceInMinutes(new Date(data.start), new Date(data.end));

	return Number(value) * -1;
}	
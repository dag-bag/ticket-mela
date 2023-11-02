export default function dateToTimestamp(dateString: string): number {
    // Split the date string into day, month, and year
    const [day, month, year] = dateString.split('-').map(Number);

    // Create a JavaScript Date object
    const date = new Date(year, month - 1, day);

    // Get the timestamp in milliseconds
    const timestamp = date.getTime();

    return timestamp;
}
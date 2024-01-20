export const truncateString = (str, max_length) => str.length > max_length ? str.slice(0, max_length) + '...' : str;

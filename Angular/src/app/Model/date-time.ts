const date  =  new Date();
export const DateTime = new Intl.DateTimeFormat('en-GB', {
day: '2-digit',
month: 'short',
year: 'numeric',
hour: '2-digit',
minute: '2-digit',
hour12: true
}).format(date)
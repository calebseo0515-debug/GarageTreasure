export function formatSaleTime(start?: string | null, end?: string | null): string {
  if (!start) return 'Times not listed';

  const startLabel = formatClock(start);
  if (!end) return `Starts at ${startLabel} - End time not listed`;

  return `${startLabel} - ${formatClock(end)}`;
}

function formatClock(value: string): string {
  const [hourRaw, minuteRaw = '00'] = value.split(':');
  const hour24 = Number(hourRaw);

  if (Number.isNaN(hour24)) return value;

  const suffix = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 || 12;
  const minutes = minuteRaw === '00' ? '' : `:${minuteRaw}`;

  return `${hour12}${minutes}${suffix}`;
}

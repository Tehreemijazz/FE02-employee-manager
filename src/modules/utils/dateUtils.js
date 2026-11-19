/** Date helpers. */

export function formatDate(value, locale = 'en-GB') {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function yearsSince(value, now = new Date()) {
  const start = new Date(value);
  let years = now.getFullYear() - start.getFullYear();
  const hadAnniversary =
    now.getMonth() > start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());
  if (!hadAnniversary) {
    years -= 1;
  }
  return Math.max(years, 0);
}

export const toInputDate = (value) =>
  new Date(value).toISOString().slice(0, 10);

export default formatDate;

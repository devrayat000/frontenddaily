export function formatDate(date: string | number | Date) {
  return new Intl.DateTimeFormat(["en-UK", "en-US"], {
    dateStyle: "medium",
  }).format(new Date(date));
}

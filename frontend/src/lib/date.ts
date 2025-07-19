export function formatMessageTime(date: string) {
  return new Date(date).toLocaleString("en-Us", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

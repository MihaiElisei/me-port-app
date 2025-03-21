export function FormatDate(isoString) {
  return new Date(isoString).toLocaleDateString("eu-RO", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  })
}
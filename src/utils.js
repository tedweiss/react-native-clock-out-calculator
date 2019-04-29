export const calculateClockOutHours = startHours => {
  let hours = parseInt(startHours) + 8 - 12
  return hours
}

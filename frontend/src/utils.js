export const getDurationString = (duration) => {
  // input duration in seconds
  const hours = Math.floor(duration / 3600) // 0
  const h_remainder = duration % 3600 // 65

  const mins = Math.floor(h_remainder / 60) // 1
  const secs = h_remainder % 60 // 5
  return hours ? `${hours} h ${mins} m ${secs} s` : `${mins} m ${secs} s`
}

export const getDistanceString = (distance) => {
  // input duration in seconds

  if (distance > 1000) {
    const kms = Math.round((distance / 1000) * 10) / 10
    return `${kms} km`
  } else {
    return `${distance} m`
  }
}

export const randomNumber = (min = 0, max = 100, ceil = 1, digits = 0) => {
  const num = min - 0.5 + Math.random() * (max - min + 1)

  return max > min
    ? digits
      ? +num.toFixed(digits)
      : ceil
      ? Math.ceil(num / ceil) * ceil
      : Math.round(num)
    : 0
}

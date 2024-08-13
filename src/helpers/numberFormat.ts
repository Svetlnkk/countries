export const numberFormat = (n: number) => {
  const string = new Intl.NumberFormat('ru-RU').format(n)
  return string
}

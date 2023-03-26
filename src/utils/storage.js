export const extractStoragePath = url => {
  const arr = url.split('/')
  const pathWithQueries = arr[arr.length - 1]
  const path = pathWithQueries.substring(0, pathWithQueries.indexOf('?'))

  return decodeURIComponent(path)
}

const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

export const bytesToMbs = bytes => +(bytes / (1024 * 1024)).toFixed(2)

export const bytesToSize = bytes => {
  if (!bytes) {
    return '0 Byte'
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

export const download = (fileName, data, type = 'text/plain') => {
  const blob = new Blob([data], { type })

  if ('msSaveOrOpenBlob' in window.navigator) {
    window.navigator.msSaveBlob(blob, fileName)
  } else {
    const el = window.document.createElement('a')

    el.href = window.URL.createObjectURL(blob)
    el.download = fileName

    document.body.appendChild(el)

    el.click()

    document.body.removeChild(el)
  }
}

export const read = async file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = reject

    reader.readAsText(file)
  })
}

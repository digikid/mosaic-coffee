export const fakeApi = (value = true, delay = 500, debug = false) =>
  new Promise(resolve => {
    const apiTimeout = setTimeout(() => {
      if (debug) {
        console.log('fakeApi response:', value)
      }

      resolve({
        data: value
      })
      clearTimeout(apiTimeout)
    }, delay)
  })

const { VUE_APP_LOCAL_PREFIX: APP_PREFIX } = process.env

export const useLocalStorage = () => {
  const get = key => JSON.parse(localStorage.getItem(APP_PREFIX + key))
  const set = (key, value) =>
    localStorage.setItem(APP_PREFIX + key, JSON.stringify(value))
  const remove = key => localStorage.removeItem(APP_PREFIX + key)

  return {
    get,
    set,
    remove
  }
}

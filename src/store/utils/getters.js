const items = ({ items }) => items

const empty = ({ empty }) => empty

const get = ({ items }) => {
  return id => items.find(item => item.id === id)
}

export const manageStoreGetters = () => ({
  items,
  empty,
  get
})

const load = (state, payload) => {
  state.items = payload
}

const add = (state, payload) => {
  state.items.push(payload)
}

const update = (state, payload) => {
  const { id } = payload
  const index = state.items.findIndex(item => item.id === id)

  if (index !== -1) {
    state.items[index] = payload
  }
}

const remove = (state, id) => {
  const index = state.items.findIndex(item => item.id === id)

  if (index !== -1) {
    state.items = state.items.filter(item => item.id !== id)
  }
}

const removeAll = state => {
  state.items = []
}

export const manageStoreMutations = () => ({
  load,
  add,
  update,
  remove,
  removeAll
})

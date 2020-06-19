import { useEffect, useState } from 'react'

const useUndoRedo = (state, setState) => {
  const [store, setStore] = useState([]);
  const [position, setPosition] = useState(store.length > 0 ? store.length - 1 : 0);
  const [ignore, setIgnore] = useState(true)

  useEffect(() => {
    if (ignore) {
      setIgnore(false)
      return
    }

    let prevStore = store

    if (position !== store.length - 1) {
      prevStore = prevStore.slice(0, position + 1)
    }

    const newStore = [
      ...prevStore,
      state,
    ]

    setStore(newStore)
    setPosition(newStore.length - 1)
  }, [state])

  const setNewPosition = (newPosition) => {
    setPosition(newPosition)
    setIgnore(true)
    setState(store[newPosition])
  }

  return [
    () => setNewPosition(position - 1),
    () => setNewPosition(position + 1),
    position,
    store.length - 1,
  ]
}

export default useUndoRedo

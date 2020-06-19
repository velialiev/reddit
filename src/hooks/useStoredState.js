import { useEffect, useState } from 'react'
import LocalStorageUtil from '../utils/LocalStorageUtil'

const useStoredState = (storageKey, initialValue) => {
  const [state, setState] = useState(initialValue)

  useEffect(() => {
    setState(LocalStorageUtil.get(storageKey, initialValue) || [])
  }, [])

  useEffect(() => {
    LocalStorageUtil.set(storageKey, state)
  }, [state])

  return [state, setState]
}

export default useStoredState

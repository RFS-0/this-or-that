import { createContext, ParentComponent, useContext } from 'solid-js'
import { createStore, SetStoreFunction, Store } from 'solid-js/store'
import { Item } from './domain/entities/item'

export type ApplicationContextState = {
  unsortedItems: Item[]
}

export type ApplicationContextValue = [state: ApplicationContextState]

const defaultState = {
  unsortedItems: [],
}

const ApplicationContext = createContext<ApplicationContextValue>([
  defaultState,
])

export const ApplicationContextProvider: ParentComponent = (props) => {
  const [applicationContext, setApplicationContext]: [
    get: Store<ApplicationContextState>,
    set: SetStoreFunction<ApplicationContextState>
  ] = createStore({
    unsortedItems: defaultState.unsortedItems,
  } as ApplicationContextState)

  return (
    <ApplicationContext.Provider value={[applicationContext]}>
      {props.children}
    </ApplicationContext.Provider>
  )
}

export const useApplicationContext = () => useContext(ApplicationContext)

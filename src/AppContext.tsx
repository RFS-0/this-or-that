import { createContext, createSignal, ParentComponent, Signal, useContext } from 'solid-js'
import { createStore, SetStoreFunction, Store } from 'solid-js/store'
import { Item } from './domain/entities/item'

type UiState = {
  menuOpen: boolean
}

export type ApplicationContextState = {
  uiState: UiState
  unsortedItems: Signal<Item[]>
  sortedItems: Signal<Item[]>
}
export type ApplicationContextActions = {
  toggleMenu: () => void
}

export type ApplicationContextValue = [
  state: ApplicationContextState,
  actions: ApplicationContextActions
]

const defaultState = {
  uiState: {
    menuOpen: false,
  },
  unsortedItems: createSignal<Item[]>([]),
  sortedItems: createSignal<Item[]>([]),
}

const defaultActions = {
  toggleMenu: () => undefined,
}

const ApplicationContext = createContext<ApplicationContextValue>([
  defaultState,
  defaultActions,
])

export const ApplicationContextProvider: ParentComponent = (props) => {
  const [applicationContext, setApplicationContext]: [
    get: Store<ApplicationContextState>,
    set: SetStoreFunction<ApplicationContextState>
  ] = createStore({
    ...defaultState,
    ...defaultActions,
  } as ApplicationContextState)

  const actions: ApplicationContextActions = {
    toggleMenu: () => {
      setApplicationContext('uiState', 'menuOpen', (menuOpen) => !menuOpen)
    },
  }
  return (
    <ApplicationContext.Provider value={[applicationContext, actions]}>
      {props.children}
    </ApplicationContext.Provider>
  )
}

export const useApplicationContext = () => useContext(ApplicationContext)

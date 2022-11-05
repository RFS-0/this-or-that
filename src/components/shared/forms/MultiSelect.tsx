import { Listen } from '@solid-primitives/event-bus'
import {
  createSignal,
  For,
  JSX,
  onCleanup,
  onMount,
  Setter,
  Show,
  Signal,
} from 'solid-js'
import { Chip } from './Chip'

const createListenerToResetOptions = <T,>(
  e: MouseEvent,
  optionInput: HTMLElement | undefined,
  optionsDropdown: HTMLDivElement | undefined,
  setOptions: Setter<T[]>
): void => {
  if (
    e.type === 'click' &&
    e.target instanceof Node &&
    (optionInput.contains(e.target) || optionsDropdown.contains(e.target))
  ) {
    return
  }
  setOptions([])
}

type FilteredOptionsProps = {
  name: string
  selectOption: () => void
}

function FilteredOption(props: FilteredOptionsProps) {
  return (
    <div
      onClick={() => props.selectOption()}
      class='bg-indigo-100 hover:bg-indigo-300'
    >
      <span class='text-gray-700 text-sm  mr-2'>{props.name}</span>
    </div>
  )
}

export type MultiSelectEvent<T> = {
  type: 'optionRemoved'
  option: T
}

type MultiSelectProps<T extends unknown> = {
  id: string
  label?: string
  placeholder?: string
  allOptions: T[]
  nameOf: (option: T) => string
  optionFilter: (query: string, option: T) => unknown
  onOptionSelected?: (selected: T) => void
  onOptionUnselected?: (unselected: T) => void
  onOptionsChanged?: (options: T[]) => void
  multiSelectEventListener?: Listen<MultiSelectEvent<T>>
}

const MultiSelect: <T extends unknown>(
  props: MultiSelectProps<T>
) => JSX.Element = <T,>(props: MultiSelectProps<T>) => {
  const [selectedOptions, setSelectedOptions]: Signal<T[]> = createSignal([])
  const [filteredOptions, setOptions] = createSignal<T[]>([])

  let optionInput: HTMLInputElement | undefined
  let optionsDropdown: HTMLDivElement | undefined

  props.multiSelectEventListener &&
    props?.multiSelectEventListener((event) => {
      switch (event.type) {
        case 'optionRemoved':
          unselectOption(event.option)
          break
        default:
          const _exhaustiveCheck: never = event.type
          return _exhaustiveCheck
      }
    })

  onMount(() => {
    document.body.addEventListener('click', (e) =>
      createListenerToResetOptions(e, optionInput, optionsDropdown, setOptions)
    )
  })

  onCleanup(() => {
    document.body.removeEventListener('click', (e) =>
      createListenerToResetOptions(e, optionInput, optionsDropdown, setOptions)
    )
  })

  const availableOptions: () => T[] = () => {
    return props.allOptions.filter(
      (option) => !selectedOptions().includes(option)
    )
  }

  const showAvailableOptions = () => {
    setOptions(availableOptions)
  }

  const filterOptions: (query: string) => void = (query) => {
    const filtered = availableOptions().filter((option) =>
      props.optionFilter(query, option)
    )
    setOptions(filtered)
  }

  const selectOption: (option: T) => void = (option) => {
    const updatedSelection = [...selectedOptions(), option]
    setSelectedOptions(updatedSelection)
    props.onOptionSelected && props.onOptionSelected(option)
    props.onOptionsChanged && props.onOptionsChanged(updatedSelection)
    showAvailableOptions()
  }

  const unselectOption: (option: T) => void = (option) => {
    const updatedSelection = [...selectedOptions()]
    const toBeUnselectd = updatedSelection.indexOf(option)
    const [unselected] = updatedSelection.splice(toBeUnselectd, 1)
    setSelectedOptions(updatedSelection)
    props.onOptionUnselected && props.onOptionUnselected(unselected)
    props.onOptionsChanged && props.onOptionsChanged([...updatedSelection])
  }

  return (
    <div class='relative'>
      <Show when={props.label}>
        <label for='multi-select' class='block text-gray-700'>
          {props.label}
        </label>
      </Show>
      <div class='mt-2 flex flex-row flex-wrap'>
        <For each={selectedOptions()}>
          {(option) => (
            <Chip
              name={props.nameOf(option)}
              unselect={() => unselectOption(option)}
            ></Chip>
          )}
        </For>
      </div>
      <input
        ref={optionInput}
        id={props.id}
        type='text'
        placeholder={props.placeholder || ''}
        class='mt-2
               block
               w-full
               rounded-md
               bg-gray-100
               border-transparent
               focus:border-gray-500 focus:bg-white focus:ring-0'
        onInput={(e) => {
          if (!(e.target instanceof HTMLInputElement)) {
            console.error('Filter must target input')
            return
          }
          filterOptions(e.target.value)
        }}
        onFocus={() => showAvailableOptions()}
        onKeyPress={(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            if (filteredOptions().length === 1) {
              selectOption(filteredOptions()[0])
              optionInput.value = ''
            }
          }
        }}
      />
      <div
        id='options-dropdown'
        ref={optionsDropdown}
        class='absolute w-full z-50'
      >
        <div class='overflow-y-auto'>
          <div class=''>
            <For each={filteredOptions()}>
              {(option) => (
                <FilteredOption
                  name={props.nameOf(option)}
                  selectOption={() => selectOption(option)}
                ></FilteredOption>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  )
}

export { MultiSelect }

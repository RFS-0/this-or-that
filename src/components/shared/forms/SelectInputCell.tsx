import { Component, JSX } from 'solid-js'

export type SelectInputCellProps = {
  id: string
  onOptionSelected: (value: string, name: string) => void
  name?: string
  children: JSX.Element
}

const SelectInputCell: Component<SelectInputCellProps> = (props) => {
  const selectOption = (
    selectedOption: Event & {
      currentTarget: HTMLSelectElement
      target: Element
    }
  ) => {
    selectedOption.currentTarget.selectedIndex
    props.onOptionSelected(
      selectedOption.currentTarget.value,
      selectedOption.currentTarget.selectedOptions.item(0).text
    )
  }

  return (
    <td>
      <select
        id={props.id}
        onChange={selectOption}
        class='mt-1
               block
               w-full
               rounded-md
               bg-gray-100
               border-transparent
               focus:border-gray-500 focus:bg-white focus:ring-0'
        name={props.name || ''}
      >
        {props.children}
      </select>
    </td>
  )
}

export { SelectInputCell }

import {  Component, } from 'solid-js'

export type NumberInputCellProps = {
  id: string
  onNumberEntered: (value: number) => void
  name?: string
  min?: number
  max?: number
  value?: number
  children?: never[]
}

const NumberInputCell: Component<NumberInputCellProps> = (props) => {
  const enterNumber = (
    numberInput: Event & {
      currentTarget: HTMLInputElement
      target: Element
    }
  ) => {
    props.onNumberEntered(parseFloat(numberInput.currentTarget.value))
  }

  return (
    <td>
      <input
        type='number'
        id={props.id}
        onChange={enterNumber}
        name={props.name || ''}
        min={props.min || 0}
        max={props.max || 100}
        value={props.value || 0}
        class='mt-1
               block
               w-full
               rounded-md
               bg-gray-100
               border-transparent
               focus:border-gray-500 focus:bg-white focus:ring-0'
      />
    </td>
  )
}

export { NumberInputCell }

import { Component } from 'solid-js'

export type TextInputCellProps = {
  id: string
  onTextEntered: (value: string) => void
  name?: string
  value?: string
}

const TextInputCell: Component<TextInputCellProps> = (props) => {
  const enterText = (
    textInput: Event & {
      currentTarget: HTMLInputElement
      target: Element
    }
  ) => {
    props.onTextEntered(textInput.currentTarget.value)
  }

  return (
    <td>
      <input
        type='text'
        id={props.id}
        onChange={enterText}
        name={props.name || ''}
        value={props.value || ''}
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

export { TextInputCell }

import { Component } from 'solid-js'

export type TextAreaInputCellProps = {
  id: string
  onTextEntered: (value: string) => void
  name?: string
  rows?: number
  value?: string
  children?: never[]
}

const TextAreaInputCell: Component<TextAreaInputCellProps> = (props) => {
  const enterText = (
    textInput: Event & {
      currentTarget: HTMLTextAreaElement
      target: Element
    }
  ) => {
    props.onTextEntered(textInput.currentTarget.value)
  }

  return (
    <td>
      <textarea
        id={props.id}
        onChange={enterText}
        name={props.name}
        rows={props.rows || 5}
        class='mt-1
               block
               w-full
               rounded-md
               bg-gray-100
               border-transparent
               focus:border-gray-500 focus:bg-white focus:ring-0'
        value={props.value || ''}
      ></textarea>
    </td>
  )
}

export { TextAreaInputCell }

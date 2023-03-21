import { Component } from 'solid-js'
import { FilledTextField } from '../../../design-system'

export type TextInputCellProps = {
  id: string
  onTextEntered: (value: string) => void
  name?: string
  value?: string
}

const TextInputCell: Component<TextInputCellProps> = (props) => {
  const enterText = (e: Event & { target: HTMLInputElement }) => {
    props.onTextEntered(e.target.value)
  }

  return (
    <td class="p-f6">
      <FilledTextField
        type='text'
        onChange={enterText}
        name={props.name || ''}
        value={props.value || ''}
      />
    </td>
  )
}

export { TextInputCell }

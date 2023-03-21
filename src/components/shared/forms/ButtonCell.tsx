import { Component, JSX } from 'solid-js'
import { ButtonContainer } from './ButtonContainer'

export type ButtonCellProps = {
  id: string
  children: JSX.Element
}

const ButtonCell: Component<ButtonCellProps> = (props) => {
  return (
    <td
      id={props.id}
      class='p-f6'
    >
      <ButtonContainer>{props.children}</ButtonContainer>
    </td>
  )
}

export { ButtonCell }

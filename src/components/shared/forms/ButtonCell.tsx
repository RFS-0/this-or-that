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
      class='mt-1
             block
             w-full
             rounded-md
             border-transparent
            '
    >
      <ButtonContainer>{props.children}</ButtonContainer>
    </td>
  )
}

export { ButtonCell }

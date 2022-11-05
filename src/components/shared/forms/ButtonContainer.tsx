import { FlowComponent, JSX } from 'solid-js'

export type ButtonContainerProps = {
  children: JSX.Element
}

const ButtonContainer: FlowComponent<ButtonContainerProps> = (props) => {
  return <div class='flex flex-row-reverse'>{props.children}</div>
}

export { ButtonContainer }

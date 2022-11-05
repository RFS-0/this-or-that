import { Component, JSX } from 'solid-js'

export type FormContainerProps = {
  children: JSX.Element
}

const FormContainer: Component<FormContainerProps> = (props) => {
  return <div class='grid grid-cols-6 gap-6'>{props.children}</div>
}

export { FormContainer }

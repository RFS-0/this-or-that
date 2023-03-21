import { Component, JSX } from "solid-js"
import './styles/base-styles.css'

export type ContainerMiddleProps = {
  children?: JSX.Element
}

export const ContainerMiddle: Component<ContainerMiddleProps> = (props) => {
  return (
    <span class={`${'md3-field__middle'}`}>
      {props?.children}
    </span>
  )
}

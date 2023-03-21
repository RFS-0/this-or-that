import { Component, JSX } from "solid-js"
import './styles/base-styles.css'

export type ContainerStartProps = {
  children?: JSX.Element
}

export const ContainerStart: Component<ContainerStartProps> = (props) => {
  return (
    <span class={`${'md3-field__start'}`}>
      {props?.children}
    </span>
  )
}

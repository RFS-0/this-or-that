import { Component, JSX } from "solid-js"
import './styles/base-styles.css'

export type ContainerEndProps = {
  children?: JSX.Element
}

export const ContainerEnd: Component<ContainerEndProps> = (props) => {
  return (
    <span class={`${'md3-field__end'}`}>
      {props?.children}
    </span>
  )
}

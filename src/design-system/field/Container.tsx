import { Component, JSX } from "solid-js"
import './styles/base-styles.css'

export type ContainerProps = {
  children: JSX.Element
}

export const Container: Component<ContainerProps> = (props) => {
  return (
    <span class={` ${'md3-field__container'}`}>
      {props?.children}
    </span>
  )
}

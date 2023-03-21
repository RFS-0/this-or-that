import { Component, JSX } from "solid-js"
import './styles/base-styles.css'

export type FieldContentProps = {
  children: JSX.Element
}

export const FieldContent: Component<FieldContentProps> = (props) => {
  return (
    <span class={`${'md3-field__content'}`}>
      {props?.children}
    </span>
  )
}

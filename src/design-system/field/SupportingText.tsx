import { Component, JSX } from "solid-js"
import './styles/base-styles.css'

export type SupportingTextProps = {
  children?: JSX.Element
}

export const SupportingText: Component<SupportingTextProps> = (props) => {
  return (
    <span class="md3-field__supporting-text">
      {props?.children}
    </span>
  )
}

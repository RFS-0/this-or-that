import { Component, JSX } from "solid-js"
import './styles/base-styles.css'

export type SupportingTextEndProps = {
  children?: JSX.Element
}

export const SupportingTextEnd: Component<SupportingTextEndProps> = (props) => {
  return (
    <span class="md3-field__supporting-text-end">
      {props?.children}
    </span>
  )
}

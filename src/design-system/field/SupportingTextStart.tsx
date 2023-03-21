import { Component, JSX } from "solid-js"
import './styles/base-styles.css'

export type SupportingTextStartProps = {
  supportText?: string
}

export const SupportingTextStart: Component<SupportingTextStartProps> = (props) => {
  return (
    <span class="md3-field__supporting-text-start">
      <span>
        {props?.supportText}
      </span>
    </span>
  )
}

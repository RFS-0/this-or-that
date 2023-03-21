import { Component, JSX, VoidProps } from "solid-js"
import './styles/base-styles.css'

export type RestingLabelProps = {
  ref?: HTMLElement
  visible?: boolean
  labelText?: string
} & VoidProps

export const RestingLabel: Component<RestingLabelProps> = (props) => {
  return (
    <span
      ref={props.ref}
      class={
        `
        ${'md3-field__label'}
        ${'md3-field__label--resting'}
        ${!props?.visible ? 'md3-field__label--hidden' : ''}
        `}
      aria-hidden={!props?.visible}
    >{props?.labelText || ''}</span>
  )
}

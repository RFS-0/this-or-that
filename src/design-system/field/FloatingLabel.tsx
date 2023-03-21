import { Component, VoidProps } from "solid-js"

export type FloatingLabelProps = {
  ref: HTMLElement
  visible?: boolean
  labelText?: string
} & VoidProps

export const FloatingLabel: Component<FloatingLabelProps> = (props) => {
  return (
    <span
      ref={props.ref}
      class={
        `
         ${'md3-field__label'} 
         ${'md3-field__label--floating'}
         ${!props?.visible ? 'md3-field__label--hidden' : ''}
        `}
      aria-hidden={!props?.visible}
    >{props?.labelText || ''}</span>
  )
}

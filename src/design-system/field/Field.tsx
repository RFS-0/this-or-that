import { Component, createMemo, JSX, ParentProps } from "solid-js"
import './styles/base-styles.css'
import { Container } from "./Container"
import { ContainerStart } from "./ContainerStart"
import { ContainerMiddle } from "./ContainerMiddle"
import { ContainerEnd } from "./ContainerEnd"
import { SupportingText } from "./SupportingText"
import { SupportingTextStart } from "./SupportingTextStart"
import { SupportingTextEnd } from "./SupportingTextEnd"

export type FieldProps = {
  label?: string
  containerStart?: JSX.Element
  containerMiddle?: JSX.Element
  containerEnd?: JSX.Element
  disabled?: boolean
  error?: boolean
  required?: boolean
} & ParentProps

export const Field: Component<FieldProps> = (props) => {
  const disabled = createMemo(() => props.disabled)
  const error = createMemo(() => props.error)
  const label = props?.label || ''
  const required = props?.required || false;
  const hasStart = !!props?.containerStart;
  const populated = !!props?.containerMiddle;
  const hasEnd = !!props?.containerEnd;

  return (
    <span
      class={
        `
        ${'base-field'} 
        ${'md3-field'} 
        ${disabled() ? 'md3-field--disabled' : ''} 
        ${error() ? 'md3-field--error' : ''} 
        ${hasStart ? 'md3-field--with-start' : ''}
        ${hasEnd ? 'md3-field--with-end' : ''}
        ${populated ? 'md3-field--populated' : ''}
        ${required ? 'md3-field--required' : ''}
        ${!label ? 'md3-field--no-label' : ''}
      `}
    // onFocus={() => setFocused(true)}
    >
      <Container>
        <ContainerStart>
          {props.containerStart}
        </ContainerStart>
        <ContainerMiddle>
          {props.containerMiddle}
        </ContainerMiddle>
        <ContainerEnd>
          {props.containerEnd}
        </ContainerEnd>
      </Container>
      <SupportingText>
        <SupportingTextStart></SupportingTextStart>
        <SupportingTextEnd></SupportingTextEnd>
      </SupportingText>
    </span>
  )
}

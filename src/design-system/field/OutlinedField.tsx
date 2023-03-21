import { Component, createEffect, createMemo, createSignal, JSX, ParentProps } from "solid-js"
import { Container } from "./Container"
import { ContainerStart } from "./ContainerStart"
import { ContainerMiddle } from "./ContainerMiddle"
import { ContainerEnd } from "./ContainerEnd"
import { SupportingText } from "./SupportingText"
import { SupportingTextStart } from "./SupportingTextStart"
import { SupportingTextEnd } from "./SupportingTextEnd"
import { FloatingLabel } from "./FloatingLabel"
import { RestingLabel } from "./RestingLabel"
import { FieldContent } from "./FieldContent"
import './styles/outlined-styles.css'
import { createAnimationSignal } from "../motion/animation"
import { getLabelKeyframes } from "./label-animations"


export type OutlinedFieldProps = {
  disabled?: boolean
  error?: boolean
  focused?: boolean
  populated?: boolean
  required?: boolean
  label?: string
  supportingText?: string
  hasLeadingIcon?: boolean
  leadingIcon?: JSX.Element
  hasTrailingIcon?: boolean
  trailingIcon?: JSX.Element
  classes?: string[]
} & ParentProps

type StateChange = { wasFocused: boolean, isFocused: boolean, wasPopulated: boolean, isPopulated: boolean }

export const OutlinedField: Component<OutlinedFieldProps> = (props) => {
  let restingLabel!: HTMLElement;
  let floatingLabel!: HTMLElement;

  const fieldState = createMemo((prev: StateChange) => {
    return {
      wasFocused: prev.isFocused,
      isFocused: !!props?.focused,
      wasPopulated: prev.isPopulated,
      isPopulated: !!props?.populated
    }
  },
    {
      wasFocused: false,
      isFocused: !!props?.populated,
      wasPopulated: false,
      isPopulated: !!props?.populated
    }
  )
  const labelAnimationSignal = createAnimationSignal()

  const getLabelText = () => {
    const labelText = props?.label || '';
    const optionalAsterisk = props?.required && labelText ? '*' : '';
    return labelText + optionalAsterisk;
  }

  const [animating, setAnimating] = createSignal(false)

  createEffect(() => {
    const state = fieldState()
    const wasFloating = state.wasFocused || state.wasPopulated;
    const shouldBeFloating = state.isFocused || state.isPopulated;
    if (wasFloating === shouldBeFloating) {
      return;
    }
    const signal = labelAnimationSignal.start();
    const keyframes = getLabelKeyframes(floatingLabel, restingLabel, state.isFocused || state.isPopulated ? 'restToFloat' : 'floatToRest')

    if (signal.aborted) {
      return;
    }

    setAnimating(true)
    const animation = restingLabel.animate(keyframes, { duration: 150, easing: 'cubic-bezier(0.2, 0, 0, 1)' });

    signal.addEventListener('abort', () => {
      animation.cancel();
      setAnimating(false)
    });

    animation.addEventListener('finish', () => {
      // At the end of the animation, update the visible label.
      labelAnimationSignal.finish();
      setAnimating(false)
    });
  })

  return (
    <span
      class={
        `
        ${'base-field'} 
        ${'md3-field'} 
        ${'outlined-field'} 
        md3-field--outlined 
        ${props?.disabled ? 'md3-field--disabled' : ''} 
        ${props?.error ? 'md3-field--error' : ''} 
        ${props?.focused ? 'md3-field--focused' : ''}
        ${props?.hasLeadingIcon ? 'md3-field--with-start' : ''}
        ${props?.hasTrailingIcon ? 'md3-field--with-end' : ''}
        ${props?.populated ? 'md3-field--populated' : ''}
        ${!props?.label ? 'md3-field--no-label' : ''}
        ${props?.classes?.join(' ') || ''}
      `}
    >
      <Container>
        <span class={'md3-field__outline'}>
          <span class={"md3-field__outline-start"}></span>
          <span class={"md3-field__outline-notch"}>
            <span class={"md3-field__outline-panel-inactive"}></span>
            <span class={"md3-field__outline-panel-active"}></span>
            <FloatingLabel
              ref={floatingLabel}
              visible={(props?.focused || props?.populated) && !animating()}
              labelText={getLabelText()}
            />
          </span>
          <span class={"md3-field__outline-end"}></span>
        </span>
        <ContainerStart>
          {props?.leadingIcon}
        </ContainerStart>
        <ContainerMiddle>
          <RestingLabel
            ref={restingLabel}
            visible={!(props?.focused || props?.populated) || animating()}
            labelText={getLabelText()}
          />
          <FieldContent>
            {props?.children}
          </FieldContent>
        </ContainerMiddle>
        <ContainerEnd>
          {props?.trailingIcon}
        </ContainerEnd>
      </Container>
      <SupportingText>
        <SupportingTextStart supportText={props?.supportingText}></SupportingTextStart>
        <SupportingTextEnd></SupportingTextEnd>
      </SupportingText>
    </span>
  )
}

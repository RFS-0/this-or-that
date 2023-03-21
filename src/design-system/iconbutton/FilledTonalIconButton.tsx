import { Component, createSignal, JSX, } from "solid-js"
import { FocusRing } from "../focus/FocusRing"
import { createHandlers, createRippleEventEmitter, Ripple } from "../ripple/Ripple"
import './styles/tonal-styles.css'

export type FilledTonalIconButtonProps = {
  icon?: JSX.Element
} & JSX.IntrinsicElements['button']

export const FilledTonalIconButton: Component<FilledTonalIconButtonProps> = (props) => {
  const [focus, setFocus] = createSignal(false)
  const [ripleListen, rippleEmit] = createRippleEventEmitter()

  return (
    <button
      {...createHandlers(rippleEmit)}
      class={`base-icon-button tonal-base md3-icon-button md3-icon-button--filled-tonal ${props.disabled ? 'md3-button--disabled' : ''}`}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onPointerDown={(ev) => {
        rippleEmit({ type: 'pointerdown', pointerEvent: (ev) });
        setFocus(false)
      }}
    >
      <FocusRing visible={focus()}></FocusRing>
      <Ripple listen={ripleListen} unbounded={true}></Ripple>
      <span class="md3-icon-button__touch"></span>
      <span class="md3-icon-button__icon">
        {props.icon}
      </span>
    </button>
  )
}

import { Component, createSignal, JSX, Show } from "solid-js"
import { FocusRing } from "../focus/FocusRing"
import { createHandlers, createRippleEventEmitter, Ripple } from "../ripple/Ripple"
import './styles/outlined-styles.css'

export type OutlinedIconButtonProps = {
  icon?: JSX.Element
} & JSX.IntrinsicElements['button']

export const OutlinedIconButton: Component<OutlinedIconButtonProps> = (props) => {
  const [focus, setFocus] = createSignal(false)
  const [ripleListen, rippleEmit] = createRippleEventEmitter()

  return (
    <button
      {...createHandlers(rippleEmit)}
      class={`base-icon-button md3-icon-button md3-icon-button--outlined ${props.disabled ? 'md3-button--disabled' : ''}`}
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
        {props?.children}
        {props.icon}
      </span>
    </button>
  )
}

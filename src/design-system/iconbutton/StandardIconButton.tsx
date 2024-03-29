import { Component, createSignal, JSX, Show } from "solid-js"
import { FocusRing } from "../focus/FocusRing"
import { createHandlers, createRippleEventEmitter, Ripple } from "../ripple/Ripple"
import './styles/standard-styles.css'

export type StandardIconButtonProps = {
  icon?: JSX.Element
  onClick?: (ev: MouseEvent) => void
} & JSX.IntrinsicElements['button']

export const StandardIconButton: Component<StandardIconButtonProps> = (props) => {
  const [focus, setFocus] = createSignal(false)
  const [ripleListen, rippleEmit] = createRippleEventEmitter()


  const handleClick = (e: MouseEvent) => {
    rippleEmit({ type: 'click', pointerEvent: (e) });
    props.onClick && props.onClick(e)
  }

  return (
    <button
      {...props}
      {...createHandlers(rippleEmit)}
      class={`base-icon-button md3-icon-button md3-icon-button--standard ${props.disabled ? 'md3-button--disabled' : ''}`}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onPointerDown={(ev) => {
        rippleEmit({ type: 'pointerdown', pointerEvent: (ev) });
        setFocus(false)
      }}
      onClick={handleClick}
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

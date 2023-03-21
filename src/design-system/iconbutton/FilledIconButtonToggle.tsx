import { Component, createSignal, JSX, Show } from "solid-js"
import { FocusRing } from "../focus/FocusRing"
import { createHandlers, createRippleEventEmitter, Ripple } from "../ripple/Ripple"
import './styles/filled-styles.css'

export type FilledIconToggleButtonProps = {
  selected?: boolean
  onIcon: JSX.Element
  offIcon: JSX.Element
} & JSX.IntrinsicElements['button']

export const FilledIconToggleButton: Component<FilledIconToggleButtonProps> = (props) => {
  const [focus, setFocus] = createSignal(false)
  const [ripleListen, rippleEmit] = createRippleEventEmitter()

  const [selected, setSelected] = createSignal(props?.selected || false)

  return (
    <button
      {...createHandlers(rippleEmit)}
      class={`base-icon-button filled-base md3-icon-button md3-icon-button--filled ${props.disabled ? 'md3-button--disabled' : ''}`}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onPointerDown={(e) => {
        rippleEmit({ type: 'pointerdown', pointerEvent: (e) });
        setFocus(false)
      }}
      onClick={(e) => {
        rippleEmit({ type: 'click', pointerEvent: (e) });
        setSelected(!selected())
      }}
    >
      <FocusRing visible={focus()}></FocusRing>
      <Ripple listen={ripleListen} unbounded={true}></Ripple>
      <span class="md3-icon-button__touch"></span>
      <span class="md3-icon-button__icon">
        <Show when={selected()} fallback={props.offIcon}>
          {props.onIcon}
        </Show>
      </span>
    </button>
  )
}

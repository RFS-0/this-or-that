import { Component, createSignal, JSX } from "solid-js"
import { FocusRing } from "../focus/FocusRing"
import { createHandlers, createRippleEventEmitter, Ripple } from "../ripple/Ripple"
import './styles/outlined-styles.css'

export type OutlinedLinkIconButtonProps = {
  linkHref: string
  linkTarget: string
  icon?: JSX.Element
} & JSX.IntrinsicElements['div']

export const OutlinedLinkIconButton: Component<OutlinedLinkIconButtonProps> = (props) => {
  const [focus, setFocus] = createSignal(false)
  const [ripleListen, rippleEmit] = createRippleEventEmitter()

  return (
    <div
      {...createHandlers(rippleEmit)}
      class={`base-icon-button md3-icon-button md3-icon-button--outlined`}
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
      <a class="md3-icon-button__link"
        href="https://www.google.ch"
        target="_blank"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onPointerDown={(ev) => {
          rippleEmit({ type: 'pointerdown', pointerEvent: (ev) });
          setFocus(false)
        }}
      >
      </a>
    </div >
  )
}

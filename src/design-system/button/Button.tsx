import { createSignal, JSX, Show, VoidProps } from "solid-js";
import { Elevation } from "../elevation/Elevation";
import { FocusRing } from "../focus/FocusRing"
import { createHandlers, createRippleEventEmitter, Ripple } from "../ripple/Ripple"
import './styles/base-styles.css'


export type ButtonProps = {
  variant?: 'filled' | 'outlined' | 'elevated' | 'tonal' | 'text'
  color?: 'primary' | 'primary-container'
  onClick?: (ev: MouseEvent) => void
  label?: string;
  disabled?: boolean;
  leadingIcon?: JSX.Element;
  trailingIcon?: JSX.Element;
  ref?: HTMLButtonElement;
  preventClickDefault?: boolean;
  ariaHasPopup?: boolean;
  ariaLabel?: string;
} & VoidProps

export const Button = (props: ButtonProps) => {
  const [ripleListen, rippleEmit] = createRippleEventEmitter()

  const [showFocusRing, setShowFocusRing] = createSignal(false)

  const handlePointerDown = (e: PointerEvent) => {
    rippleEmit({ type: 'pointerdown', pointerEvent: (e) });
    setShowFocusRing(true)
  }

  const handleClick = (e: MouseEvent) => {
    rippleEmit({ type: 'pointerdown', pointerEvent: (e) });
    if (props?.preventClickDefault) {
      e.preventDefault()
    }
    props.onClick && props.onClick(e)
  }

  return (
    <button
      ref={props.ref}
      class={
        `
        ${'base-button md3-button'} 
        ${!!props.color ? 'md3-button--' + props.color : ''} 
        ${!!props?.leadingIcon ? 'md3-button--icon-leading' : ''} 
        ${!!props?.trailingIcon ? 'md3-button--icon-trailing' : ''} 
        ${props?.variant === 'elevated' ? 'base-elevated-button  md3-button--elevated' : ''}
        ${props?.variant === 'filled' ? 'base-filled-button  md3-button--filled' : ''}
        ${props?.variant === 'outlined' ? 'base-outlined-button  md3-button--outlined' : ''}
        ${props?.variant === 'tonal' ? 'base-tonal-button  md3-button--tonal tonal-button--primary' : ''}
        ${props?.variant === 'text' ? 'base-text-button' : ''}
        `
      }
      disabled={props?.disabled || false}
      aria-label={props?.ariaLabel || ''}
      aria-haspopup={props?.ariaHasPopup || false}
      {...createHandlers(rippleEmit)}
      onPointerDown={handlePointerDown}
      onFocus={() => setShowFocusRing(true)}
      onBlur={() => setShowFocusRing(false)}
      onClick={handleClick}
    >
      <FocusRing visible={showFocusRing()}></FocusRing>
      <Show when={props.variant === 'elevated' || props.variant === 'filled' || props.variant === 'tonal'}>
        <Elevation shadow={true} surface={props.variant !== 'tonal' ? true : false} />
      </Show>
      <Ripple listen={ripleListen} unbounded={true}></Ripple>
      <Show when={props?.variant === 'outlined'}>
        <span class="md3-button__outline"></span>
      </Show>
      <span class="md3-button__touch"></span>
      <Show when={!!props?.leadingIcon}>
        <span class="md3-button__icon-slot-container md3-button__icon--leading">
          {props.leadingIcon}
        </span>
      </Show>
      <Show when={!!props?.label}>
        <span class="md3-button__label">
          {props.label}
        </span>
      </Show>
      <Show when={!!props?.trailingIcon}>
        <span class="md3-button__icon-slot-container md3-button__icon--trailing">
          {props.trailingIcon}
        </span>
      </Show>
    </button>
  );
}

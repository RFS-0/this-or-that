import { createSignal, Show } from 'solid-js'
import { FocusRing } from '../focus/FocusRing'
import { createHandlers, createRippleEventEmitter, Ripple } from '../ripple/Ripple'
import './styles/base-styles.css'

export type SwitchProps = {
  selected?: boolean
  disabled?: boolean
  icons?: boolean
  showOnlySelectedIcon?: boolean
  ariaLabel?: string
}

export const Switch = (props: SwitchProps) => {
  let switchRef!: HTMLButtonElement
  const [selected, setSelected] = createSignal(props.selected || false)
  const [disabled, setDisabled] = createSignal(props.disabled || false)
  const [focused, setFocused] = createSignal(false)
  const [ripleListen, rippleEmit] = createRippleEventEmitter()

  const handleClick = () => {
    if (props?.disabled) {
      return;
    }
    setSelected(!selected())
    switchRef.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true }));
    // Bubbles but does not compose to mimic native browser <input> & <select>
    // Additionally, native change event is not an InputEvent.
    switchRef.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const handlePointerDown = (e: PointerEvent) => {
    rippleEmit({ type: 'pointerdown', pointerEvent: (e) });
    setFocused(true);
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  const shouldShowIcons = () => {
    return props?.icons || props?.showOnlySelectedIcon;
  }


  return (
    <button
      ref={switchRef}
      class={
        `
        base-switch
        md3-switch
        ${selected() ? 'md3-switch--selected' : ''}
        ${!selected() ? 'md3-switch--unselected' : ''}
        `
      }
      role={'switch'}
      disabled={props?.disabled}
      aria-checked={props?.selected}
      aria-label={props?.ariaLabel || undefined}
      {...createHandlers(rippleEmit)}
      onPointerDown={handlePointerDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      <FocusRing visible={focused()}></FocusRing>
      <span class="md3-switch__track">
        <span class="md3-switch__handle-container">
          <span class="md3-switch__ripple">
            <Ripple listen={ripleListen} unbounded={true}></Ripple>
          </span>
          <span
            class={
              `md3-switch__handle 
             ${props?.icons && !props?.showOnlySelectedIcon ? 'md3-switch__handle--big' : ''}
             `
            }
          >
            <Show when={shouldShowIcons()}>
              <div class="md3-switch__icons">
                <svg class="md3-switch__icon md3-switch__icon--on" viewBox="0 0 24 24">
                  <path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
                </svg>
                <Show when={!props?.showOnlySelectedIcon}>
                  <svg class="md3-switch__icon md3-switch__icon--off" viewBox="0 0 24 24">
                    <path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
                  </svg>
                </Show>
              </div>
            </Show>
          </span>
          <span class="md3-switch__touch"></span>
          <span>
          </span>
        </span>
      </span >
    </button >
  )
}

import { createEffect, createSignal, onMount } from 'solid-js'
import { createHandlers, createRippleEventEmitter, Ripple } from '../ripple/Ripple'
import './styles/base-styles.css'

export type CheckboxProps = {
  checked?: boolean
  disabled?: boolean
  error?: boolean
  indeterminate?: boolean
  value?: string
  name?: string
  form?: HTMLFormElement
  ariaHasPopup?: boolean;
  ariaLabel?: string;
}


type StateChange = {
  wasChecked: boolean,
  isChecked: boolean,
  wasDisabled: boolean,
  isDisabled: boolean,
  wasIndeterminate: boolean,
  isIndeterminate: boolean,
  isError: boolean,
  wasError: boolean,
}

export const Checkbox = (props: CheckboxProps) => {
  let checkbox!: HTMLInputElement
  const [state, setState] = createSignal<StateChange>({
    wasChecked: false,
    isChecked: props?.checked || false,
    wasDisabled: false,
    isDisabled: props?.disabled || false,
    wasIndeterminate: false,
    isIndeterminate: props?.indeterminate || false,
    wasError: false,
    isError: props?.error || false,
  })

  const [showFocusRing, setShowFocusRing] = createSignal(false)
  const [ripleListen, rippleEmit] = createRippleEventEmitter()


  const ariaCheckedValue = () => {
    if (state().isIndeterminate) return 'mixed'
    if (state().isChecked) return 'true'
    return 'false'
  }

  const handlePointerDown = (e: PointerEvent) => {
    rippleEmit({ type: 'pointerdown', pointerEvent: (e) });
    setShowFocusRing(true)
  }

  const handleClick = (e: MouseEvent) => {
    rippleEmit({ type: 'pointerdown', pointerEvent: (e) });
  }

  const handleBlur = (_: FocusEvent) => {
    setShowFocusRing(false)
  }

  const handleFocus = (_: FocusEvent) => {
    setShowFocusRing(true)
  }

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    setState({
      ...state(),
      wasChecked: state().isChecked,
      isChecked: target.checked,
      wasDisabled: state().isDisabled,
      isDisabled: target.disabled,
      wasIndeterminate: state().isIndeterminate,
      isIndeterminate: target.indeterminate,
    })
  }

  onMount(() => {
    createEffect(() => {
      checkbox.indeterminate = state().isIndeterminate
    })
  })

  return (
    <div class='base-checkbox'>
      <div
        class={
          `
            container
            ${state().isChecked || state().isIndeterminate ? 'selected' : ''}
            ${!state().isChecked && !state().isIndeterminate ? 'unselected' : ''}
            ${state().isChecked ? 'checked' : ''}
            ${state().isIndeterminate ? 'indeterminate' : ''}
            ${state().isError && !props?.disabled ? 'error' : ''}
            ${!state().wasChecked && !state().wasIndeterminate ? 'prev-unselected' : ''}
            ${state().wasChecked && !state().wasIndeterminate ? 'prev-checked' : ''}
            ${state().wasIndeterminate ? 'prev-indeterminate' : ''}
            ${state().wasDisabled ? 'prev-disabled' : ''}
            `
        }
      >
        <div class="outline"></div>
        <div class="background"></div>
        {/* <FocusRing visible={showFocusRing()}></FocusRing> */}
        <Ripple listen={ripleListen} unbounded={true}></Ripple>
        <svg class="icon" viewBox="0 0 18 18">
          <rect class="mark short" />
          <rect class="mark long" />
        </svg>
      </div>
      <input
        ref={checkbox}
        type="checkbox"
        aria-checked={ariaCheckedValue()}
        aria-label={`${props?.ariaLabel || ''}`}
        disabled={state().isDisabled}
        checked={state().isChecked}
        {...createHandlers(rippleEmit)}
        onBlur={handleBlur}
        onPointerDown={handlePointerDown}
        onFocus={handleFocus}
        onClick={handleClick}
        onChange={handleChange}
      ></input>
    </div>
  )
}

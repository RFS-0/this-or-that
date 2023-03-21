import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { dispatchActivationClick, isActivationClick } from '../controller/events'
import { FocusRing } from '../focus/FocusRing'
import { createHandlers, createRippleEventEmitter, Ripple } from '../ripple/Ripple'
import { SingleSelectionController } from './single-selection-controller'
import './styles/base-styles.css'
export type RadioProps = {
  value: string
  name?: string
  checked?: boolean
  disabled?: boolean
  reducedTouchTarget?: boolean
  formElementTabIndex?: number
  ariaLabel?: string
}

export const Radio = (props: RadioProps) => {
  let radio!: HTMLInputElement
  let selectionController: SingleSelectionController
  let focused = false
  const [checked, setChecked] = createSignal(props?.checked || false)
  let disabled = props?.disabled || false
  let reducedTouchTarget = props?.reducedTouchTarget || false
  let showFocusRing = false
  let formElementTabIndex = props?.formElementTabIndex || 0


  const [ripleListen, rippleEmit] = createRippleEventEmitter()

  const handleClick = (event: MouseEvent) => {
    if (!isActivationClick(event)) {
      return;
    }
    focus();
    dispatchActivationClick(radio);
  }

  const handleChange = () => {
    if (disabled) {
      return;
    }
    // Per spec, the change event on a radio input always represents checked.
    setChecked(true)
    dispatchEvent(new Event('change', {
      bubbles: true,
      composed: true,
    }));
  }

  const handleFocus = () => {
    focused = true;
  }

  const handleBlur = () => {
    focused = false;
    showFocusRing = false;
  }

  const handlePointerDown = (e: MouseEvent) => {
    rippleEmit({ type: 'pointerdown', pointerEvent: (e) });
  }

  onMount(() => {
    selectionController = SingleSelectionController.getController(radio);
    selectionController.register(radio);
    // Radios maybe checked before connected, update selection as soon it is
    // connected to DOM. Last checked radio button in the DOM will be selected.
    //
    // NOTE: If we update selection only after firstUpdate() we might mistakenly
    // update checked status before other radios are rendered.
    selectionController.update(radio);
  })

  createEffect(() => {
    radio.checked = checked()
    if (!checked()) {
      radio.blur()
    }
  })

  onCleanup(() => {
    selectionController.unregister(radio);
  })

  return (
    <div
      ref={radio}
      class={
        `
       base-radio
       md3-radio
       ${reducedTouchTarget ? 'md3-radio--touch' : ''}
       ${focused ? 'md3-ripple-upgraded--background-focused' : ''}
       ${disabled ? 'md3-radio--disabled' : ''}
        `
      }
    >
      <FocusRing visible={showFocusRing} />
      <input
        tabindex={formElementTabIndex}
        class="md3-radio__native-control"
        type="radio"
        name={props?.name}
        aria-label={props?.ariaLabel || ''}
        checked={checked()}
        value={props.value}
        disabled={disabled}
        {...createHandlers(rippleEmit)}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></input>
      <div class="md3-radio__background">
        <div class="md3-radio__outer-circle"></div>
        <div class="md3-radio__inner-circle"></div>
      </div>
      <div class="md3-radio__ripple">
        <Ripple listen={ripleListen} unbounded={true}></Ripple>
      </div>
    </div>
  )
}

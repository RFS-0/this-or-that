import { Component, createEffect, createSignal, JSX } from "solid-js"
import { FilledField } from "../field/FilledField"
import { v4 as uuidv4 } from 'uuid'
import { redispatchEvent } from '../controller/events'
import { ARIAAttributes } from "../aria/aria"
import './styles/outlined-styles.css'

export type FilledTextFieldProps = {
  form?: HTMLFormElement
  name?: string
  disabled?: boolean
  error?: boolean
  focused?: boolean
  required?: boolean
  label?: string
  leadingIcon?: JSX.Element
  trailingIcon?: JSX.Element
  errorText?: string
  value?: string
  onChange?: (e: Event & { target: HTMLInputElement }) => void
  defaultValue?: string
  prefixText?: string
  suffixText?: string
  supportingText?: string
  max?: string
  maxLength?: number
  min?: string
  minLength?: number
  pattern?: string
  placeholder?: string
  step?: string
  readOnly?: boolean
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'color' | 'date' |
  'datetime-local' | 'file' | 'month' | 'time' | 'week'
  aria?: ARIAAttributes
}

export const FilledTextField: Component<FilledTextFieldProps> = (props) => {
  let input!: HTMLInputElement;
  let textField!: HTMLElement;

  const [value, setValue] = createSignal(props?.value || props?.defaultValue || '');
  const [dirty, setDirty] = createSignal(false);
  const [focused, setFocused] = createSignal(props?.focused || false);
  const [refreshErrorAlert, setRefreshErrorAlert] = createSignal(false);

  const counterId = uuidv4();
  const supportTextId = uuidv4();

  let valueHasChanged = false;
  let ignoreNextValueChange = false;
  let errorText = props.errorText || '';
  let nativeError = false;
  let nativeErrorText = '';

  const checkValidityAndDispatch = () => {
    const valid = input.checkValidity();
    let cancelled = false;
    if (!valid) {
      cancelled = !input.dispatchEvent(new Event('invalid', { cancelable: true }));
    }

    return { valid, cancelled };
  };
  const validationMessage = () => input?.validationMessage || '';

  const checkValidity = () => {
    const { valid } = checkValidityAndDispatch();
    return valid;
  };
  const getError = () => {
    return props?.error || nativeError;
  };
  const getErrorText = () => {
    return props?.error ? errorText : nativeErrorText;
  }
  const shouldErrorAnnounce = () => {
    return getError() && !getErrorText() && !refreshErrorAlert();
  }

  const reportValidity = () => {
    const { valid, cancelled } = checkValidityAndDispatch();
    if (!cancelled) {
      const prevMessage = getErrorText();
      nativeError = !valid;
      nativeErrorText = validationMessage();

      const needsRefresh = shouldErrorAnnounce() && prevMessage === getErrorText();
      if (needsRefresh) {
        setRefreshErrorAlert(true);
      }
    }
    return valid;
  };
  const setCustomValidity = (message: string) => {
    input.setCustomValidity(message);
  };
  const validity = () => input?.validity || null;

  const reset = () => {
    setDirty(false);
    valueHasChanged = false;
    ignoreNextValueChange = true;
    setValue(props?.defaultValue || '')
    nativeError = false;
    nativeErrorText = '';
  }

  const focus = () => {
    if (props?.disabled || input.matches(':focus-within')) {
      return;
    }
    input.focus();
  };

  const focusIn = () => {
    setFocused(true);
  };

  const focusOut = () => {
    if (input.matches(':focus-within')) {
      return;
    }
    setFocused(false);
  };

  const blur = () => {
    input.blur();
  };

  const select = () => {
    input.select();
  };

  const getSupportingText = () => {
    const errorText = getErrorText();
    return getError() && errorText ? errorText : props?.supportingText;
  }

  const hasCounter = () => {
    return props.maxLength && props.maxLength > -1
  }


  const getAriaDescribedBy = () => {
    const hasSupport = !!getSupportingText();
    return (hasSupport || hasCounter()) ?
      `${hasSupport ? supportTextId : ''} ${hasCounter() ? counterId : ''}` : '';
  }


  const getInputValue = () => {
    const alwaysShowValue = dirty() || valueHasChanged;
    return alwaysShowValue ? value() : props?.defaultValue || value();
  }

  const handleInput = (e: Event) => {
    setDirty(true);
    setValue((e.target as HTMLInputElement).value);
    redispatchEvent(textField, e)
  }

  const handleChange = (e: Event) => {
    if (!e.target || !(e.target instanceof HTMLInputElement)) {
      console.error('event not from an input element')
      return
    }
    const event = e as Event & { target: HTMLInputElement };
    props.onChange && props.onChange(event)
    redispatchEvent(textField, e)
  }

  createEffect(() => {
    if (refreshErrorAlert()) {
      requestAnimationFrame(() => {
        setRefreshErrorAlert(false);
      })
    }
  })

  createEffect(() => {
    const valueDifferentFromDefault = value() !== (props?.defaultValue || '')
    if (valueDifferentFromDefault && !ignoreNextValueChange) {
      valueHasChanged = true;
    }

    if (ignoreNextValueChange) {
      ignoreNextValueChange = false;
    }
  })

  return (
    <span
      ref={textField}
      class={
        `
        ${'md3-text-field outlined-text-field'} 
        ${props?.disabled ? 'md3-text-field--disabled' : ''} 
        ${props?.error ? 'md3-text-field--error' : ''} 
      `}
    >
      <FilledField
        leadingIcon={
          <span
            class={`
                   ${'md3-text-field__icon'}
                   ${'md3-text-field__icon--leading'}
                   `}
          >{props?.leadingIcon}</span>
        }
        hasLeadingIcon={!!props?.leadingIcon}
        trailingIcon={
          <span
            class={`
                   ${'md3-text-field__icon'}
                   ${'md3-text-field__icon--trailing'}
                   `
            }
          >
            {props?.trailingIcon}</span>
        }
        hasTrailingIcon={!!props?.trailingIcon}
        classes={[`${'md3-text-field__field'}`]}
        disabled={props?.disabled}
        error={getError()}
        supportingText={getSupportingText()}
        focused={focused()}
        label={props?.label}
        populated={!!getInputValue()}
        required={props?.required}
      >
        <span
          class={`
                 ${'md3-text-field__prefix'}
                 `
          }
        >
          {props?.prefixText}
        </span>
        <input
          ref={input}
          class={`${'md3-text-field__input'}`}
          aria-activedescendant={`${props?.aria?.activeDescendant || ''}`}
          aria-autocomplete={`${props?.aria?.autocomplete || 'none'}`}
          aria-controls={`${props?.aria?.controls || ''}`}
          aria-describedby={`${getAriaDescribedBy() || ''}`}
          aria-expanded={`${props?.aria?.expanded || 'false'}`}
          aria-invalid={getError()}
          aria-label={`${props?.aria?.label || props?.label || ''}`}
          aria-labelledby={`${props?.aria?.labelledBy || ''}`}
          disabled={props?.disabled}
          max={props?.max}
          maxlength={props?.maxLength}
          min={props?.min}
          minlength={props?.minLength}
          pattern={props?.pattern}
          placeholder={props?.placeholder}
          role={props?.aria?.role}
          readonly={props?.readOnly}
          required={props?.required}
          step={props?.step}
          type={props?.type}
          value={getInputValue()}
          onFocusIn={focusIn}
          onFocusOut={focusOut}
          onClick={focus}
          onChange={e => handleChange(e)}
          onInput={e => handleInput(e)}
          onSelect={e => redispatchEvent(textField, e)}
        >
        </input>
        <span
          class={`
                 ${'md3-text-field__suffix'}
                  `
          }
        >
          {props?.suffixText}
        </span>
      </FilledField >
    </span >
  )
}

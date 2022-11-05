import { Component } from 'solid-js'

export type NumberInputProps = {
  id: string
  name: string
  label: string
  step?: number
  defaultValue?: number
}

const NumberInput: Component<NumberInputProps> = (props) => {
  return (
    <>
      <label for={props.id} class='block text-gray-700'>
        {props.label}
      </label>
      <input
        id={props.id}
        type='number'
        name={props.name}
        class='mt-1
               block
               w-full
               rounded-md
               bg-gray-100
               border-transparent
               focus:border-gray-500 focus:bg-white focus:ring-0'
        value={props.defaultValue || ''}
        step={props?.step || 1}
      />
    </>
  )
}

export { NumberInput }

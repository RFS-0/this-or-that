import { Component } from 'solid-js'

export type TextAreaInputProps = {
  id: string
  name: string
  label: string
  defaultValue?: string
}

const TextAreaInput: Component<TextAreaInputProps> = (props) => {
  return (
    <>
      <label for={props.id} class='block text-gray-700'>
        {props.label}
      </label>
      <textarea
        id={props.id}
        name={props.name}
        rows='5'
        class='mt-1
               block
               w-full
               rounded-md
               bg-gray-100
               border-transparent
               focus:border-gray-500 focus:bg-white focus:ring-0'
      >
        {props.defaultValue || ''}
      </textarea>
    </>
  )
}

export { TextAreaInput }

import { Component, JSX } from 'solid-js'

export type SelectInputProps = {
  id: string
  name: string
  label: string
  children: JSX.Element
}

const SelectInput: Component<SelectInputProps> = (props) => {
  return (
    <>
      <label for={props.id} class='block text-gray-700'>
        {props.label}
      </label>
      <select
        id={props.id}
        name={props.name}
        class='mt-1
               block
               w-full
               rounded-md
               bg-gray-100
               border-transparent
               focus:border-gray-500 focus:bg-white focus:ring-0'
      >
        {props.children}
      </select>
    </>
  )
}

export { SelectInput }

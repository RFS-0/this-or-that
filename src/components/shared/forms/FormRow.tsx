import { Component, JSX } from 'solid-js'

export type FormRowProps = {
  children: JSX.Element
}

const FormRow: Component<FormRowProps> = (props) => {
  return (
    <>
      <div class='col-span-6 sm:col-span-5 md:col-span-4'>{props.children}</div>
      <div class='col-auto sm:col-span-1 md:col-span-2'></div>
    </>
  )
}

export { FormRow }

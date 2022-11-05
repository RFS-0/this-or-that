import { Component, JSX } from 'solid-js'

export type ButtonProps = {
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
  children?: JSX.Element
}

const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      type={props.type || 'button'}
      class='rounded-md 
             border 
             border-transparent 
             bg-indigo-600 
             py-2 
             px-4 text-sm 
             font-medium 
             text-white 
             shadow-sm 
             hover:bg-indigo-700 
             focus:outline-none 
             focus:ring-2 
             focus:ring-indigo-500 
             focus:ring-offset-2'
      onClick={props?.onClick}
    >
      {props.children}
    </button>
  )
}

export { Button }

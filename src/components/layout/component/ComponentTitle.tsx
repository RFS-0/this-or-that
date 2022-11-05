import { Component, JSX } from 'solid-js'

export type ComponentTitleProps = {
  children: JSX.Element
}

const ComponentTitle: Component<ComponentTitleProps> = (props) => {
  return <h2 class='text-2xl font-bold'>{props.children}</h2>
}

export { ComponentTitle }

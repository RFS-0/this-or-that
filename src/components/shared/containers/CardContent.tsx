import { Component, JSX } from 'solid-js'

type CardContentProps = {
  children: JSX.Element
}

const CardContent: Component<CardContentProps> = (props) => {
  return <p class='text-gray-700 text-base'>{props.children}</p>
}

export { CardContent }

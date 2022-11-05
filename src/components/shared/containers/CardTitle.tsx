import { Component, JSX } from 'solid-js'

type CardTitleProps = {
  children: JSX.Element
}

const CardTitle: Component<CardTitleProps> = (props) => {
  return <div class='font-bold text-xl mb-2'>{props.children}</div>
}

export { CardTitle }

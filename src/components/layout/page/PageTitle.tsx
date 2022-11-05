import { Component, JSX } from 'solid-js'

export type PageTitleProps = {
  children: JSX.Element
}

const PageTitle: Component<PageTitleProps> = (props) => {
  return <h2 class='text-3xl font-bold'>{props.children}</h2>
}

export { PageTitle }

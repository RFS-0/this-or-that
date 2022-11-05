import { Component, JSX } from 'solid-js'

type CardProps = {
  children?: JSX.Element
}

const Card: Component<CardProps> = (props) => {
  return (
    <div class='flex flex-col h-auto rounded-md border border-slate-100 shadow-xl p-0.5 xs:p-1 sm:p-2 md:p-4'>
      {props.children}
    </div>
  )
}

export { Card }

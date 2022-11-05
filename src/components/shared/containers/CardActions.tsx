import { Component, JSX } from 'solid-js'

type CardActionsProps = {
  children: JSX.Element
}

const CardActions: Component<CardActionsProps> = (props) => {
  return (
    <div class='flex flex-auto content-end flex-row-reverse flex-wrap  my-0.5 xs:my-2 sm:my-4 pt-0.5 xs:pt-2 sm:pt-4'>
      {props.children}
    </div>
  )
}

export { CardActions }

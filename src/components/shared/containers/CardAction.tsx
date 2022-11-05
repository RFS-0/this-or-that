import { Link } from '@solidjs/router'
import { Component, JSX } from 'solid-js'

type CardActionProps = {
  link: string
  name: string
  children: JSX.Element
}

const CardAction: Component<CardActionProps> = (props) => {
  return (
    <Link href={props.link}>
      <button class='flex items-center flex-wrap rounded-md py-3 px-3 hover:bg-indigo-200 hover:shadow'>
        {props.children}
        <span class='pl-2'>{props.name}</span>
      </button>
    </Link>
  )
}

export { CardAction }

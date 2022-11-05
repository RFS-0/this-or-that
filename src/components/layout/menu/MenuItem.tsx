import { A } from '@solidjs/router'
import { Component, JSX } from 'solid-js'

type MenuItemProps = {
  name: string
  link: string
  children: JSX.Element
}

const MenuItem: Component<MenuItemProps> = (props) => {
  return (
    <A
      href={props.link}
      activeClass='bg-gray-200'
      class='flex flex-col items-center sm:items-start sm:flex-row flex-auto p-2 md:p-4 hover:bg-gray-200'
    >
      {props.children}
      <span class='ml-0.5 sm:ml-2 md:ml-4 sm:whitespace-nowrap'>
        {props.name}
      </span>
    </A>
  )
}

export { MenuItem }

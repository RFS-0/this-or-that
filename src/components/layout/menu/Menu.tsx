import { Component, JSX } from 'solid-js'

type MenuProps = {
  children: JSX.Element
}

const Menu: Component<MenuProps> = (props) => {
  return (
    <>
      {props.children}
    </>
  )
}

export { Menu }

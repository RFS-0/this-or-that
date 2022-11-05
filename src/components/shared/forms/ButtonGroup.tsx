import { FlowComponent, For, JSX } from 'solid-js'

export type ButtonGroupProps = {
  children: JSX.Element[]
}

const ButtonGroup: FlowComponent<ButtonGroupProps> = (props) => {
  return (
    <div class='flex flex-row-reverse sm:flex-row'>
      <For each={props.children}>
        {(button) => <div class='mr-2 my-2'>{button}</div>}
      </For>
    </div>
  )
}

export { ButtonGroup }

import { VoidProps } from "solid-js";
import { Icon } from "../../icon";
import './styles/base-styles.css'

export type ListIconProps = {
  icon: string
} & VoidProps

export const ListIcon = (props: ListIconProps) => {
  return (
    <div class="base-list-icon md3-list-item__icon">
      <Icon>
        <span class="material-symbols-rounded">
          {props.icon}
        </span>
      </Icon>
    </div>
  )
}

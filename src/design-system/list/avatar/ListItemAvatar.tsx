import { VoidProps } from "solid-js";
import './styles/base-styles.css'

export type ListItemAvatarProps = {
  avatar: string;
  altText?: string;
} & VoidProps

export const ListItemAvatar = (props: ListItemAvatarProps) => {
  return (
    <img
      class="base-avatar md3-list-item__avatar"
      src={props.avatar}
      alt={props?.altText || undefined}
    ></img>
  )
}

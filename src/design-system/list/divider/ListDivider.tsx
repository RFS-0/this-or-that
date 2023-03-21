import './styles/base-styles.css'

export type ListDividerProps = {
}

export const ListDivider = (props: ListDividerProps) => {
  return (
    <li
      role="separator"
      class="base-list-divider md3-list__divider">
    </li>
  )
}

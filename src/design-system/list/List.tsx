import { onMount, ParentProps } from "solid-js";
import { v4 as uuidv4 } from 'uuid'
import { activateListItem, deactivateListItem, isListItemActive, ListItemProps } from "./item/ListItem";
import './styles/base-styles.css'

export type ListProps = {
  variant?: 'surface' | 'surface1' | 'surface2' | 'surface3' | 'surface4'
  role?: 'list' | 'menu';
  ariaLabel?: string;
  listTabIndex?: number;
} & ParentProps;

const NAVIGATABLE_KEYS = {
  ArrowDown: 'ArrowDown',
  ArrowUp: 'ArrowUp',
  Home: 'Home',
  End: 'End',
};

export const List = (props: ListProps) => {
  const listId = uuidv4()

  let list!: HTMLUListElement;
  let listItems: HTMLLIElement[] = []
  let activeListItem!: HTMLLIElement


  let listTabIndex = props.listTabIndex || 0;

  const firstItem = () => listItems[0]
  const lastItem = () => listItems[listItems.length - 1]

  const nextItem = (currentItem: HTMLLIElement) => {
    const curIndex = listItems.indexOf(currentItem);
    return listItems[(curIndex + 1) % listItems.length];
  }

  const previousItem = (currentItem: HTMLLIElement) => {
    const curIndex = listItems.indexOf(currentItem);
    return listItems[curIndex === 0 ? listItems.length - 1 : curIndex - 1];
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (Object.values(NAVIGATABLE_KEYS).indexOf(event.key) === -1) return

    for (const item of listItems) {
      if (isListItemActive(item)) {
        activeListItem = item
      }

      deactivateListItem(item)
    }

    if (event.key === NAVIGATABLE_KEYS.ArrowDown) {
      event.preventDefault()
      if (activeListItem) {
        activeListItem = nextItem(activeListItem);
      } else {
        activeListItem = firstItem()
      }
    }

    if (event.key === NAVIGATABLE_KEYS.ArrowUp) {
      event.preventDefault()
      if (activeListItem) {
        activeListItem = previousItem(activeListItem)
      } else {
        activeListItem = lastItem();
      }
    }

    if (event.key === NAVIGATABLE_KEYS.Home) {
      event.preventDefault();
      activeListItem = firstItem();
    }

    if (event.key === NAVIGATABLE_KEYS.End) {
      event.preventDefault();
      activeListItem = lastItem();
    }

    if (activeListItem) {
      activateListItem(activeListItem);
    }
  }

  onMount(() => {
    listItems = Array.from(list.querySelectorAll('li'))
  })

  return (
    <ul
      ref={list}
      class={
        `
        base-list
        md3-list
        ${!!props.variant ? 'md3-list--' + props.variant : 'md3-list--surface'}
        `
      }
      id={listId}
      tabindex={listTabIndex}
      aria-label={props?.ariaLabel || ''}
      role={props?.role || 'list'}
    >
      {props?.children}
      <div class="md3-elevation-overlay"></div>
    </ul>
  )
}

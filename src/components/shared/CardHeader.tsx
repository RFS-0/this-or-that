import { Component, createSignal, JSX, Show, Signal } from 'solid-js';
import { Icon, ListIcon, ListItem, Menu, StandardIconButton, Title } from '../../design-system';

export type CardHeaderProps = {
  title: string;
  leadingIcon?: JSX.Element;
  size: Signal<'small' | 'large'>;
  contextMenuItems?: JSX.Element;
}

export const CardHeader: Component<CardHeaderProps> = (props) => {
  let contextMenuButton!: HTMLButtonElement

  const openContextMenu = createSignal(false)
  const [isContextMenuOpen, setContextMenuOpen] = openContextMenu
  const [size, setSize] = props.size

  return (
    <div class='flex flex-row items-center p-f4 sm:p-f5 md:p-f6 lg:p-f7 sm:gap-f5 md:gap-f6 lg:gap-f7'>
      <Show when={props.leadingIcon}>
        {props.leadingIcon}
      </Show>
      <div class='flex-auto'>
        <Title size='large'>{props.title}</Title>
      </div>
      <div>
        <StandardIconButton
          color='primary'
          ref={contextMenuButton}
          onClick={() => setContextMenuOpen(!isContextMenuOpen())}
          icon={<Icon><span class="material-symbols-outlined">more_vert</span></Icon>}
        ></StandardIconButton>
        <Menu
          anchor={contextMenuButton}
          open={openContextMenu}
        >
          <ListItem
            headline={size() === 'small' ? 'Enlarge card' : 'Shrink card'}
            onClick={() => setSize(size() === 'small' ? 'large' : 'small')}
            end={<ListIcon icon={'arrow_right'} />}
          ></ListItem>
          {props.contextMenuItems}
        </Menu>
      </div>
    </div>
  );
}

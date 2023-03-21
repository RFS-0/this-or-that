import { ParentProps, Signal } from "solid-js";
import { List } from "../list/List";
import { Corner } from "../menusurface/constants";
import { MenuSurface } from "../menusurface/MenuSurface";
import './styles/base-styles.css'

export type DefaultFocusState = 'NONE' | 'LIST_ROOT' | 'FIRST_ITEM' | 'LAST_ITEM';

export type MenuProps = {
  anchor: HTMLElement;
  open: Signal<boolean>;
  quickOpen?: boolean;
  corner?: Corner;
  x?: number;
  y?: number;
  absolute?: boolean;
  fixed?: boolean;
  fullWidth?: boolean;
  flipMenuHorizontally?: boolean;
  skipRestoreFocus?: boolean;
  stayOpenOnBodyClick?: boolean;
} & ParentProps;

export const Menu = (props: MenuProps) => {

  return (
    <div class={`base-menu md3-menu`}>
      <MenuSurface
        anchor={props.anchor}
        open={props.open}
        quickOpen={props.quickOpen}
        corner={props?.corner}
        absolute={props.absolute || false}
        fixed={props.fixed || false}
        x={props?.x}
        y={props?.y}
        fullWidth={props.fullWidth || false}
        flipMenuHorizontally={props?.flipMenuHorizontally || false}
        skipRestoreFocus={props?.skipRestoreFocus || false}
        stayOpenOnBodyClick={props?.stayOpenOnBodyClick || false}
      >
        <List
          role="menu"
          listTabIndex={-1}
        >
          {props.children}
        </List>
      </MenuSurface>
    </div>
  )
}

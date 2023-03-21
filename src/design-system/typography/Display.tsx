import { Component, ParentProps } from "solid-js"
import './styles/base-styles.css'
import './styles/display-styles.css'

export type DisplayProps = {
  size: 'small' | 'medium' | 'large';
} & ParentProps

export const Display: Component<DisplayProps> = (props) => {
  return (
    <div
      class={`
            ${'typography display'}
            ${'display--' + props.size}
            `
      }
    >
      {props.children}
    </div>
  );
};

import { Component, ParentProps } from "solid-js"
import './styles/base-styles.css'
import './styles/body-styles.css'

export type BodyProps = {
  size: 'small' | 'medium' | 'large';
} & ParentProps

export const Body: Component<BodyProps> = (props) => {
  return (
    <div
      class={`
            ${'body'}
            ${'body--' + props.size}
            `
      }
    >
      {props.children}
    </div>
  );
};

import { Component, ParentProps } from "solid-js"
import './styles/base-styles.css'
import './styles/label-styles.css'

export type LabelProps = {
  size: 'small' | 'medium' | 'large';
} & ParentProps

export const Label: Component<LabelProps> = (props) => {
  return (
    <div
      class={`
            ${'label'}
            ${'label--' + props.size}
            `
      }
    >
      {props.children}
    </div>
  );
};

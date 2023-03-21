import { Component, ParentProps } from "solid-js"
import './styles/base-styles.css'
import './styles/headline-styles.css'

export type HeadlineProps = {
  size: 'small' | 'medium' | 'large';
} & ParentProps

export const Headline: Component<HeadlineProps> = (props) => {
  return (
    <div
      class={`
            ${'headline'}
            ${'headline--' + props.size}
            `
      }
    >
      {props.children}
    </div>
  );
};

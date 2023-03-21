import { Component, ParentProps } from "solid-js"
import './styles/base-styles.css'
import './styles/title-styles.css'

export type TitleProps = {
  size: 'small' | 'medium' | 'large';
} & ParentProps

export const Title: Component<TitleProps> = (props) => {
  return (
    <div
      class={`
            ${'title'}
            ${'title--' + props.size}
            `
      }
    >
      {props.children}
    </div>
  );
};

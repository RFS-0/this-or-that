import { Component, ParentProps } from "solid-js"
import './styles/base-styles.css'

export type CardProps = {
  size: 'small' | 'large';
} & ParentProps

export const Card: Component<CardProps> = (props) => {
  return (
    <h1
      class={`
            ${'card'}
            ${'card--' + props.size}
            `
      }
    >
      {props.children}
    </h1>
  );
};

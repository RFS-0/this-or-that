import { Component, ParentProps } from 'solid-js';

export type CardProps = {
  size: 'small' | 'large';
} & ParentProps

export const Card: Component<CardProps> = (props) => {
  return (
    <div class={
      `flex-col 
       rounded-f6 
       surface-1
       ${props.size === 'small' ? 'sm:w-f10 md:w-f12 lg:w-f13' : 'sm:w-f13 md:w-f14 lg:w-f15'}
       `
    }
    >
      {props.children}
    </div>
  );
}

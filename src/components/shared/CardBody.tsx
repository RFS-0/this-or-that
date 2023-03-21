import { Component, ParentProps, } from 'solid-js';

export type CardBodyProps = {
} & ParentProps

export const CardBody: Component<CardBodyProps> = (props) => {
  return (
    <div class='flex flex-col items-start p-f4 sm:p-f5 md:p-f6 lg:p-f7 sm:gap-f5 md:gap-f6 lg:gap-f7'>
      {props.children}
    </div>
  );
}

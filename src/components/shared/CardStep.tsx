import { Component, ParentProps, } from 'solid-js';

export type CardStepProps = {
} & ParentProps

export const CardStep: Component<CardStepProps> = (props) => {
  return (
    <div class={
      `w-full 
       flex 
       flex-col 
       items-center 
       surface-2 
       sm:p-f5 
       md:p-f6 
       lg:p-f7 
       sm:gap-f5 
       md:gap-f6 
       lg:gap-f7`
    }>
      {props.children}
    </div>
  );
}

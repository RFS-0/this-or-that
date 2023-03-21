import { ParentComponent, ParentProps, JSX } from 'solid-js'
import './icon-styles.css'

export type IconProps = {
} & ParentProps & JSX.IntrinsicElements['div']

export const Icon: ParentComponent<IconProps> = (props) => {
  return (
    <div
      {...props}
      class={`base-icon ${props?.class || ''}`} >
      {props.children}
    </div >
  );
};


import { Show } from 'solid-js';
import './styles/base-styles.css'
export type ElevationProps = {
  shadow?: boolean;
  surface?: boolean;
}

export const Elevation = (props: ElevationProps) => {
  return (
    <>
      <div class='base-elevation md-elevation'>
        <Show when={props?.surface}>
          <span class="surface"></span>
        </Show>
        <Show when={props?.shadow}>
          <span class="shadow"></span>
        </Show>
      </div>
    </>
  );
}

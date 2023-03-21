import './styles/base-styles.css'

export type BadgeProps = {
  value: string | number;
}

export const Badge = (props: BadgeProps) => {
  return (
    <div
      class={
        `
         base-badge
         md3-badge
         ${props?.value ? 'md3-badge--large' : ''}
        `
      }
    >
      <p class="md3-badge__value">
        {props?.value}
      </p>
    </div>
  )
}

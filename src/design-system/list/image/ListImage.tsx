import './styles/base-styles.css'

export type ListImageProps = {
  image: string;
}

export const ListImage = (props: ListImageProps) => {
  return (
    <img
      class="base-list-image md3-list-item__image"
      src={props.image}
    >
      {props.image}
    </img>
  )
}

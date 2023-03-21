import './styles/base-styles.css'
import './styles/base-elevation-styles.css'
import './styles/tonal-styles.css'
import { Button, ButtonProps } from "./Button";


export const TonalButton = (props: ButtonProps) => {
  return (
    <Button
      variant="tonal"
      {...props}
    />
  );
}

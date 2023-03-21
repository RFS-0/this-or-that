import './styles/base-styles.css'
import './styles/outlined-styles.css'
import { Button, ButtonProps } from "./Button";


export const OutlinedButton = (props: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      {...props}
    />
  );
}

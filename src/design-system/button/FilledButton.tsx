import './styles/base-styles.css'
import './styles/filled-styles.css'
import { Button, ButtonProps } from "./Button";


export const FilledButton = (props: ButtonProps) => {
  return (
    <Button
      variant="filled"
      {...props}
    />
  );
}

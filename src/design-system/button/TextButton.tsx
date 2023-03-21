import './styles/base-styles.css'
import './styles/base-elevation-styles.css'
import './styles/text-styles.css'
import { Button, ButtonProps } from "./Button";


export const TextButton = (props: ButtonProps) => {
  return (
    <Button
      variant="text"
      {...props}
    />
  );
}

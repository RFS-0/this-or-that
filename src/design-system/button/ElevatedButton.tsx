import './styles/base-styles.css'
import './styles/elevated-styles.css'
import { Button, ButtonProps } from "./Button";


export const ElevatedButton = (props: ButtonProps) => {
  return (
    <Button
      variant="elevated"
      {...props}
    />
  );
}

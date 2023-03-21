import { Component, } from 'solid-js';
import { Body } from '../../design-system';

export type CardDescriptionProps = {
  description: string;
}

export const CardDescription: Component<CardDescriptionProps> = (props) => {
  const description = props.description

  return (
    <div>
      <Body size='large'>
        {description}
      </Body>
    </div>
  );
}

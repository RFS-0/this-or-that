import { Component, createSignal, Show, } from 'solid-js';
import { Icon, StandardIconButton } from '../../design-system';

export type CardDescriptionProps = {
  description: string;
}

export const CardDescription: Component<CardDescriptionProps> = (props) => {
  const description = props.description
  const showAlwaysFullDescription = (description.match(/\./g) || []).length <= 1
  const [showFullDescription, setShowFullDescription] = createSignal(showAlwaysFullDescription)

  let button!: HTMLButtonElement

  return (
    <>
      <Show
        when={showAlwaysFullDescription}
        fallback={
          <>
            <Show
              when={showFullDescription()}
              fallback={
                <div class='w-full'>
                  <p>
                    {description.substring(0, description.indexOf('.') + 1)}
                  </p>
                  <div class="flex flex-row-reverse">
                    <StandardIconButton
                      class='flex-grow'
                      color='primary'
                      ref={button}
                      onClick={() => setShowFullDescription(true)}
                      icon={
                        <Show
                          when={showFullDescription()}
                          fallback={
                            <Icon><span class="material-symbols-outlined">expand_more</span></Icon>
                          }
                        >
                          <Icon><span class="material-symbols-outlined">expand_less</span></Icon>
                        </Show>
                      }
                    />
                  </div>
                </div>
              }
            >
              <div class='w-full'>
                <p>
                  {description}
                </p>
                <div class="flex flex-row-reverse">
                  <StandardIconButton
                    class='flex-grow'
                    color='primary'
                    ref={button}
                    onClick={() => setShowFullDescription(false)}
                    icon={
                      <Show
                        when={showFullDescription()}
                        fallback={
                          <Icon><span class="material-symbols-outlined">expand_more</span></Icon>
                        }
                      >
                        <Icon><span class="material-symbols-outlined">expand_less</span></Icon>
                      </Show>
                    }
                  />
                </div>
              </div>
            </Show>
          </>
        }
      >
        <p>
          {description}
        </p>
      </Show>
    </>
  );
}

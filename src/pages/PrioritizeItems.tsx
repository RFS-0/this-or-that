import { useNavigate } from "@solidjs/router"
import { createEffect, createSignal, For, Show } from "solid-js"
import { useApplicationContext } from "../AppContext"
import { Card, CardActions, CardBody, CardDescription, CardHeader } from "../components/shared"
import { CardStep } from "../components/shared/CardStep"
import { Page } from "../components/shared/Page"
import { Icon, List, ListDivider, ListIcon, ListItem, Title, TonalButton } from "../design-system"

export default () => {
  const [applicationContext] = useApplicationContext()
  const navigate = useNavigate()

  const [unsortedItems, setUnsortedItems] = createSignal(applicationContext.unsortedItems[0]().slice())

  const sizeSignal = createSignal<'small' | 'large'>('large')
  const [size] = sizeSignal

  const getNextUnsortedItem = () => {
    return unsortedItems().shift()
  }

  const swapUnsortedItems = (indexOfItem: number, indexOfOtherItem: number) => {
    const updatedUnsortedItems = unsortedItems().slice()
    const item = updatedUnsortedItems[indexOfItem]
    const otherItem = updatedUnsortedItems[indexOfOtherItem]
    updatedUnsortedItems[indexOfItem] = otherItem
    updatedUnsortedItems[indexOfOtherItem] = item
    setUnsortedItems(updatedUnsortedItems)
  }

  const [itemsBeingSorted] = createSignal([
    getNextUnsortedItem(),
    getNextUnsortedItem(),
    undefined
  ])

  createEffect(() => {
    console.log(unsortedItems())
  })

  return (
    <Page>
      <Card size={size()}>
        <CardHeader
          title={'Prioritize the items'}
          size={sizeSignal}
        />

        <CardBody>
          <CardDescription
            description="
            You can now prioritize your items. 
            You can choose which item is prioritized next, per default the first item is selected.
            You then define the priority of the selected item in relation to already prioritized items."
          />

          <CardStep>
            <div
              class={
                `w-full 
                 flex 
                 flex-col
                 overflow-x-auto
                 items-center 
                 surface-2 
                 sm:p-f5 
                 md:p-f6 
                 lg:p-f7 
                 sm:gap-f5 
                 md:gap-f6 
                 lg:gap-f7`
              }
            >
              <Title size="medium">Unprioritized items</Title>
              <List variant="surface3">
                <For each={unsortedItems()}>
                  {
                    (unsortedItem, index) => (
                      <>
                        <ListItem
                          variant="surface3"
                          headline={unsortedItem.title}
                          multiLineSupportingText={unsortedItem.description}
                          end={
                            <ListIcon icon={'chevron_right'} />
                          }
                        />
                        <Show when={index() < unsortedItems().length - 1}>
                          <ListDivider />
                        </Show>
                      </>
                    )
                  }
                </For>
              </List>
            </div>

            <Title size="medium">Prioritize items</Title>
            <List variant="surface3">
              <For each={itemsBeingSorted()}>
                {
                  (itemBeingSorted, index) => (
                    <Show when={itemBeingSorted !== undefined}>
                      <ListItem
                        variant="surface3"
                        headline={itemBeingSorted!.title}
                        multiLineSupportingText={itemBeingSorted!.description}
                        start={
                          <ListIcon icon={'arrow_upward'} />
                        }
                        end={
                          <ListIcon icon={'arrow_downward'} />
                        }
                      />
                      <Show when={index() < itemsBeingSorted().filter(item => !!item).length - 1}>
                        <ListDivider />
                      </Show>
                    </Show>
                  )
                }
              </For>
            </List>

            <TonalButton
              color='primary-container'
              label='Confirm priority'
              leadingIcon={
                <Icon><span class="material-symbols-outlined">done</span></Icon>
              }
              onClick={() => {
              }}
            />
          </CardStep>
        </CardBody>

        <CardActions>
          <TonalButton
            label='Continue'
            color='primary'
            leadingIcon={
              <Icon><span class="material-symbols-outlined">arrow_forward</span></Icon>
            }
            onClick={() => {
              navigate('/prioritize')
            }}
          />
          <TonalButton
            label='Back'
            color='primary'
            leadingIcon={
              <Icon><span class="material-symbols-outlined">arrow_back</span></Icon>
            }
            onClick={() => {
              navigate('/import')
            }}
          />
        </CardActions>
      </Card>
    </Page>
  )
}

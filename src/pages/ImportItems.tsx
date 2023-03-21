import { useNavigate } from '@solidjs/router'
import { createEffect, createSignal, For } from 'solid-js'
import { useApplicationContext } from '../AppContext'
import { ButtonCell } from '../components/shared/forms/ButtonCell'
import { JsonFileInput } from '../components/shared/forms/JsonFileInput'
import { TextInputCell } from '../components/shared/forms/TextInputCell'
import { IntendedItem } from '../domain/entities/item'
import { v4 as uuidv4 } from 'uuid'
import { Body, Icon, TonalButton } from '../design-system'
import { Page } from '../components/shared/Page'
import { Card, CardActions, CardBody, CardHeader } from '../components/shared'
import { CardStep } from '../components/shared/CardStep'
import { TextButton } from '../design-system/button/TextButton'

export interface ImportItemsProps { }

export default (_: ImportItemsProps) => {
  const [applicationContext] = useApplicationContext()
  const [intendedItems, setIntendedItems] = applicationContext.unsortedItems

  const sizeSignal = createSignal<'small' | 'large'>('large')
  const [size] = sizeSignal

  const navigate = useNavigate()

  const [newIntendedItem, setNewIntendedItem] = createSignal<IntendedItem>({
    id: uuidv4(),
    title: '',
    description: '',
  })

  const updateSelectedItems = (addedItems: IntendedItem[]) => {
    setIntendedItems([
      ...intendedItems(),
      ...addedItems.map(
        (item) =>
        ({
          ...item,
          id: uuidv4(),
        } as IntendedItem)
      ),
    ])
  }

  const getIndexOf = (intendedItemId: string): number => {
    const indexOfItemToBeUpdated = intendedItems().findIndex(
      (item) => item.id === intendedItemId
    )
    if (indexOfItemToBeUpdated === -1) {
      console.error('Could not find intended item to update')
    }
    return indexOfItemToBeUpdated
  }

  const updateIntendedItem = (intendedItemId: string, update: {}) => {
    const indexOfItemToBeUpdated = getIndexOf(intendedItemId)
    const updatedItems = [...intendedItems()]
    const [itemToUpdate] = updatedItems.splice(indexOfItemToBeUpdated, 1)
    updatedItems.splice(indexOfItemToBeUpdated, 0, {
      ...itemToUpdate,
      ...update,
    })
    setIntendedItems(updatedItems)
  }

  const removeIntendedItem = (toBeRemoved: IntendedItem) => {
    const updatedItems = [...intendedItems()]
    const indexOfItemToRemove = updatedItems.findIndex(
      (dependency) => dependency.title === toBeRemoved.title
    )
    updatedItems.splice(indexOfItemToRemove, 1)
    setIntendedItems(updatedItems)
  }

  createEffect(() => {
    console.log(intendedItems())
  })

  return (
    <Page>
      <Card size={size()}>

        <CardHeader
          title={'Define items to prioritize'}
          size={sizeSignal}
        />

        <CardBody>
          <Body
            size='medium' >
            You can import items from a JSON file or add them manually.
            Import the items by clicking the button below.
            You can import items from multiple files.
            Continue to the next step if you would like to add them manually.
          </Body>
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
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="border border-outline-variant rounded-f7 overflow-hidden">
                  <table class="border-collapse min-w-full max-w-full divide-y divide-outline-variant">
                    <thead class="bg-outline-variant">
                      <tr>
                        <th scope="col" class="p-f6 text-left text-on-surface-variant">Title</th>
                        <th scope="col" class="p-f6 text-left text-on-surface-variant">Description</th>
                        <th scope="col" class="p-f6 text-left text-on-surface-variant">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-outline-variant ">
                      <For each={intendedItems()}>
                        {(intendedItem) => (
                          <tr>
                            <TextInputCell
                              id={`${intendedItem.id}-title`}
                              value={intendedItem.title}
                              onTextEntered={(title) =>
                                updateIntendedItem(intendedItem.id, { title })
                              }
                            />
                            <TextInputCell
                              id={`${intendedItem.id}-description`}
                              value={intendedItem.description}
                              onTextEntered={(description) =>
                                updateIntendedItem(intendedItem.id, { description })
                              }
                            />
                            <ButtonCell id={`remove-${intendedItem.id}`}>
                              <TextButton
                                disabled={intendedItems().length === 0}
                                label='Remove'
                                leadingIcon={
                                  <Icon><span class="material-symbols-outlined">delete</span></Icon>
                                }
                                onClick={() => removeIntendedItem(intendedItem)}
                              />
                            </ButtonCell>
                          </tr>
                        )}
                      </For>
                      <tr>
                        <TextInputCell
                          id={`${newIntendedItem().id}-title`}
                          value={newIntendedItem().title}
                          onTextEntered={(title) =>
                            setNewIntendedItem({
                              ...newIntendedItem(),
                              title,
                            })
                          }
                        />
                        <TextInputCell
                          id={`${newIntendedItem().id}-title`}
                          value={newIntendedItem().description}
                          onTextEntered={(description) =>
                            setNewIntendedItem({
                              ...newIntendedItem(),
                              description,
                            })
                          }
                        />
                        <ButtonCell id='add-item'>
                          <TextButton
                            label='Add item'
                            leadingIcon={
                              <Icon><span class="material-symbols-outlined">add</span></Icon>
                            }
                            onClick={() => {
                              setIntendedItems([...intendedItems(), newIntendedItem()])
                              setNewIntendedItem({
                                id: uuidv4(),
                                title: '',
                                description: '',
                              })
                            }}
                          />
                        </ButtonCell>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id='table-actions'
                class={
                  `flex 
                   items-center 
                   surface-2 
                   sm:gap-f5 
                   md:gap-f6 
                   lg:gap-f7`
                }
              >
                <JsonFileInput
                  id='select-unprioritized-items'
                  name='unprioritizedItems'
                  parse={(jsonText) => JSON.parse(jsonText) as IntendedItem[]}
                  onSelect={updateSelectedItems}
                />
                <TonalButton
                  disabled={intendedItems().length === 0}
                  color='primary-container'
                  label='Remove all items'
                  leadingIcon={
                    <Icon><span class="material-symbols-outlined">delete</span></Icon>
                  }
                  onClick={() => {
                    setIntendedItems([])
                  }}
                />
              </div>
            </div>
          </CardStep>
        </CardBody>

        <CardActions>
          <TonalButton
            label='Weiter'
            color='primary'
            leadingIcon={
              <Icon><span class="material-symbols-outlined">arrow_forward</span></Icon>
            }
            onClick={() => {
              navigate('/prioritize')
            }}
          />
        </CardActions>
      </Card>
    </Page>
  )
}

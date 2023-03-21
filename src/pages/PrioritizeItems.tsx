import { createEffect, createSignal, For, Show } from "solid-js"
import { useApplicationContext } from "../AppContext"
import { ComponentTitle } from "../components/layout/component/ComponentTitle"
import { PageTitle } from "../components/layout/page/PageTitle"
import { Button } from "../components/shared/forms/Button"
import { ButtonCell } from "../components/shared/forms/ButtonCell"
import { FormRow } from "../components/shared/forms/FormRow"
import { TextInputCell } from "../components/shared/forms/TextInputCell"

export default () => {
  const [applicationContext] = useApplicationContext()

  const [intendedItems, setIntendedItems] = applicationContext.unsortedItems
  const [unsortedItems, setUnsortedItems] = applicationContext.unsortedItems
  const [sortedItems, setSortedItems] = applicationContext.sortedItems

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
    <>
      <div class="flex flex-col gap-6 p-4">
        <PageTitle>Prioritize the items</PageTitle>
        <div>
          <h2>Basic idea</h2>
          <ol class="list-inside list-decimal">
            <li>Two random unprioritized items are displayed</li>
            <li>The user can order them by their relative priority</li>
            <li>Prioritization can be completed</li>
          </ol>
        </div>

        <div>
          <ComponentTitle>Unprioritized items</ComponentTitle>
          <p>Select the next item you would like to prioritize</p>
          <ul>
            <For each={unsortedItems()}>
              {(unsortedItem) => (<li>{unsortedItem.title}</li>)}
            </For>
          </ul>
        </div>

        <div>
          <ComponentTitle>Prioritize items</ComponentTitle>
          <p>Prioritize the following items by ranking them by priority. Highest priority should be frist item, the lowest priority item should be last in the list</p>
          <ol class="list-inside list-decimal">
            <For each={itemsBeingSorted()}>
              {item => (
                <Show when={item !== undefined}>

                  <li>{JSON.stringify(item!.title)}</li>
                </Show>
              )}
            </For>
          </ol>
          <Button
            onClick={() => {
              console.log('priority confirmed')
            }}
          >
            Confirm priority
          </Button>
        </div>

        <FormRow>
          <table class=' w-full'>
            <thead>
              <tr>
                <th class='px-5 py-3 bg-indigo-200 text-left font-semibold rounded-l'>
                  Titel
                </th>
                <th class='px-5 py-3 bg-indigo-200 text-left font-semibold'>
                  Beschreibung
                </th>
                <th class='px-5 py-3 bg-indigo-200 text-left font-semibold rounded-r'>
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={intendedItems()}>
                {(intendedItem) => (
                  <tr>
                    <TextInputCell
                      id={`${intendedItem.id}-title`}
                      value={intendedItem.title}
                      onTextEntered={(title) =>
                        console.log(title)
                      }
                    ></TextInputCell>
                    <TextInputCell
                      id={`${intendedItem.id}-description`}
                      value={intendedItem.description}
                      onTextEntered={(description) =>
                        console.log(description)
                      }
                    ></TextInputCell>
                    <ButtonCell id={`remove-${intendedItem.id}`}>
                      <Button onClick={
                        () => console.log('remove')
                      }>
                        Entfernen
                      </Button>
                    </ButtonCell>
                  </tr>
                )}
              </For>
              <tr>
                <TextInputCell
                  id={`-title`}
                  value={'title'}
                  onTextEntered={(title) => console.log(title)
                  }
                ></TextInputCell>
                <TextInputCell
                  id={`-title`}
                  value={''}
                  onTextEntered={(description) => console.log('description')}
                ></TextInputCell>
                <ButtonCell id='add-item'>
                  <Button
                    onClick={() => {
                      console.log('add item')
                    }}
                  >
                    Hinzufügen
                  </Button>
                </ButtonCell>
              </tr>
            </tbody>
          </table>
        </FormRow>

        <div>
          <ComponentTitle>Prioritized items</ComponentTitle>
          <p>This is the current prioritization of you items:</p>
          <ul>
            <For each={sortedItems()}>
              {(unsortedItem) => (<li>{unsortedItem.id}</li>)}
            </For>
          </ul>
        </div>
      </div>
    </>
  )
}

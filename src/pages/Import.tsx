import { createSignal } from 'solid-js'
import { useApplicationContext } from '../AppContext'
import { PageTitle } from '../components/layout/page/PageTitle'
import { IntendedItem } from '../domain/entities/item'

export default () => {
  const [applicationContext] = useApplicationContext()
  const [intendedItems, setIntendedItems] = createSignal<IntendedItem[]>([])

  return (
    <>
      <PageTitle>Import items to Sort</PageTitle>
      <label for='items-to-be-sorted'>Choose file of items to be sorted</label>
      <input id='items-to-be-sorted' type='file' accept='application/json' />
    </>
  )
}

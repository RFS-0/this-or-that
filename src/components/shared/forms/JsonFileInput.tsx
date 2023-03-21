import { JSX } from 'solid-js'
import { ElevatedButton, Icon, TonalButton } from '../../../design-system'

export type FileInputProps<T> = {
  id: string
  name: string
  parse: (text: string) => T
  onSelect: (parsedJson: T) => void
}

const JsonFileInput: <T extends unknown>(props: FileInputProps<T>) => JSX.Element = <T,>(props: FileInputProps<T>) => {

  let fileInput!: HTMLInputElement;

  const parseJson = (fileSelected: Event & { currentTarget: HTMLInputElement, target: Element }) => {
    if (!fileSelected || !(fileSelected.target instanceof HTMLInputElement)) {
      console.error(
        'Implementation fault: handling of json file input has errors'
      )
      return
    }
    if (!fileSelected.target.files || !fileSelected.target.files[0]) {
      console.error('Implementation fault: no file selected')
      return
    }

    const jsonFile = fileSelected.target.files[0]
    let reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target) {
        console.error('Implementation fault: no file selected')
        return
      }

      props.onSelect(props.parse(e.target.result as string))
    }
    reader.readAsText(jsonFile)
  }

  return (
    <>
      <TonalButton
        color='primary-container'
        label='Select file'
        leadingIcon={
          <Icon><span class="material-symbols-outlined">attach_file_add</span></Icon>
        }
        onClick={() => fileInput.click()}
      />
      <input
        ref={fileInput}
        id={props.id}
        type='file'
        name={props.name}
        accept='application/json'
        class='hidden'
        onChange={parseJson}
      />
    </>

  )
}

export { JsonFileInput }

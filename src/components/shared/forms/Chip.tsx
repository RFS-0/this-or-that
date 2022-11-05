import { Component } from 'solid-js'

type ChipProps = {
  name: string
  unselect: () => void
}

const Chip: Component<ChipProps> = (props: ChipProps) => {
  return (
    <div class='flex items-center rounded-full bg-gray-100 m-2 py-2 px-4 hover:bg-gray-300'>
      <span class='text-gray-700 text-sm  mr-2'>{props.name}</span>
      <button class='' type='button' onClick={() => props.unselect()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='w-6 h-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </button>
    </div>
  )
}

export { Chip }

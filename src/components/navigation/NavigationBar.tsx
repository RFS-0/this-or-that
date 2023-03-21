import { useApplicationContext } from '../../AppContext'

export default () => {
  const [, { toggleMenu }] = useApplicationContext()

  return (
    <nav class='bg-indigo-600'>
      <div class='px-8 mx-auto '>
        <div class='flex justify-between py-3'>
          <div class='flex space-x-1'>
            <button
              class='flex items-center rounded-md py-3 px-3 text-white hover:bg-indigo-500 hover:shadow'
              onClick={() => toggleMenu()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='text-white w-6 h-6 mr-2'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                />
              </svg>
              <span>Menü</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

import { Link } from '@solidjs/router'
import { Show } from 'solid-js'
import { useApplicationContext } from '../../contexts/application-context'

export default () => {
  const [applicationContext, { publishCommand, toggleMenu }] =
    useApplicationContext()

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
          <div class='flex space-x-1'>
            <Show when={applicationContext.user}>
              <Link
                onClick={() =>
                  publishCommand({
                    name: 'revoke-authentication',
                    occuredOn: undefined,
                    sender: 'b5103c1c-a11a-487c-a230-9f1d71d4143a',
                    intention: {
                      email: '',
                      password: '',
                    },
                  })
                }
                href='/login'
                class='flex items-center py-3 px-3 rounded-md text-white hover:bg-indigo-500 hover:shadow'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  class='w-6 h-6 mr-2'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                  />
                </svg>
                Logout
              </Link>
            </Show>
          </div>
        </div>
      </div>
    </nav>
  )
}

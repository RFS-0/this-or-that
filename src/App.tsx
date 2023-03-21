import { useNavigate, useRoutes } from '@solidjs/router'
import { Component, Show } from 'solid-js'
import { useApplicationContext } from './AppContext'
import { Menu } from './components/layout/menu/Menu'
import { MenuItem } from './components/layout/menu/MenuItem'
import { LeftNavBar } from './components/navigation/LeftNavBar'
import NavigationBar from './components/navigation/NavigationBar'
import { RightNavBar } from './components/navigation/RightNavBar'
import { TopAppBar } from './components/navigation/TopAppBar'
import { BriefCaseIcon } from './components/shared/icons/BriefCaseIcon'
import { ChartBarSquareIcon } from './components/shared/icons/ChartBarSquareIcons'
import { CodeBracketIcon } from './components/shared/icons/CodeBracketIcon'
import { routes } from './routes/routes'

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      form: (node: HTMLFormElement) => { destroy: () => void }
    }
  }
}

const App: Component = () => {
  const [applicationContext] = useApplicationContext()

  const Routes = useRoutes(routes)
  const navigate = useNavigate()

  navigate('/import')

  return (
    <>
      <TopAppBar></TopAppBar>
      <div class="flex justify-between">
        <div class="w-f10 grow-0 flex-shrink-0">
          <LeftNavBar />
        </div>
        <div class="grow">
          <Routes />
        </div>
        <div class="w-f8 grow-0 flex-shrink-0">
          <RightNavBar />
        </div>
      </div>
    </>
  )
}

export default App

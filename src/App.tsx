import { Routes, useNavigate, useRoutes } from '@solidjs/router'
import type { Component } from 'solid-js'
import { useApplicationContext } from './AppContext'
import { routes } from './routes/routes'

const App: Component = () => {
  const [applicationContext] = useApplicationContext()

  const Routes = useRoutes(routes)
  const navigate = useNavigate()

  navigate('/import')

  return <Routes />
}

export default App

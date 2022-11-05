import { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

const routes: RouteDefinition[] = [
  {
    path: '/import',
    component: lazy(() => import('../pages/Import')),
  },
  {
    path: '/this-or-that',
    component: lazy(() => import('../pages/ThisOrThat')),
  }
]

export { routes }

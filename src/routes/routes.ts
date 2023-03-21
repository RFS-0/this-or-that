import { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

const routes: RouteDefinition[] = [
  {
    path: '/import',
    component: lazy(() => import('../pages/ImportItems')),
  },
  {
    path: '/prioritize',
    component: lazy(() => import('../pages/PrioritizeItems')),
  },
  {
    path: '/export',
    component: lazy(() => import('../pages/ExportPrioritizedItems')),
  },
]

export { routes }

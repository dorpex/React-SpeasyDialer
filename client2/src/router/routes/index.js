import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/dialer'

// ** Merge Routes
const Routes = [
  {
    path: '/crm',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/dialer',
    component: lazy(() => import('../../views/Dialer/Dialer.js'))
  },
  {
    path: '/marketing/ref-maker',
    component: lazy(() => import('../../views/Marketing/refMaker/refMaker.jsx'))
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/LoginV1.jsx')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  },
  {
    path: '/test',
    component: lazy(() => import('../../views/reduxLearning.jsx')),
    layout: 'BlankLayout'
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/RegisterV1.jsx')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  }
]

export { DefaultRoute, TemplateTitle, Routes }

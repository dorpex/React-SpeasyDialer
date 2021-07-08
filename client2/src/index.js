// ** React Imports
import { Suspense, lazy , Fragment  } from 'react'
import ReactDOM from 'react-dom'

// ** Redux Imports
import { Provider , useDispatch } from 'react-redux'
import { store } from './redux/storeConfig/store'
import { handleUserLogin  } from '@store/actions/auth'
console.log(store.getState());
// ** Toast & ThemeColors Context
import { ToastContainer } from 'react-toastify'
import { ThemeContext } from './utility/context/ThemeColors'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

// ** Service Worker
import * as serviceWorker from './serviceWorker'


// ** Intl, CASL & ThemeColors Context
import ability from './configs/acl/ability'
import { AbilityContext } from './utility/context/Can'
import { IntlProviderWrapper } from './utility/context/Internationalization'

const Dispatcher = () => {
  const dispatch = useDispatch()
  dispatch(handleUserLogin(localStorage.getItem('userData')))
  return (<Fragment>
    </Fragment>)
}

// ** Lazy load app
const LazyApp = lazy(() => import('./app'))
ReactDOM.render(
  <Provider store={store}>
      <Dispatcher/>

    <Suspense fallback={<Spinner />}>
      <AbilityContext.Provider value={ability}>
          <IntlProviderWrapper>
            <ThemeContext>
              <LazyApp />
              <ToastContainer newestOnTop />
            </ThemeContext>
        </IntlProviderWrapper>
        </AbilityContext.Provider>
      </Suspense>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

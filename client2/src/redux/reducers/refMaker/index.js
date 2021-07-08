// ** ThemeConfig Import
import themeConfig from '@configs/themeConfig'

// ** Initial State
const initialState = {
    affiliate: false,
    product: false,
    platform: false,
    audiance: false,
    landingPage : false,
    adName : false,
    button : false
}

const refMakerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_REF_VAL_CHANGED':
        const newState = {...state}
        newState[action.value.refPart] = action.value.val
        delete newState['button']
        newState['button'] = Object.values(newState).filter(item => item === false).length >= 1 ? false : true
        return newState
    
    // /views/dialer/components/DialerBody.jsx 
    case 'HANDLE_CHANGE_STATUS':
      if (action.value === state.oldStatus) {
        return { ...state, newStatus: undefined }
      }
      return { ...state, newStatus: action.value }
    default:
      return state
  }
}

export default refMakerReducer

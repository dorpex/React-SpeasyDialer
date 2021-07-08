// ** ThemeConfig Import
import themeConfig from '@configs/themeConfig'

// ** Initial State
const initialState = {
  name: 'Dor',
  email: 'test@gmail.com',
  phone: '0544692203',
  notes: [{agentName : 'Amir' , text : 'Test' , date : '27/11/1994'} , {agentName : 'Amir' , text : 'Test' , date : '27/11/1994'}],
  oldStatus : 'חדש',
  newStatus : undefined,
  product : 'קורס אנגלית בסיסי ספיזי'
}

const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_NEW_LEAD':
      return { ...state, contentWidth: action.value }
    
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

export default leadReducer

import { Mail, Home , PlusCircle , TrendingUp } from 'react-feather'
import { useDispatch , useSelector } from 'react-redux'
import { store } from '../../redux/storeConfig/store'
console.log(JSON.parse(store.getState('lead').auth.userData).rank);
let menu = [
  {
    id: 'Home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/dialer'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  }
]
const userRank = JSON.parse(store.getState('lead').auth.userData).rank
// const rank = useSelector(state => state.todos)
export const mySideBar = (rank) => {
  return menu
}
const nazig = [
  {
    id: 'Dialer',
    title: 'דיילר',
    icon: <Home size={20} />,
    navLink: '/dialer'
  }
]

const salesManager = [
  {
    id: 'salesManData',
    title: 'נתוני נציגים',
    icon: <Home size={20} />,
    navLink: '/salesManData'
  },
  
]

const markting = [
  // {
  //   id: 'sidebar-marketing',
  //   title: 'שיווק',
  //   icon: <TrendingUp size={20} />,
  //   navLink: '/marketing',
  // },
  {
    id: 'sidebar-ref-maker',
    title: 'רף חדש',
    icon: <PlusCircle size={20} />,
    navLink: '/marketing/ref-maker',
  }
]

menu = userRank === 'נציג' ?  nazig : userRank === 'משווק' ? markting : userRank === 'מנהל מכירות' ? salesManager : undefined

if (userRank   === 'מנהל') {
  menu = [...nazig , ...salesManager, ...markting]
  const menuObject = new Object()
  menu.forEach(item => {
    menuObject[item.id] = item
  })
  menu = Object.values(menuObject)
}


export default menu
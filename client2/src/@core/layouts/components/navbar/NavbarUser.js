// ** Dropdowns Imports
import { Fragment, useState } from 'react'

import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon, Menu } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }
  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none d-flex align-items-center'>
        <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      {/* <div className='bookmark-wrapper d-flex align-items-center'>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </div> */}
      <ul className='nav navbar-nav align-items-center ' >
      <div className='user-nav d-sm-flex d-none mr-auto'>
          <h3 className='user-name font-weight-bold'>{ (userData && userData['name']) || 'John Doe'} </h3>
          {/* <span className='user-status'>{(userData && userData.rank) || 'Admin'}</span> */}
      </div>
        <UserDropdown />
      </ul>
    </Fragment>
  )
}
export default NavbarUser

import React from 'react'
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilLockLocked, cilUser, cilWallet } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from 'src/redux/actions/authActions'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profile = useSelector((state) => state.auth.profile?.data)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        placement="bottom-end"
        className="d-flex align-items-center gap-2 py-0"
        caret={false}
      >
        <CAvatar src={profile?.image || avatar8} size="md" />
        <div className="d-flex flex-column">
          {profile?.first_name}
          <div className="d-flex align-items-center gap-2">
            <CIcon icon={cilWallet} color="primary" />
            {profile?.wallet?.toLocaleString('ru-RU')} so`m
          </div>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => navigate('/dashboard/profile')}>
          <CIcon icon={cilUser} className="me-2" />
          Profil
        </CDropdownItem>
        <CDropdownItem
          onClick={() => {
            handleLogout()
            navigate('/login')
          }}
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Выйты
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

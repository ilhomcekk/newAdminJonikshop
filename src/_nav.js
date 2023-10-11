import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAccountLogout,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilClipboard,
  cilCommentBubble,
  cilCursor,
  cilDescription,
  cilDrop,
  cilFolder,
  cilKeyboard,
  cilList,
  cilListRich,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSettings,
  cilShieldAlt,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Market',
    to: '/dashboard/market',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Oqimlar',
    to: '/dashboard/streams',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Statistika',
    to: '/dashboard/orders',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Barcha buyurtmalar',
        to: '/dashboard/orders?status=Yangi',
      },
      {
        component: CNavItem,
        name: 'Oqimlar',
        to: '/dashboard/stream/statistic',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Управления',
  },
  {
    component: CNavItem,
    name: 'Аккаунт',
    to: '/dashboard/profile',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Register',
  //   to: '/register',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Error 404',
  //   to: '/404',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Error 500',
  //   to: '/500',
  // },
]

export default _nav

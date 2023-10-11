import React, { lazy } from 'react'

const Dashboard = lazy(() => import('./views/dashboard/Dashboard'))
const Market = lazy(() => import('./views/market/Market'))
const Stream = lazy(() => import('./views/streams/Streams'))
const Orders = lazy(() => import('./views/orders/Orders'))
const StreamOrders = lazy(() => import('./views/streamOrders/StreamOrders'))
const Profile = lazy(() => import('./views/profile/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/dashboard/market', name: 'Market', element: Market },
  { path: '/dashboard/streams', name: 'Stream', element: Stream },
  { path: '/dashboard/stream/statistic', name: 'Stream', element: StreamOrders },
  { path: '/dashboard/orders', name: 'Orders', element: Orders },
  { path: '/dashboard/profile', name: 'Market', element: Profile },
]

export default routes

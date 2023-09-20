import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLogin } from 'src/redux/actions/authActions'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = window.localStorage.getItem('madadToken')

  useEffect(() => {
    dispatch(getLogin({ token: token }))
  }, [])

  const success = useSelector((state) => state.auth.success)
  useEffect(() => {
    if (success === false || success === undefined) {
      navigate('/login')
    }
  }, [success])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout

import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { setToken } from 'src/helpers/token'
import { getProfile, postRegister } from 'src/redux/actions/authActions'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [params, setParams] = useState({
    phone_number: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  })

  const onChangeParams = (e) => {
    const { name, value } = e.target
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    await postRegister(params)
      .then((data) => {
        setToken(data.data)
        dispatch(getProfile())
        navigate('/dashboard')
      })
      .catch(({ response }) => {
        if (response?.data)
          for (const [key, value] of Object.entries(response?.data)) {
            toast.error(`${key}: ${value}`)
          }
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Ismingiz"
                      name="first_name"
                      onChange={onChangeParams}
                      value={params.first_name}
                      autoComplete="first_name"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Familiyangiz"
                      name="last_name"
                      onChange={onChangeParams}
                      value={params.last_name}
                      autoComplete="last_name"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Telefon raqamingiz"
                      name="phone_number"
                      onChange={onChangeParams}
                      value={params.phone_number}
                      autoComplete="phone_number"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Parol"
                      name="password"
                      onChange={onChangeParams}
                      value={params.password}
                      autoComplete="password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Parolni qaytaring"
                      name="confirm_password"
                      onChange={onChangeParams}
                      value={params.confirm_password}
                      autoComplete="confirm_password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton onClick={handleSubmit} color="success" className="text-white">
                      Ro`yhatdan o`tish
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getProfile, updateProfile, updateProfilePatch } from 'src/redux/actions/authActions'

const ProfileUpdate = ({ show, handleClose }) => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.auth.profile?.data)

  const [params, setParams] = useState({
    first_name: profile?.first_name,
    last_name: profile?.last_name,
    phone_number: profile?.phone_number,
    password: '',
    image: '',
  })

  useEffect(() => {
    setParams({
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      phone_number: profile?.phone_number,
      password: '',
      image: '',
    })
  }, [profile])

  const handleParams = (e) => {
    const { name, value } = e.target
    setParams((prev) => ({ ...prev, [name]: value }))
  }
  const handleImage = (e) => {
    const image = e.target.files[0]
    setParams((prev) => ({ ...prev, image: image }))
  }

  const handleSubmit = async () => {
    if (params.image && !params.password) {
      await updateProfilePatch({
        first_name: params.first_name,
        last_name: params.last_name,
        phone_number: params.phone_number,
        image: params.image,
      })
        .then(() => {
          setParams({
            first_name: '',
            last_name: '',
            phone_number: '',
            image: '',
          })
          handleClose()
          dispatch(getProfile())
        })
        .catch(({ response }) => {
          if (response?.data)
            for (const [key, value] of Object.entries(response?.data)) {
              toast.error(`${key}: ${value}`)
            }
        })
    } else if (!params.image && params.password) {
      await updateProfilePatch({
        first_name: params.first_name,
        last_name: params.last_name,
        phone_number: params.phone_number,
        password: params.password,
      })
        .then(() => {
          setParams({
            first_name: '',
            last_name: '',
            phone_number: '',
            password: '',
          })
          handleClose()
          dispatch(getProfile())
        })
        .catch(({ response }) => {
          if (response?.data)
            for (const [key, value] of Object.entries(response?.data)) {
              toast.error(`${key}: ${value}`)
            }
        })
    } else if (params.image && params.password) {
      await updateProfile(params)
        .then(() => {
          setParams({
            first_name: '',
            last_name: '',
            phone_number: '',
            password: '',
            image: '',
          })
          handleClose()
          dispatch(getProfile())
        })
        .catch(({ response }) => {
          if (response?.data)
            for (const [key, value] of Object.entries(response?.data)) {
              toast.error(`${key}: ${value}`)
            }
        })
    } else if (!params.image && !params.password) {
      await updateProfilePatch({
        first_name: params.first_name,
        last_name: params.last_name,
        phone_number: params.phone_number,
      })
        .then(() => {
          setParams({
            first_name: '',
            last_name: '',
            phone_number: '',
            password: '',
            image: '',
          })
          handleClose()
          dispatch(getProfile())
        })
        .catch(({ response }) => {
          if (response?.data)
            for (const [key, value] of Object.entries(response?.data)) {
              toast.error(`${key}: ${value}`)
            }
        })
    }
  }

  return (
    <div>
      <CModal visible={show} onClose={handleClose}>
        <CModalHeader onClose={handleClose}>
          <CModalTitle>Profilni o`zgartirish</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="mb-1">Ism</div>
          <input
            type="text"
            name="first_name"
            onChange={handleParams}
            value={params.first_name}
            className="form-control mb-2"
            placeholder="Ism"
          />
          <div className="mb-1">Familiya</div>
          <input
            type="text"
            name="last_name"
            onChange={handleParams}
            value={params.last_name}
            className="form-control mb-2"
            placeholder="Familiya"
          />
          <div className="mb-1">Familiya</div>
          <input
            type="tel"
            name="phone_number"
            onChange={handleParams}
            value={params.phone_number}
            className="form-control mb-2"
            placeholder="Telefon raqam"
          />
          <div className="mb-1">Parol</div>
          <input
            type="text"
            name="password"
            onChange={handleParams}
            value={params.password}
            className="form-control mb-2"
            placeholder="Parol"
          />
          <div className="mb-1">Rasm</div>
          <input type="file" onChange={handleImage} className="form-control mb-2" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose}>
            Yopish
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Jo`natish
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

ProfileUpdate.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func,
  handleClose: PropTypes.func,
}

export default ProfileUpdate

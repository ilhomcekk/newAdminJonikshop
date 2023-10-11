import { cilCopy } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CFormCheck,
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
import {
  detailReferralLink,
  editReferralLink,
  getStreamProducts,
} from 'src/redux/actions/productActions'

const StreamEditModal = ({ show, handleClose, data }) => {
  const dispatch = useDispatch()

  const [referralLink, setReferralLink] = useState('')
  const dataState = useMemo(() => data, [data])
  const [params, setParams] = useState({
    title: '',
    is_province_required: true,
  })

  const handleCloseState = () => {
    handleClose()
    setReferralLink('')
  }

  const handleSubmit = async () => {
    await editReferralLink(dataState, params)
      .then(({ data }) => {
        setReferralLink(data.url)
        dispatch(getStreamProducts())
      })
      .catch(({ response }) => {
        if (response?.data)
          for (const [key, value] of Object.entries(response?.data)) {
            toast.error(`${key}: ${value}`)
          }
      })
  }

  const handleCopyText = () => {
    const input = document.getElementById('copyInput')
    input.select()
    document.execCommand('copy')
    toast.success('Nusxa olindi')
  }

  const handleState = async () => {
    if (show) {
      await detailReferralLink(dataState)
        .then(({ data }) => {
          setParams((prev) => ({
            ...prev,
            title: data?.title,
            is_province_required: data?.is_province_required,
          }))
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    handleState()
  }, [data, show])

  return (
    <div>
      <CModal visible={show} onClose={handleCloseState}>
        <CModalHeader onClose={handleCloseState}>
          <CModalTitle>Oqim o`zgartirish</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {!referralLink ? (
            <>
              <input
                onChange={(e) => setParams((prev) => ({ ...prev, title: e.target.value }))}
                value={params.title}
                type="text"
                className="form-control mb-2"
                placeholder="Oqim nomini kiriting"
              />
              <CFormCheck
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, is_province_required: e.target.checked }))
                }
                checked={params.is_province_required}
                id="flexCheckChecked"
                label="Viloyatlar tanlashni sozlash"
              />
            </>
          ) : (
            <div className="p-2 rounded border d-flex align-items-center gap-2">
              <input id="copyInput" className="form-control" value={referralLink} readOnly />
              <CButton onClick={handleCopyText} className="ms-auto text-white" color="success">
                <CIcon icon={cilCopy} />
              </CButton>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseState}>
            Yopish
          </CButton>
          {!referralLink && (
            <CButton color="primary" onClick={handleSubmit}>
              Saqlash
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </div>
  )
}

StreamEditModal.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func,
  handleClose: PropTypes.func,
  data: PropTypes.any,
}

export default StreamEditModal

import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createPayAdmin } from 'src/redux/actions/payActions'
import { getTransactionAdmin } from 'src/redux/actions/transactionActions'

const PayAdminModal = ({ show, handleClose }) => {
  const dispatch = useDispatch()
  const [params, setParams] = useState({
    card: '',
    amount: null,
  })

  const clearState = () => {
    setParams((prev) => ({ ...prev, card: '', amount: null }))
  }

  const handleSubmit = async () => {
    await createPayAdmin(params)
      .then(({ data }) => {
        toast.success('Ariza yuborildi')
        dispatch(getTransactionAdmin())
        handleClose()
        clearState()
      })
      .catch(({ response }) => {
        if (response?.data)
          for (const [key, value] of Object.entries(response?.data)) {
            toast.error(`${key}: ${value}`)
          }
      })
  }

  return (
    <div>
      <CModal visible={show} onClose={handleClose}>
        <CModalHeader onClose={handleClose}>
          <CModalTitle>Ariza yaratish</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>Karta raqam</div>
          <input
            onChange={(e) => setParams((prev) => ({ ...prev, card: e.target.value }))}
            value={params.card}
            type="text"
            className="form-control mb-2"
            placeholder="Karta raqam"
          />
          <div>Summa</div>
          <input
            onChange={(e) => setParams((prev) => ({ ...prev, amount: +e.target.value }))}
            value={params.amount}
            type="number"
            className="form-control mb-2"
            placeholder="Summa"
          />
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

PayAdminModal.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func,
  handleClose: PropTypes.func,
}

export default PayAdminModal

import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import avatar from 'src/assets/images/avatars/avatar.png'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularProducts } from 'src/redux/actions/productActions'
import { getTransactionAdmin } from 'src/redux/actions/transactionActions'
import { numberWithCommas } from 'src/helpers'
import TransactionCard from '../base/cards/TransactionCard'
import PayAdminModal from '../modal/PayAdminModal'

const Dashboard = () => {
  const dispatch = useDispatch()
  const popularProducts = useSelector((state) => state.product.popularProducts?.data)
  const transactionAdmin = useSelector((state) => state.transaction.transactionAdmin?.data)
  const user = useSelector((state) => state.auth.profile)
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }
  const handleOpen = () => {
    setShow(true)
  }
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getPopularProducts())
    dispatch(getTransactionAdmin({ offset: 0, limit: 10 }))
  }, [])

  return (
    <>
      <WidgetsDropdown />
      <div className="card mb-4">
        <div className="card-body">
          <div className="fs-5 mt-2 mb-2">Arizalaringiz</div>
          <div className="mb-3 fw-bold">
            Hisobingizdagi mablag`: {user?.wallet?.toLocaleString('ru-RU')} UZS
          </div>
          <CButton color="primary" className="mb-4" onClick={handleOpen}>
            Mablag`ni yechish
          </CButton>
          <PayAdminModal show={show} handleClose={handleClose} />
          <div className="stream-cards">
            {transactionAdmin?.results?.map((item, idx) => (
              <TransactionCard card={item} key={idx} />
            ))}
          </div>
        </div>
      </div>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <div className="fs-4 fw-bold mb-3">Eng ko`p sotilgan mahsulotlar</div>
              <div className="overflow-x-auto">
                <CTable
                  align="middle"
                  className="mb-0 border"
                  style={{ minWidth: 'max-content' }}
                  hover
                  responsive
                >
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Mahsulot</CTableHeaderCell>
                      <CTableHeaderCell>Narxi</CTableHeaderCell>
                      <CTableHeaderCell>Soni</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {popularProducts?.map((item, idx) => (
                      <CTableRow key={idx} style={{ cursor: 'pointer' }}>
                        <CTableDataCell className="d-flex align-items-center gap-4 text-center">
                          <CAvatar
                            size="md"
                            src={item?.front_image || avatar}
                            style={{ minWidth: '40px' }}
                          />
                          <div className="text-start">
                            <CButton
                              color="success"
                              style={{ fontSize: '13px', color: '#fff' }}
                              className="p-1"
                            >
                              Barchasi
                            </CButton>
                            <div className="" style={{ fontSize: '13px' }}>
                              {item?.title_en}
                            </div>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{numberWithCommas(item?.price)} so`m</div>
                        </CTableDataCell>
                        <CTableDataCell>{item?.count} dona sotilgan</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard

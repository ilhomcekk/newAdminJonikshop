import { object } from 'prop-types'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useSelector } from 'react-redux'

const OrderTable = () => {
  const streams = useSelector((state) => state.ref.referralStatistics?.data)
  const AllStreams = useSelector((state) => state.ref.allReferralStatistics?.data)

  const handleFindStatus = (status, documents) => {
    const finder = documents?.find((item) => item?.status === status)
    return finder?.dcount ? finder?.dcount : 0
  }

  const handleAllStatus = (status) => {
    const finders = AllStreams?.find((item) => item?.status === status)
    return finders?.dcount ? finders?.dcount : 0
  }

  return (
    <CTable align="middle" className="mb-0 border min-w-full" hover responsive>
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
            ID
          </CTableHeaderCell>
          <CTableHeaderCell style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
            Oqim
          </CTableHeaderCell>
          <CTableHeaderCell style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
            Tashrif
          </CTableHeaderCell>
          <CTableHeaderCell style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
            Yangi
          </CTableHeaderCell>
          <CTableHeaderCell style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
            Qayta qo`ng`iroq
          </CTableHeaderCell>
          <CTableHeaderCell style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
            Dostavkaga tayyor
          </CTableHeaderCell>
          <CTableHeaderCell style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
            Yo`lda
          </CTableHeaderCell>
          <CTableHeaderCell style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
            Yetkazildi
          </CTableHeaderCell>
          <CTableHeaderCell style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
            Qaytib keldi
          </CTableHeaderCell>
          <CTableHeaderCell style={{ minWidth: 'max-content', whiteSpace: 'nowrap' }}>
            Arxiv
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {streams?.results?.map((item, idx) => (
          <CTableRow key={idx} style={{ cursor: 'pointer' }}>
            <CTableDataCell>#{item?.id}</CTableDataCell>
            <CTableDataCell className="fw-bold">{item?.title}</CTableDataCell>
            <CTableDataCell className="fw-bold">{item?.veiw_count}</CTableDataCell>
            <CTableDataCell>{handleFindStatus('Yangi', item?.count)}</CTableDataCell>
            <CTableDataCell>{handleFindStatus('qayta_qongiroq', item?.count)}</CTableDataCell>
            <CTableDataCell>{handleFindStatus('dostavkaga_tayyor', item?.count)}</CTableDataCell>
            <CTableDataCell>{handleFindStatus('yolda', item?.count)}</CTableDataCell>
            <CTableDataCell>{handleFindStatus('yetkazildi', item?.count)}</CTableDataCell>
            <CTableDataCell>{handleFindStatus('qaytib_keldi', item?.count)}</CTableDataCell>
            <CTableDataCell>{handleFindStatus('arxiv', item?.count)}</CTableDataCell>
          </CTableRow>
        ))}
        <CTableRow style={{ cursor: 'pointer' }}>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell className="fw-bold">UMUMIY</CTableDataCell>
          <CTableDataCell className="fw-bold"></CTableDataCell>
          <CTableDataCell>{handleAllStatus('Yangi')}</CTableDataCell>
          <CTableDataCell>{handleAllStatus('qayta_qongiroq')}</CTableDataCell>
          <CTableDataCell>{handleAllStatus('dostavkaga_tayyor')}</CTableDataCell>
          <CTableDataCell>{handleAllStatus('yolda')}</CTableDataCell>
          <CTableDataCell>{handleAllStatus('yetkazildi')}</CTableDataCell>
          <CTableDataCell>{handleAllStatus('qaytib_keldi')}</CTableDataCell>
          <CTableDataCell>{handleAllStatus('arxiv')}</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  )
}

export default OrderTable

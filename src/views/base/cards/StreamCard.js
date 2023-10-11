import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCommentSquare, cilCopy, cilTrash } from '@coreui/icons'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { CTooltip } from '@coreui/react'
import { useDispatch } from 'react-redux'
import { deleteReferralLink, getStreamProducts } from 'src/redux/actions/productActions'

const StreamCard = ({ card, onClick }) => {
  const dispatch = useDispatch()

  const handleCopyText = () => {
    const textField = document.createElement('textarea')
    textField.innerText = card?.url
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    toast.success('Nusxa olindi')
  }

  const handleSubmit = async () => {
    await deleteReferralLink(card?.id)
      .then(({ data }) => {
        toast.success('O`chirildi')
        dispatch(getStreamProducts())
      })
      .catch(({ response }) => {
        if (response?.data)
          for (const [key, value] of Object.entries(response?.data)) {
            toast.error(`${key}: ${value}`)
          }
      })
  }

  return (
    <div className="stream-card border position-relative p-2">
      <div className="position-absolute top-0 end-0 p-2 bg-success text-white">
        {card?.order_count}
      </div>
      <div className="d-flex gap-2">
        <img
          src={card?.product?.front_image}
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          alt=""
        />
        <div className="stream-block">
          <div
            className="fw-bold mb-2"
            style={{
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {card?.title}
          </div>
          <div
            className="border px-2 py-1"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {card?.url}
          </div>
        </div>
      </div>
      <div className="row w-100 m-0 border-bottom mt-2">
        <CTooltip content="o`chirish">
          <div
            className="col-4 d-flex align-items-center gap-2 py-2"
            style={{ color: '#ff3333', cursor: 'pointer' }}
            onClick={handleSubmit}
          >
            <CIcon icon={cilTrash} style={{ color: '#ff3333' }} /> O`chir
          </div>
        </CTooltip>
        <CTooltip content="statistika">
          <div
            className="col-4 d-flex align-items-center gap-2 border-start border-end py-2"
            style={{ color: '#ffb020', cursor: 'pointer' }}
            onClick={onClick}
          >
            <CIcon icon={cilCommentSquare} style={{ color: '#ffb020' }} />
            O`zgartir
          </div>
        </CTooltip>
        <CTooltip content="nusxa olish">
          <div
            className="col-4 d-flex align-items-center gap-2 py-2 text-success"
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={handleCopyText}
          >
            <CIcon icon={cilCopy} className="text-success" />
            Nusxalash
          </div>
        </CTooltip>
      </div>
    </div>
  )
}

StreamCard.propTypes = {
  card: PropTypes.object,
  onClick: PropTypes.func,
}

export default StreamCard

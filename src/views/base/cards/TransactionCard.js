import React from 'react'
import PropTypes from 'prop-types'

const TransactionCard = ({ card }) => {
  const formattedData = card?.card?.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
  return (
    <div className="order-card">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          Karta raqam:{' '}
          <div className="bg-success text-white px-2 py-1 rounded">{formattedData}</div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          Summa: <div className="text-success">{card?.amount?.toLocaleString('ru-RU')} UZS</div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          Holati:{' '}
          <div className="border border-primary rounded-pill text-primary py-1 px-2">
            {card?.status}
          </div>
        </div>
      </div>
    </div>
  )
}

TransactionCard.propTypes = {
  card: PropTypes.object,
}

export default TransactionCard

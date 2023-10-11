import React from 'react'
import PropTypes from 'prop-types'

const OrderCard = ({ card }) => {
  return (
    <div className="order-card">
      <div className="d-flex flex-md-nowrap flex-wrap gap-2 align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          ID: <div className="bg-success text-white px-2 py-1 rounded">#{card?.id}</div>
        </div>
        <div className="d-flex align-items-center text-end gap-2">
          Vaqti: <div className="text-black">{card?.created_at}</div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          Mijoz: <div className="text-black">{card?.user?.first_name}</div>
        </div>
        {/* <div className="d-flex align-items-center gap-2">
          Tel: <div className="text-black">{card?.user?.phone_number}</div>
        </div> */}
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          Operator: <div className="text-danger">Operator olmagan</div>
        </div>
        <div className="d-flex align-items-center gap-2">
          Holati:{' '}
          <div className="border border-primary rounded-pill text-primary py-1 px-2">
            {card?.status}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          Manzil: <div className="text-success">{card?.province}</div>
        </div>
      </div>
    </div>
  )
}

OrderCard.propTypes = {
  card: PropTypes.object,
}

export default OrderCard

import React from 'react'
import PropTypes from 'prop-types'
import { numberWithCommas } from '../../../../src/helpers'

const MarketCard = ({ card, onClick }) => {
  return (
    <div className="card">
      <img
        src={card?.front_image}
        className="card-img-top"
        style={{ height: '180px', objectFit: 'cover' }}
        alt=""
      />
      <div className="card-body d-flex flex-column">
        <h5
          className="card-title fs-5 mb-1"
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
          }}
        >
          {card?.title_en}
        </h5>
        <div className="d-flex align-items-center gap-2 fw-bold">
          Narxi: {numberWithCommas(card?.price)} so`m
        </div>
        <div className="d-flex align-items-center gap-2 fw-bold">
          Foyda: {numberWithCommas(card?.admin_commision)} so`m
        </div>
        <div className="d-flex align-items-center gap-2 fw-bold">
          Skladda: {card?.product_count}
        </div>
        <div className="mt-auto">
          <button className="btn btn-success w-100 text-white mt-3" onClick={onClick}>
            + Yaratish
          </button>
        </div>
      </div>
    </div>
  )
}

MarketCard.propTypes = {
  card: PropTypes.object,
  onClick: PropTypes.func,
}

export default MarketCard

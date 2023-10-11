import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getOrders } from 'src/redux/actions/orderActions'
import OrderCard from 'src/views/base/cards/OrderCard'
import { orderTabs } from './list'

const Streams = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const status = searchParams.get('status') || 'Yangi'
  const offset = searchParams.get('offset') || 0
  const limit = searchParams.get('limit') || 25
  const orders = useSelector((state) => state.order.orders?.data)
  let pageCount = Math.ceil(+orders?.count / +limit)

  const [params, setParams] = useState({
    limit: limit,
    offset: offset,
    status: status,
  })

  useEffect(() => {
    setParams(() => ({ status: status, offset: 0, limit: limit }))
  }, [status])

  useEffect(() => {
    dispatch(getOrders(params))
  }, [params])

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <ul className="nav nav-pills nav-fill overflow-x-auto flex-nowrap">
            {orderTabs.map((item) => (
              <li key={item.id} className="nav-item">
                <Link
                  className={`nav-link ${status === item.value && 'active'}`}
                  style={{ whiteSpace: 'nowrap' }}
                  aria-current="page"
                  to={`?status=${item.value}&page=1&limit=12`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="fw-bold fs-4 mb-3">Buyurtmalar</div>
          <div className="stream-cards">
            {orders?.results?.map((item, idx) => (
              <OrderCard card={item} key={idx} />
            ))}
          </div>
          {orders?.count !== 0 && (
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center mt-4">
                {/* <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li> */}
                {pageCount > 0 &&
                  [...Array(pageCount)].map((item, idx) => (
                    <li key={idx} className="page-item">
                      <Link
                        className="page-link"
                        to={`?status=${status}&offset=${idx * 25}&limit=25`}
                      >
                        {idx + 1}
                      </Link>
                    </li>
                  ))}
                {/* <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li> */}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}

export default Streams

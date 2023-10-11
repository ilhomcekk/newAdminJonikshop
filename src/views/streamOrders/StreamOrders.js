import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getOrderTotal, getStreamStatistic } from 'src/redux/actions/orderActions'
import OrderTable from './OrderTable'

const StreamOrders = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const offset = searchParams.get('offset') || 0
  const limit = searchParams.get('limit') || 25
  const streams = useSelector((state) => state.ref.referralStatistics?.data)
  let pageCount = Math.ceil(+streams?.count / +limit)

  const [params, setParams] = useState({
    limit: limit,
    offset: offset,
  })

  useEffect(() => {
    dispatch(getStreamStatistic({ offset: offset, limit: limit }))
  }, [offset])
  useEffect(() => {
    dispatch(getOrderTotal())
  }, [])

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="fw-bold fs-4 mb-3">Oqimlar</div>
          <OrderTable />
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
                    <Link className="page-link" to={`?offset=${idx * 25}`}>
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
        </div>
      </div>
    </div>
  )
}

export default StreamOrders

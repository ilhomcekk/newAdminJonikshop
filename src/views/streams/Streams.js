import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getStreamProducts } from 'src/redux/actions/productActions'
import StreamCard from 'src/views/base/cards/StreamCard'
import StreamEditModal from 'src/views/modal/StreamEditModal'

const Streams = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const offset = searchParams.get('offset') || 0
  const limit = searchParams.get('limit') || 25
  const streamProducts = useSelector((state) => state.product.streamProducts?.data)
  let pageCount = Math.ceil(+streamProducts?.count / +limit)
  const [loading, setLoading] = useState(false)
  const [productId, setProductId] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [params, setParams] = useState({
    limit: limit,
    offset: offset,
  })

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  useEffect(() => {
    dispatch(getStreamProducts({ offset: offset, limit: limit }))
  }, [offset])

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="fs-4 fw-bold mb-3">Mavjud oqimlar</div>
          <div className="stream-cards">
            {streamProducts?.results?.map((item, idx) => (
              <StreamCard
                onClick={() => {
                  setProductId(item.id)
                  handleOpenModal()
                }}
                card={item}
                key={idx}
              />
            ))}
          </div>
          <StreamEditModal show={showModal} handleClose={handleCloseModal} data={productId} />
          {streamProducts?.count !== 0 && (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default Streams
